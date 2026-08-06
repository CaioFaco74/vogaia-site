import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const alt = "VogaIA - Soluções de Inteligência Artificial para Empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #FFA020, #FF6B2B, #FF5510)",
          }}
        />

        <svg
          viewBox="0 0 120 100"
          width="120"
          height="100"
          style={{ marginBottom: 32 }}
        >
          <path
            d="M10 10L60 90L110 10"
            fill="none"
            stroke="#FF6B2B"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          <span>Voga</span>
          <span style={{ color: "#FF6B2B" }}>IA</span>
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#888888",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Inteligência Artificial que gera resultados reais
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            gap: 32,
            fontSize: 16,
            color: "#555555",
          }}
        >
          <span>Atendimento com IA</span>
          <span style={{ color: "#FF6B2B" }}>|</span>
          <span>Automação de Vendas</span>
          <span style={{ color: "#FF6B2B" }}>|</span>
          <span>Agentes de IA</span>
          <span style={{ color: "#FF6B2B" }}>|</span>
          <span>Projetos Customizados</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
