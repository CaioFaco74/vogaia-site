// Atribuição de origem do lead.
//
// Q-1 (03/11/2026): UTMs, página de entrada e referrer da visita em sessionStorage.
// F4 4.1 / I-2 (19/11/2026): captura também os IDs de clique do Google Ads (gclid, gbraid,
// wbraid) e guarda o 1º e o último toque com validade de 90 dias, para que quem clica no
// anúncio e volta dias depois não perca a origem (ciclo B2B; doc 12 §2.7 L7 e §5.3).
//
// Consentimento (banner `cookie-consent.tsx`):
// - aceito: o registro fica no localStorage do próprio site, por 90 dias a partir de cada toque;
// - recusado ou ainda sem resposta: fica só no sessionStorage (morre com a aba), como antes.
//   O lead que envia o formulário na mesma visita continua levando gclid e UTMs ao Make.
// Nada é enviado a terceiros por este módulo: o registro só sai do browser junto com o
// formulário que o próprio visitante envia.
//
// As regras ficam em funções puras com o ambiente injetado (storages, URL, relógio), o que
// permite testá-las com `node --test` sem browser (ver tests/attribution.test.mjs).

export const ATTRIBUTION_STORAGE_KEY = "vogaia_attribution";
/** Mesma chave usada pelo banner de cookies (`cookie-consent.tsx`). */
export const CONSENT_STORAGE_KEY = "vogaia-cookie-consent";
export const ATTRIBUTION_TTL_DAYS = 90;
const TTL_MS = ATTRIBUTION_TTL_DAYS * 24 * 60 * 60 * 1000;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

/** Um toque: chegada ao site com UTM/ID de clique, ou a 1ª chegada sem parâmetros. */
export type Touch = Partial<Record<UtmKey | "landing_page" | "referrer", string>> & {
  /** Qual ID de clique veio na chegada (o valor fica em `ClickIds`). */
  click_id?: ClickIdKey;
  /** ISO 8601 do momento da chegada. */
  at: string;
};

/** IDs de clique do último clique em anúncio do Google. Substituídos juntos a cada novo clique. */
export type ClickIds = Partial<Record<ClickIdKey, string>> & { at: string };

export interface StoredAttribution {
  v: 2;
  first?: Touch;
  last?: Touch;
  click?: ClickIds;
}

/** Campos planos enviados ao Make junto com o formulário (/diagnostico e /contato). */
export type Attribution = Partial<
  Record<
    | UtmKey
    | ClickIdKey
    | "landing_page"
    | "referrer"
    | "data_ultimo_toque"
    | "data_clique"
    | "origem_primeiro_toque"
    | "landing_page_primeiro_toque"
    | "data_primeiro_toque",
    string
  >
>;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface AttributionEnv {
  local: StorageLike | null;
  session: StorageLike | null;
  /** `location.search`, com o `?`. */
  search: string;
  pathname: string;
  /** `document.referrer`. */
  referrer: string;
  /** `location.host`, para descartar referrer interno. */
  host: string;
  now: Date;
}

export interface Arrival {
  touch: Touch;
  click: ClickIds | null;
  hasParams: boolean;
}

const MAX_UTM_LEN = 200;
const MAX_CLICK_ID_LEN = 300;
const MAX_REFERRER_LEN = 300;

// ---------------------------------------------------------------------------
// Regras (funções puras)
// ---------------------------------------------------------------------------

function externalReferrer(referrer: string, host: string): string | undefined {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).host === host ? undefined : referrer.slice(0, MAX_REFERRER_LEN);
  } catch {
    return undefined;
  }
}

/** Lê o toque e os IDs de clique da URL de chegada. */
export function readArrival(
  env: Pick<AttributionEnv, "search" | "pathname" | "referrer" | "host" | "now">
): Arrival {
  const params = new URLSearchParams(env.search);
  const at = env.now.toISOString();

  const touch: Touch = { at };
  for (const key of UTM_KEYS) {
    const val = params.get(key)?.trim();
    if (val) touch[key] = val.slice(0, MAX_UTM_LEN);
  }
  const hasUtm = UTM_KEYS.some((key) => key in touch);

  const click: ClickIds = { at };
  for (const key of CLICK_ID_KEYS) {
    const val = params.get(key)?.trim();
    if (val) {
      click[key] = val.slice(0, MAX_CLICK_ID_LEN);
      touch.click_id = touch.click_id ?? key;
    }
  }
  const hasClick = touch.click_id !== undefined;

  touch.landing_page = env.pathname;
  const ref = externalReferrer(env.referrer, env.host);
  if (ref) touch.referrer = ref;

  return { touch, click: hasClick ? click : null, hasParams: hasUtm || hasClick };
}

