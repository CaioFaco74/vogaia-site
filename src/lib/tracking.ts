/* eslint-disable @typescript-eslint/no-explicit-any */
const w = typeof window !== "undefined" ? (window as any) : null;

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (w?.gtag) {
    w.gtag("event", eventName, params);
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (w?.fbq) {
    w.fbq("track", eventName, params);
  }
}

// CTAs
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: location,
  });
}

// WhatsApp
export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    cta_location: location,
  });
  trackMetaEvent("Contact", {
    content_name: "WhatsApp",
    content_category: location,
  });
}

// Formulário enviado
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
