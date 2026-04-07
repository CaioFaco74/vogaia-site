"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "vogaia-cookie-consent";

type ConsentStatus = "accepted" | "rejected" | null;

function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentStatus;
}

function loadGA4() {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-EHPFZ42VEN";
  document.head.appendChild(script);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: any[]) {
    w.dataLayer.push(args);
  }
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-EHPFZ42VEN");
}

function loadMetaPixel() {
  if (document.getElementById("meta-pixel-script")) return;
  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','726162829402207');fbq('track','PageView');`;
  document.head.appendChild(script);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      loadGA4();
      loadMetaPixel();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadGA4();
    loadMetaPixel();
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
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
