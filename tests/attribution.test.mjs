// Testes da atribuição persistente (F4 4.1 / I-2): gclid/gbraid/wbraid + UTMs, 1º e último
// toque, validade de 90 dias e respeito ao consentimento do banner.
// Rodar com: npm test  (node --test, com type stripping nativo do Node 22).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ATTRIBUTION_STORAGE_KEY,
  CONSENT_STORAGE_KEY,
  applyAttributionConsentIn,
  captureAttributionIn,
  getAttributionIn,
} from "#src/lib/attribution.ts";

const DAY = 24 * 60 * 60 * 1000;
const T0 = new Date("2026-11-19T12:00:00.000Z");

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}

/** Browser simulado: localStorage dura entre visitas; sessionStorage é por visita. */
function makeBrowser({ consent } = {}) {
  const local = memoryStorage(consent ? { [CONSENT_STORAGE_KEY]: consent } : {});
  let session = memoryStorage();
  return {
    local,
    get session() {
      return session;
    },
    newVisit() {
      session = memoryStorage();
    },
    env(url, { referrer = "", now = T0 } = {}) {
      const u = new URL(url, "https://vogaia.com.br");
      return {
        local,
        session,
        search: u.search,
        pathname: u.pathname,
        referrer,
        host: "vogaia.com.br",
        now,
      };
    },
  };
}

const ADS_URL =
  "/diagnostico/?utm_source=google&utm_medium=cpc&utm_campaign=c1-consultoria&utm_term=consultoria%20ia&gclid=GCLID-123";

test("chegada pelo anúncio: captura gclid, UTMs, landing e 1º toque", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env(ADS_URL, { referrer: "https://www.google.com/" }));
  const a = getAttributionIn(b.env("/diagnostico/"));
  assert.equal(a.gclid, "GCLID-123");
  assert.equal(a.utm_source, "google");
  assert.equal(a.utm_medium, "cpc");
  assert.equal(a.utm_campaign, "c1-consultoria");
  assert.equal(a.utm_term, "consultoria ia");
  assert.equal(a.landing_page, "/diagnostico/");
  assert.equal(a.referrer, "https://www.google.com/");
  assert.equal(a.origem_primeiro_toque, "google / cpc / c1-consultoria");
  assert.equal(a.landing_page_primeiro_toque, "/diagnostico/");
  assert.equal(a.data_primeiro_toque, T0.toISOString());
  assert.equal(a.data_clique, T0.toISOString());
  assert.equal(a.gbraid, undefined);
  assert.equal(a.wbraid, undefined);
});

test("com consentimento: volta 3 dias depois sem parâmetros e o gclid continua", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env(ADS_URL));
  assert.ok(b.local.getItem(ATTRIBUTION_STORAGE_KEY), "persistido no localStorage");
  assert.equal(b.session.getItem(ATTRIBUTION_STORAGE_KEY), null);

  b.newVisit();
  const later = new Date(T0.getTime() + 3 * DAY);
  captureAttributionIn(b.env("/", { referrer: "https://www.bing.com/", now: later }));
  const a = getAttributionIn(b.env("/diagnostico/", { now: later }));
  assert.equal(a.gclid, "GCLID-123");
  assert.equal(a.utm_campaign, "c1-consultoria");
  assert.equal(a.landing_page, "/diagnostico/", "visita sem parâmetros não apaga a campanha");
});

test("validade de 90 dias: no dia 91 a origem expira", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env(ADS_URL));

  const day89 = new Date(T0.getTime() + 89 * DAY);
  assert.equal(getAttributionIn(b.env("/", { now: day89 })).gclid, "GCLID-123");

  b.newVisit();
  const day91 = new Date(T0.getTime() + 91 * DAY);
  captureAttributionIn(b.env("/contato/", { now: day91 }));
  const a = getAttributionIn(b.env("/contato/", { now: day91 }));
  assert.equal(a.gclid, undefined);
  assert.equal(a.utm_source, undefined);
  assert.equal(a.origem_primeiro_toque, "direto");
  assert.equal(a.landing_page, "/contato/");
});

test("sem consentimento: nada vai para o localStorage, mas a visita leva o gclid", () => {
  for (const consent of [undefined, "rejected"]) {
    const b = makeBrowser({ consent });
    captureAttributionIn(b.env(ADS_URL));
    assert.equal(b.local.getItem(ATTRIBUTION_STORAGE_KEY), null, `consent=${consent}`);
    const a = getAttributionIn(b.env("/diagnostico/"));
    assert.equal(a.gclid, "GCLID-123");

    b.newVisit();
    captureAttributionIn(b.env("/"));
    assert.equal(getAttributionIn(b.env("/diagnostico/")).gclid, undefined, "nova visita sem origem");
  }
});

