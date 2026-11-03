// Atribuição de origem do lead (Q-1, 03/11/2026).
// Guarda UTMs, página de entrada e referrer na PRIMEIRA página da visita, para que
// quem chega pelo link do perfil na home e só depois abre /contato não perca a origem.
// sessionStorage: dura a aba/visita, não é cookie de rastreamento e não exige consentimento.

const STORAGE_KEY = "vogaia_attribution";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Attribution = Partial<
  Record<(typeof UTM_KEYS)[number] | "landing_page" | "referrer", string>
>;

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function readUtmsFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utms: Attribution = {};
  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val.slice(0, 200);
  });
  return utms;
}

function externalReferrer(): string | undefined {
  const ref = document.referrer;
  if (!ref) return undefined;
  try {
    return new URL(ref).host === window.location.host ? undefined : ref.slice(0, 300);
  } catch {
    return undefined;
  }
}

/** Chamar em toda página. Só grava na 1ª página da visita ou quando a URL traz UTM nova. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const utms = readUtmsFromUrl();
  const stored = readStored();
  if (stored && Object.keys(utms).length === 0) return;

  const next: Attribution = {
    ...utms,
    landing_page: window.location.pathname,
    referrer: externalReferrer(),
  };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage bloqueado (aba anônima, política do navegador): segue sem atribuição salva.
  }
}

/** Atribuição da visita para enviar junto com o lead. Cai para a URL atual se não houver nada salvo. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const stored = readStored();
  if (stored) return stored;
  return { ...readUtmsFromUrl(), landing_page: window.location.pathname, referrer: externalReferrer() };
}