function isFresh(at: string | undefined, now: Date): boolean {
  if (!at) return false;
  const t = Date.parse(at);
  return Number.isFinite(t) && now.getTime() - t <= TTL_MS;
}

/** Remove as partes com mais de 90 dias. */
export function pruneExpired(stored: StoredAttribution | null, now: Date): StoredAttribution | null {
  if (!stored) return null;
  const pruned: StoredAttribution = { v: 2 };
  if (isFresh(stored.first?.at, now)) pruned.first = stored.first;
  if (isFresh(stored.last?.at, now)) pruned.last = stored.last;
  if (isFresh(stored.click?.at, now)) pruned.click = stored.click;
  return pruned.first || pruned.last || pruned.click ? pruned : null;
}

/**
 * Junta a chegada atual ao registro salvo.
 * - Chegada com UTM ou ID de clique: vira o último toque (e o 1º, se ainda não houver).
 * - ID de clique novo substitui o anterior (gclid, gbraid e wbraid juntos).
 * - Chegada sem parâmetros só grava quando não há nada salvo (visita direta/orgânica);
 *   depois disso não apaga a origem de campanha já registrada.
 */
export function mergeArrival(
  stored: StoredAttribution | null,
  arrival: Arrival,
  now: Date
): StoredAttribution {
  const base = pruneExpired(stored, now) ?? { v: 2 };
  if (!arrival.hasParams) {
    if (base.first || base.last) return base;
    return { ...base, first: arrival.touch, last: arrival.touch };
  }
  const merged: StoredAttribution = {
    v: 2,
    first: base.first ?? arrival.touch,
    last: arrival.touch,
  };
  const click = arrival.click ?? base.click;
  if (click) merged.click = click;
  return merged;
}

function laterOf<T extends { at: string }>(a: T | undefined, b: T | undefined): T | undefined {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(b.at) > Date.parse(a.at) ? b : a;
}

function earlierOf<T extends { at: string }>(a: T | undefined, b: T | undefined): T | undefined {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(b.at) < Date.parse(a.at) ? b : a;
}

/** Junta dois registros (ex.: o da sessão e o persistido, quando o consentimento é dado). */
export function mergeStored(
  a: StoredAttribution | null,
  b: StoredAttribution | null,
  now: Date
): StoredAttribution | null {
  const pa = pruneExpired(a, now);
  const pb = pruneExpired(b, now);
  if (!pa) return pb;
  if (!pb) return pa;
  const merged: StoredAttribution = { v: 2 };
  const first = earlierOf(pa.first, pb.first);
  const last = laterOf(pa.last, pb.last);
  const click = laterOf(pa.click, pb.click);
  if (first) merged.first = first;
  if (last) merged.last = last;
  if (click) merged.click = click;
  return merged;
}

/** Resumo do 1º toque para uma coluna/propriedade só: "origem / mídia / campanha". */
export function describeTouch(touch: Touch | undefined): string | undefined {
  if (!touch) return undefined;
  const utm = [touch.utm_source, touch.utm_medium, touch.utm_campaign].filter(Boolean);
  if (utm.length > 0) return utm.join(" / ");
  if (touch.click_id) return `google_ads (${touch.click_id})`;
  if (touch.referrer) {
    try {
      return new URL(touch.referrer).host;
    } catch {
      return touch.referrer;
    }
  }
  return "direto";
}

/** Converte o registro em campos planos para o Make. Último toque nos nomes que já existiam. */
export function flattenAttribution(stored: StoredAttribution | null, now: Date): Attribution {
  const s = pruneExpired(stored, now);
  if (!s) return {};
  const out: Attribution = {};

  const last = s.last;
  if (last) {
    for (const key of UTM_KEYS) {
      const val = last[key];
      if (val) out[key] = val;
    }
    if (last.landing_page) out.landing_page = last.landing_page;
    if (last.referrer) out.referrer = last.referrer;
    out.data_ultimo_toque = last.at;
  }

  const click = s.click;
  if (click) {
    for (const key of CLICK_ID_KEYS) {
      const val = click[key];
      if (val) out[key] = val;
    }
    out.data_clique = click.at;
  }

  const first = s.first;
  if (first) {
    out.origem_primeiro_toque = describeTouch(first);
    if (first.landing_page) out.landing_page_primeiro_toque = first.landing_page;
    out.data_primeiro_toque = first.at;
  }

  return out;
}

