import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VogaIA - Soluções de Inteligência Artificial para Empresas",
    template: "%s | VogaIA",
  },
  description:
    "Automatize atendimento, vendas e operações com IA. Soluções sob medida para empresas que querem resultados reais. Fale com a VogaIA.",
  keywords: [
    "inteligência artificial",
    "IA para empresas",
    "automação de atendimento",
    "automação de vendas",
    "agentes de IA",
    "consultoria em IA",
    "VogaIA",
    "IA Fortaleza",
  ],
  authors: [{ name: "VogaIA" }],
  creator: "VogaIA",
  metadataBase: new URL("https://vogaia.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vogaia.com.br",
    siteName: "VogaIA",
    title: "VogaIA - Soluções de Inteligência Artificial para Empresas",
    description:
      "Automatize atendimento, vendas e operações com IA. Soluções sob medida para empresas que querem resultados reais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VogaIA - Soluções de Inteligência Artificial para Empresas",
    description:
      "Automatize atendimento, vendas e operações com IA. Soluções sob medida para empresas que querem resultados reais.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Meta Pixel (Facebook/Instagram) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','726162829402207');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=726162829402207&ev=PageView&noscript=1" alt="" />
        </noscript>
        {/* Google Search Console */}
        <meta name="google-site-verification" content="aOu2lIVS4u6VUKeWvX825wXXahaKm1bwDD92OD21gj0" />
        {/* Google Analytics (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EHPFZ42VEN" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-EHPFZ42VEN');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "VogaIA",
              url: "https://vogaia.com.br",
              logo: "https://vogaia.com.br/logo.svg",
              description:
                "Soluções de inteligência artificial para empresas",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rua Vicente Leite, 1820",
                addressLocality: "Fortaleza",
                addressRegion: "CE",
                postalCode: "60170-151",
                addressCountry: "BR",
              },
              telephone: "+5585982042293",
              email: "atendimento@vogaia.com.br",
              sameAs: [
                "https://www.linkedin.com/company/vogaia",
                "https://www.instagram.com/vogaia",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