test("aceitar o banner leva a visita para 90 dias; recusar apaga o persistido", () => {
  const b = makeBrowser();
  captureAttributionIn(b.env(ADS_URL));
  b.local.setItem(CONSENT_STORAGE_KEY, "accepted");
  applyAttributionConsentIn(b.env("/"), true);
  assert.ok(b.local.getItem(ATTRIBUTION_STORAGE_KEY));
  assert.equal(b.session.getItem(ATTRIBUTION_STORAGE_KEY), null);

  b.local.setItem(CONSENT_STORAGE_KEY, "rejected");
  applyAttributionConsentIn(b.env("/"), false);
  assert.equal(b.local.getItem(ATTRIBUTION_STORAGE_KEY), null);
  assert.equal(getAttributionIn(b.env("/diagnostico/")).gclid, "GCLID-123", "a visita atual mantém");
});

test("1º e último toque: nova campanha muda o último, o 1º fica e o gclid anterior segue", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env(ADS_URL));
  b.newVisit();
  const later = new Date(T0.getTime() + 5 * DAY);
  captureAttributionIn(
    b.env("/cases/?utm_source=linkedin&utm_medium=organic&utm_campaign=post-1911", { now: later })
  );
  const a = getAttributionIn(b.env("/diagnostico/", { now: later }));
  assert.equal(a.utm_source, "linkedin");
  assert.equal(a.landing_page, "/cases/");
  assert.equal(a.data_ultimo_toque, later.toISOString());
  assert.equal(a.origem_primeiro_toque, "google / cpc / c1-consultoria");
  assert.equal(a.data_primeiro_toque, T0.toISOString());
  assert.equal(a.gclid, "GCLID-123", "o último clique pago continua para a conversão offline");
});

test("novo clique com gbraid substitui o gclid antigo (um ID de clique por vez)", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env(ADS_URL));
  const later = new Date(T0.getTime() + DAY);
  captureAttributionIn(b.env("/?gbraid=GB-1", { now: later }));
  const a = getAttributionIn(b.env("/diagnostico/", { now: later }));
  assert.equal(a.gbraid, "GB-1");
  assert.equal(a.gclid, undefined);
  assert.equal(a.data_clique, later.toISOString());

  captureAttributionIn(b.env("/?wbraid=WB-1", { now: later }));
  const w = getAttributionIn(b.env("/", { now: later }));
  assert.equal(w.wbraid, "WB-1");
  assert.equal(w.gbraid, undefined);
});

test("só gclid (auto-tagging, sem UTM): 1º toque identificado como Google Ads", () => {
  const b = makeBrowser({ consent: "accepted" });
  captureAttributionIn(b.env("/diagnostico/?gclid=ONLY-GCLID"));
  const a = getAttributionIn(b.env("/diagnostico/"));
  assert.equal(a.gclid, "ONLY-GCLID");
  assert.equal(a.origem_primeiro_toque, "google_ads (gclid)");
  assert.equal(a.utm_source, undefined);
});

test("referrer interno é descartado; navegação interna não muda a origem", () => {
  const b = makeBrowser();
  captureAttributionIn(b.env("/", { referrer: "https://www.linkedin.com/" }));
  captureAttributionIn(b.env("/servicos/", { referrer: "https://vogaia.com.br/" }));
  const a = getAttributionIn(b.env("/diagnostico/"));
  assert.equal(a.landing_page, "/");
  assert.equal(a.referrer, "https://www.linkedin.com/");
  assert.equal(a.origem_primeiro_toque, "www.linkedin.com");
});

test("registro da versão anterior (sessionStorage plano) é migrado", () => {
  const b = makeBrowser();
  b.session.setItem(
    ATTRIBUTION_STORAGE_KEY,
    JSON.stringify({ utm_source: "instagram", utm_medium: "bio", landing_page: "/" })
  );
  const a = getAttributionIn(b.env("/diagnostico/"));
  assert.equal(a.utm_source, "instagram");
  assert.equal(a.landing_page, "/");
  assert.equal(a.origem_primeiro_toque, "instagram / bio");
});

test("storage bloqueado ou corrompido não quebra o envio", () => {
  const throwing = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
    removeItem: () => {
      throw new Error("blocked");
    },
  };
  const env = {
    local: throwing,
    session: throwing,
    search: "?gclid=X1",
    pathname: "/diagnostico/",
    referrer: "",
    host: "vogaia.com.br",
    now: T0,
  };
  assert.doesNotThrow(() => captureAttributionIn(env));
  assert.equal(getAttributionIn(env).gclid, "X1", "cai para a URL atual");

  const b = makeBrowser();
  b.session.setItem(ATTRIBUTION_STORAGE_KEY, "{não é json");
  assert.doesNotThrow(() => captureAttributionIn(b.env("/?utm_source=x")));
  assert.equal(getAttributionIn(b.env("/")).utm_source, "x");
});

test("valores longos são cortados", () => {
  const b = makeBrowser();
  captureAttributionIn(b.env(`/?utm_campaign=${"a".repeat(500)}&gclid=${"g".repeat(900)}`));
  const a = getAttributionIn(b.env("/"));
  assert.equal(a.utm_campaign.length, 200);
  assert.equal(a.gclid.length, 300);
});