// ---------------------------------------------------------------------------
// Armazenamento (com o ambiente injetado)
// ---------------------------------------------------------------------------

export function hasConsent(env: Pick<AttributionEnv, "local">): boolean {
  try {
    return env.local?.getItem(CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

const LEGACY_KEYS = [...UTM_KEYS, "landing_page", "referrer"] as const;

/** Registro da versão anterior (Q-1): objeto plano com UTMs, landing_page e referrer. */
function migrateLegacy(raw: Record<string, unknown>, now: Date): StoredAttribution | null {
  const touch: Touch = { at: now.toISOString() };
  let found = false;
  for (const key of LEGACY_KEYS) {
    const val = raw[key];
    if (typeof val === "string" && val) {
      touch[key] = val;
      found = true;
    }
  }
  return found ? { v: 2, first: touch, last: touch } : null;
}

function readFrom(storage: StorageLike | null, now: Date): StoredAttribution | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const obj = parsed as Record<string, unknown>;
    if (obj.v === 2) return pruneExpired(obj as unknown as StoredAttribution, now);
    return migrateLegacy(obj, now);
  } catch {
    return null;
  }
}

function writeTo(storage: StorageLike | null, value: StoredAttribution | null): void {
  if (!storage) return;
  try {
    if (value) storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
    else storage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Storage bloqueado (aba anônima, política do navegador): segue sem atribuição salva.
  }
}

function readCurrent(env: AttributionEnv): StoredAttribution | null {
  const session = readFrom(env.session, env.now);
  if (!hasConsent(env)) return session;
  return mergeStored(readFrom(env.local, env.now), session, env.now);
}

function persist(env: AttributionEnv, value: StoredAttribution): void {
  if (hasConsent(env)) {
    writeTo(env.local, value);
    writeTo(env.session, null);
  } else {
    writeTo(env.session, value);
  }
}

/** Grava a chegada atual. Chamar em toda página/troca de rota. */
export function captureAttributionIn(env: AttributionEnv): StoredAttribution {
  const next = mergeArrival(readCurrent(env), readArrival(env), env.now);
  persist(env, next);
  return next;
}

/** Atribuição para enviar com o lead. Sem nada salvo, usa a URL atual. */
export function getAttributionIn(env: AttributionEnv): Attribution {
  const stored = readCurrent(env) ?? mergeArrival(null, readArrival(env), env.now);
  return flattenAttribution(stored, env.now);
}

/**
 * Chamar quando o visitante responde ao banner.
 * Aceitou: leva o registro da sessão para o localStorage (90 dias).
 * Recusou: apaga o registro persistido e deixa só a cópia da visita atual no sessionStorage.
 */
export function applyAttributionConsentIn(env: AttributionEnv, granted: boolean): void {
  const merged = mergeStored(readFrom(env.local, env.now), readFrom(env.session, env.now), env.now);
  if (granted) {
    if (merged) writeTo(env.local, merged);
    writeTo(env.session, null);
  } else {
    writeTo(env.local, null);
    if (merged) writeTo(env.session, merged);
  }
}

// ---------------------------------------------------------------------------
// Browser
// ---------------------------------------------------------------------------

function safeStorage(get: () => Storage): StorageLike | null {
  try {
    return get();
  } catch {
    return null;
  }
}

function browserEnv(): AttributionEnv | null {
  if (typeof window === "undefined") return null;
  return {
    local: safeStorage(() => window.localStorage),
    session: safeStorage(() => window.sessionStorage),
    search: window.location.search,
    pathname: window.location.pathname,
    referrer: document.referrer,
    host: window.location.host,
    now: new Date(),
  };
}

/** Chamar em toda página (AttributionCapture). */
export function captureAttribution(): void {
  const env = browserEnv();
  if (env) captureAttributionIn(env);
}

/** Atribuição para enviar junto com o lead (/diagnostico e /contato). */
export function getAttribution(): Attribution {
  const env = browserEnv();
  return env ? getAttributionIn(env) : {};
}

/** Chamado pelo banner de cookies ao aceitar ou recusar. */
export function applyAttributionConsent(granted: boolean): void {
  const env = browserEnv();
  if (env) applyAttributionConsentIn(env, granted);
}
