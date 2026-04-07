"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { trackEvent, trackMetaEvent } from "@/lib/tracking";
import { CheckCircle, Zap, Clock, Shield, ArrowRight } from "lucide-react";

const diagnosticoSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  empresa: z.string().min(2, "Empresa é obrigatória"),
  funcionarios: z.string().min(1, "Selecione uma opção"),
});

type DiagnosticoFormData = z.infer<typeof diagnosticoSchema>;

const inputStyles =
  "w-full bg-[#111118] border border-[#2A2A3A] rounded-lg px-4 py-3.5 text-white placeholder:text-[#6B6B80] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-colors text-base";
const labelStyles = "block text-sm font-medium text-[#B8B8CC] mb-2";
const errorStyles = "text-xs text-red-400 mt-1";

export default function DiagnosticoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const val = params.get(key);
      if (val) utms[key] = val;
    });
    setUtmParams(utms);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosticoFormData>({
    resolver: zodResolver(diagnosticoSchema),
  });

  async function onSubmit(data: DiagnosticoFormData) {
    // GA4 + Meta Pixel
    trackEvent("diagnostico_submit", {
      form_name: "diagnostico",
      company_size: data.funcionarios,
      ...utmParams,
    });
    trackMetaEvent("Lead", {
      content_name: "Diagnostico IA",
      content_category: "diagnostico",
    });

    // Enviar para Make webhook (mesmo do contato)
    try {
      await fetch(
        "https://hook.us1.make.com/lzoiiytwu71gjywwwdc3elog4h8dttsj",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "diagnostico_ia",
            servico: "diagnostico-ia",
            comoEncontrou: utmParams.utm_source || "direto",
            ...data,
            ...utmParams,
            timestamp: new Date().toISOString(),
          }),
        }
      );
    } catch {
      // Falha silenciosa
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Recebemos seu pedido!
          </h1>
          <p className="text-[#B8B8CC] text-lg mb-4">
            Em até 24 horas úteis, entraremos em contato pelo WhatsApp para agendar
            seu diagnóstico gratuito de 15 minutos.
          </p>
          <p className="text-[#6B6B80] text-sm mb-8">
            Enquanto isso, veja como a IA já funciona em empresas como a sua:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/cases/">Ver cases de sucesso</Button>
            <Button href="/" variant="secondary">
              Voltar ao início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B2B] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF5510] rounded-full blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Value proposition */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 text-[#FF6B2B] text-sm font-semibold mb-8">
              <Zap size={16} />
              GRATUITO E SEM COMPROMISSO
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Descubra onde a IA gera mais{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                resultado na sua empresa
              </span>
            </h1>

            <p className="text-[#B8B8CC] text-lg mb-10 leading-relaxed">
              Em 15 minutos, analisamos seus processos e mostramos exatamente onde
              agentes de IA podem reduzir custos, acelerar vendas e eliminar
              gargalos operacionais.
            </p>

            {/* Proof points */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 flex-shrink-0">
                  <Clock size={20} className="text-[#FF6B2B]" />
                </div>
                <div>
                  <p className="text-white font-semibold">15 minutos</p>
                  <p className="text-[#6B6B80] text-sm">
                    Conversa rápida e objetiva. Sem enrolação.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 flex-shrink-0">
                  <Shield size={20} className="text-[#FF6B2B]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Sem compromisso</p>
                  <p className="text-[#6B6B80] text-sm">
                    Você sai com um mapa claro, mesmo que não feche nada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 flex-shrink-0">
                  <Zap size={20} className="text-[#FF6B2B]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Resultado real</p>
                  <p className="text-[#6B6B80] text-sm">
                    11 projetos em 7 verticais. NordPlast reduziu tempo de resposta de 14h para 3min.
                  </p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 text-sm text-[#6B6B80]">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFA020] to-[#FF5510] border-2 border-[#0A0A0F]"
                  />
                ))}
              </div>
              Empresas como NordPlast, Polimatec e TransTop já fizeram
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Preencha e receba seu diagnóstico
            </h2>
            <p className="text-[#6B6B80] text-sm mb-8">
              Campos marcados com * são obrigatórios
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="nome" className={labelStyles}>
                  Nome completo *
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  className={inputStyles}
                  {...register("nome")}
                />
                {errors.nome && (
                  <p className={errorStyles}>{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelStyles}>
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@empresa.com.br"
                  className={inputStyles}
                  {...register("email")}
                />
                {errors.email && (
                  <p className={errorStyles}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelStyles}>
                  WhatsApp *
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  placeholder="(85) 99999-9999"
                  className={inputStyles}
                  {...register("whatsapp")}
                />
                {errors.whatsapp && (
                  <p className={errorStyles}>{errors.whatsapp.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="empresa" className={labelStyles}>
                  Empresa *
                </label>
                <input
                  id="empresa"
                  type="text"
                  placeholder="Nome da sua empresa"
                  className={inputStyles}
                  {...register("empresa")}
                />
                {errors.empresa && (
                  <p className={errorStyles}>{errors.empresa.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="funcionarios" className={labelStyles}>
                  Número de funcionários *
                </label>
                <select
                  id="funcionarios"
                  className={inputStyles}
                  {...register("funcionarios")}
                >
                  <option value="">Selecione</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
                {errors.funcionarios && (
                  <p className={errorStyles}>{errors.funcionarios.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FFA020] to-[#FF5510] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    QUERO MEU DIAGNOSTICO
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="text-xs text-[#6B6B80] text-center mt-4">
                Ao enviar, você concorda com nossa{" "}
                <a
                  href="/privacidade/"
                  className="text-[#FF6B2B] hover:underline"
                >
                  Política de Privacidade
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
