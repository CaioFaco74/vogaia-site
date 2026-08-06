"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "vogaia-cookie-consent";

type ConsentStatus = "accepted" | "rejected" | null;

function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentStatus;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function updateGTMConsent(granted: boolean) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(["consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  }]);
  w.dataLayer.push({ event: granted ? "consent_accepted" : "consent_rejected" });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      updateGTMConsent(true);
    } else if (consent === "rejected") {
      updateGTMConsent(false);
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    updateGTMConsent(true);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
    updateGTMConsent(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 bg-bg-secondary/95 backdrop-blur-md border-t border-border-subtle">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-text-muted flex-1">
          Utilizamos cookies para analisar o trafego do site e otimizar sua
          experiencia. Ao aceitar, voce concorda com o uso de cookies conforme
          nossa{" "}
          <a
            href="/privacidade/"
            className="text-orange-primary hover:text-orange-hover underline"
          >
            Politica de Privacidade
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm text-text-muted hover:text-text-primary border border-border-subtle rounded-lg transition-colors"
          >
            Rejeitar
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-white bg-orange-primary hover:bg-orange-hover rounded-lg transition-colors font-medium"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
