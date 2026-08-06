/* eslint-disable @typescript-eslint/no-explicit-any */
const w = typeof window !== "undefined" ? (window as any) : null;

function pushDataLayer(payload: Record<string, unknown>) {
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  pushDataLayer({ event: eventName, ...(params || {}) });
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  pushDataLayer({
    event: "meta_pixel_event",
    meta_event_name: eventName,
    ...(params || {}),
  });
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: location,
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    cta_location: location,
  });
  trackMetaEvent("Contact", {
    content_name: "WhatsApp",
    content_category: location,
  });
}

export function trackFormSubmit(formData: {
  servico: string;
  funcionarios: string;
  comoEncontrou: string;
}) {
  trackEvent("form_submit", {
    form_name: "contato",
    service_interest: formData.servico,
    company_size: formData.funcionarios,
    source: formData.comoEncontrou,
  });
  trackMetaEvent("Lead", {
    content_name: "Formulario Contato",
    content_category: formData.servico,
  });
}
