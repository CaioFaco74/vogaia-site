// Testes do envio do /diagnostico (task F3 3.3): sucesso e conversão só depois do 2xx.
// Rodar com: npm test  (node --test, com type stripping nativo do Node 22).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DIAGNOSTICO_WEBHOOK_URL,
  createLeadId,
  submitDiagnostico,
} from "#src/lib/diagnostico-submit.ts";

const CONVERSION_EVENTS = ["diagnostico_submit", "meta:Lead"];

function makeDeps(fetchImpl, timeoutMs) {
  const events = [];
  const calls = [];
  return {
    events,
    calls,
    deps: {
      fetchImpl: async (url, init) => {
        calls.push({ url, init });
        return fetchImpl(url, init);
      },
      trackEvent: (name, params) => events.push({ name, params }),
      trackMetaEvent: (name, params) => events.push({ name: `meta:${name}`, params }),
      timeoutMs,
    },
  };
}

const input = {
  leadId: "lead-123",
  payload: { nome: "Teste", cargo: "diretor", processo: "vendas", funcionarios: "51-200" },
  conversionParams: { company_size: "51-200", job_role: "diretor", process_interest: "vendas" },
};

function conversionsIn(events) {
  return events.filter((e) => CONVERSION_EVENTS.includes(e.name));
}

test("2xx: sucesso, envia lead_id ao Make e dispara a conversão com lead_id", async () => {
  const { deps, events, calls } = makeDeps(async () => new Response("Accepted", { status: 200 }));

  const result = await submitDiagnostico(input, deps);

  assert.deepEqual(result, { ok: true, leadId: "lead-123" });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, DIAGNOSTICO_WEBHOOK_URL);
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.lead_id, "lead-123");
  assert.equal(body.cargo, "diretor");
  assert.equal(body.processo, "vendas");

  const submit = events.find((e) => e.name === "diagnostico_submit");
  assert.ok(submit, "diagnostico_submit deve disparar no 2xx");
  assert.equal(submit.params.lead_id, "lead-123");
  assert.equal(submit.params.transaction_id, "lead-123");
  assert.equal(submit.params.job_role, "diretor");
  assert.equal(submit.params.process_interest, "vendas");

  const lead = events.find((e) => e.name === "meta:Lead");
  assert.ok(lead, "Meta Lead deve disparar no 2xx");
  assert.equal(lead.params.event_id, "lead-123");

  assert.equal(events.some((e) => e.name === "diagnostico_submit_error"), false);
});

test("HTTP 500: falha, nenhuma conversão, só o evento de erro", async () => {
  const { deps, events } = makeDeps(async () => new Response("error", { status: 500 }));

  const result = await submitDiagnostico(input, deps);

  assert.equal(result.ok, false);
  assert.equal(result.error, "Webhook respondeu 500");
  assert.deepEqual(conversionsIn(events), []);
  const err = events.find((e) => e.name === "diagnostico_submit_error");
  assert.ok(err);
  assert.equal(err.params.lead_id, "lead-123");
});

test("HTTP 4xx também não conta como sucesso", async () => {
  for (const status of [400, 404, 410, 429]) {
    const { deps, events } = makeDeps(async () => new Response("x", { status }));
    const result = await submitDiagnostico(input, deps);
    assert.equal(result.ok, false, `status ${status}`);
    assert.deepEqual(conversionsIn(events), []);
  }
});

test("Erro de rede: falha, nenhuma conversão", async () => {
  const { deps, events } = makeDeps(async () => {
    throw new TypeError("Failed to fetch");
  });

  const result = await submitDiagnostico(input, deps);

  assert.equal(result.ok, false);
  assert.equal(result.error, "Failed to fetch");
  assert.deepEqual(conversionsIn(events), []);
});

test("Timeout: aborta, falha e nenhuma conversão", async () => {
  const hanging = (_url, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () =>
        reject(new DOMException("The operation was aborted.", "AbortError"))
      );
    });
  const { deps, events } = makeDeps(hanging, 20);

  const result = await submitDiagnostico(input, deps);

  assert.equal(result.ok, false);
  assert.equal(result.error, "timeout");
  assert.deepEqual(conversionsIn(events), []);
});

test("createLeadId gera ids únicos e não vazios", () => {
  const ids = new Set(Array.from({ length: 50 }, () => createLeadId()));
  assert.equal(ids.size, 50);
  for (const id of ids) assert.ok(id.length >= 8);
});
