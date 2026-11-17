// Envio do formulário /diagnostico ao Make (task F3 3.3, 17/11/2026).
//
// Regra: o sucesso e a conversão (GA4/Google Ads `diagnostico_submit` e Meta `Lead`)
// só existem depois de uma resposta 2xx do webhook. Falha de rede, timeout ou status
// fora de 2xx retornam `ok: false` e registram apenas `diagnostico_submit_error`.
//
// O `lead_id` vai no corpo enviado ao Make e nos eventos de conversão
// (`transaction_id` no Google Ads, `event_id` no Meta), para deduplicar.
//
// Este módulo não importa nada do app: as dependências (fetch e tracking) são injetadas,
// o que permite testá-lo com `node --test` sem browser (ver tests/diagnostico-submit.test.mjs).

export const DIAGNOSTICO_WEBHOOK_URL =
  "https://hook.us1.make.com/lzoiiytwu71gjywwwdc3elog4h8dttsj";

export const DIAGNOSTICO_TIMEOUT_MS = 15000;

export type TrackingParams = Record<string, string | number | boolean>;

export interface DiagnosticoSubmitDeps {
  fetchImpl: typeof fetch;
  trackEvent: (eventName: string, params?: TrackingParams) => void;
  trackMetaEvent: (eventName: string, params?: TrackingParams) => void;
  timeoutMs?: number;
}

export interface DiagnosticoSubmitInput {
  leadId: string;
  /** Corpo enviado ao Make (dados do formulário + atribuição). O `lead_id` é acrescentado aqui. */
  payload: Record<string, unknown>;
  /** Parâmetros sem dado pessoal que acompanham a conversão (porte, cargo, processo, UTMs). */
  conversionParams: TrackingParams;
}

export type DiagnosticoSubmitResult =
  | { ok: true; leadId: string }
  | { ok: false; leadId: string; error: string };

export function createLeadId(): string {
  if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function submitDiagnostico(
  input: DiagnosticoSubmitInput,
  deps: DiagnosticoSubmitDeps
): Promise<DiagnosticoSubmitResult> {
  const { leadId, payload, conversionParams } = input;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), deps.timeoutMs ?? DIAGNOSTICO_TIMEOUT_MS);

  try {
    const res = await deps.fetchImpl(DIAGNOSTICO_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, lead_id: leadId }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
  } catch (err) {
    const error =
      err instanceof Error
        ? err.name === "AbortError"
          ? "timeout"
          : err.message
        : "unknown";
    // Não perder o lead em silêncio: registra para monitoramento (GA4/alertas). Não é conversão.
    deps.trackEvent("diagnostico_submit_error", {
      form_name: "diagnostico",
      lead_id: leadId,
      error,
    });
    return { ok: false, leadId, error };
  } finally {
    clearTimeout(timer);
  }

  // Só chega aqui com 2xx: agora sim é conversão.
  deps.trackEvent("diagnostico_submit", {
    form_name: "diagnostico",
    ...conversionParams,
    lead_id: leadId,
    transaction_id: leadId,
  });
  deps.trackMetaEvent("Lead", {
    content_name: "Diagnostico IA",
    content_category: "diagnostico",
    event_id: leadId,
  });

  return { ok: true, leadId };
}
