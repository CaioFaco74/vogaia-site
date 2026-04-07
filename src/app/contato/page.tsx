"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { trackFormSubmit, trackWhatsAppClick, trackCTAClick } from "@/lib/tracking";

const contactSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  empresa: z.string().min(2, "Empresa é obrigatória"),
  cargo: z.string().min(2, "Cargo é obrigatório"),
  funcionarios: z.string().min(1, "Selecione uma opção"),
  servico: z.string().min(1, "Selecione um serviço"),
  comoEncontrou: z.string().min(1, "Selecione uma opção"),
  mensagem: z.string().optional(),
  privacidade: z.literal(true, {
    message: "Você deve aceitar a política de privacidade",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputStyles =
  "w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-orange-primary focus:ring-1 focus:ring-orange-primary transition-colors";
const labelStyles = "block text-sm font-medium text-text-secondary mb-2";
const errorStyles = "text-xs text-error mt-1";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // Tracking GA4 + Meta Pixel
    trackFormSubmit({
      servico: data.servico,
      funcionarios: data.funcionarios,
      comoEncontrou: data.comoEncontrou,
    });

    // Enviar para Make webhook
    try {
      await fetch(
        "https://hook.us1.make.com/lzoiiytwu71gjywwwdc3elog4h8dttsj",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "site_vogaia",
            ...data,
            timestamp: new Date().toISOString(),
          }),
        }
      );
    } catch {
      // Falha silenciosa — formulário ainda mostra sucesso
      // O tracking já foi disparado
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Section className="pt-32 min-h-screen flex items-center">
        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Mensagem enviada!</h1>
          <p className="text-text-muted mb-8">
            Obrigado pelo contato. Nossa equipe retornará em até 24 horas
            úteis. Fique de olho no seu email.
          </p>
          <Button href="/">Voltar para o início</Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Vamos conversar sobre o{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                futuro do seu negócio
              </span>
            </h1>
            <p className="text-text-muted text-lg">
              Preencha o formulário abaixo e nossa equipe entrará em contato para
              entender como a IA pode transformar sua operação.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Email corporativo *
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefone" className={labelStyles}>
                    Telefone / WhatsApp *
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    placeholder="(85) 99999-9999"
                    className={inputStyles}
                    {...register("telefone")}
                  />
                  {errors.telefone && (
                    <p className={errorStyles}>{errors.telefone.message}</p>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cargo" className={labelStyles}>
                    Cargo *
                  </label>
                  <input
                    id="cargo"
                    type="text"
                    placeholder="Seu cargo na empresa"
                    className={inputStyles}
                    {...register("cargo")}
                  />
                  {errors.cargo && (
                    <p className={errorStyles}>{errors.cargo.message}</p>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="servico" className={labelStyles}>
                    Serviço de interesse *
                  </label>
                  <select
                    id="servico"
                    className={inputStyles}
                    {...register("servico")}
                  >
                    <option value="">Selecione</option>
                    <option value="atendimento-ia">Atendimento com IA</option>
                    <option value="automacao-vendas">Automação de Vendas</option>
                    <option value="agentes-ia">Agentes e Clones de IA</option>
                    <option value="projetos-customizados">Projetos Customizados</option>
                    <option value="nao-sei">Não sei ainda</option>
                  </select>
                  {errors.servico && (
                    <p className={errorStyles}>{errors.servico.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="comoEncontrou" className={labelStyles}>
                    Como nos encontrou? *
                  </label>
                  <select
                    id="comoEncontrou"
                    className={inputStyles}
                    {...register("comoEncontrou")}
                  >
                    <option value="">Selecione</option>
                    <option value="google">Google</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="indicacao">Indicação</option>
                    <option value="evento">Evento</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.comoEncontrou && (
                    <p className={errorStyles}>{errors.comoEncontrou.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className={labelStyles}>
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  placeholder="Conte um pouco sobre seu desafio ou projeto..."
                  className={inputStyles}
                  {...register("mensagem")}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="privacidade"
                  type="checkbox"
                  className="mt-1 accent-orange-primary"
                  {...register("privacidade")}
                />
                <label htmlFor="privacidade" className="text-sm text-text-muted">
                  Concordo com a{" "}
                  <a
                    href="/privacidade/"
                    className="text-orange-primary hover:text-orange-hover underline"
                  >
                    Política de Privacidade
                  </a>{" "}
                  da VogaIA.
                </label>
              </div>
              {errors.privacidade && (
                <p className={errorStyles}>{errors.privacidade.message}</p>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                <Send size={18} />
              </Button>
            </form>
          </div>

          {/* Info lateral */}
          <div className="space-y-8">
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <h3 className="font-semibold mb-6">Informações de contato</h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-sm text-text-muted hover:text-orange-primary transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-orange-subtle">
                      <Mail size={18} className="text-orange-primary" />
                    </div>
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-text-muted hover:text-orange-primary transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-orange-subtle">
                      <Phone size={18} className="text-orange-primary" />
                    </div>
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <div className="p-2 rounded-lg bg-orange-subtle">
                    <MapPin size={18} className="text-orange-primary" />
                  </div>
                  {SITE.address}
                </li>
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <div className="p-2 rounded-lg bg-orange-subtle">
                    <Clock size={18} className="text-orange-primary" />
                  </div>
                  Seg-Sex, 9h às 18h
                </li>
              </ul>
            </div>

            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <h3 className="font-semibold mb-3">Prefere WhatsApp?</h3>
              <p className="text-sm text-text-muted mb-4">
                Resposta rápida pelo nosso WhatsApp Business.
              </p>
              <Button
                href={SITE.whatsappLink}
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => trackWhatsAppClick("contato_sidebar")}
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
