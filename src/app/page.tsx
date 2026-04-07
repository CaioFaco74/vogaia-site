import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { TrackedCTA } from "@/components/tracked-cta";
import { SERVICES, PROCESS_STEPS, SITE } from "@/lib/constants";
import {
  Headset,
  TrendingUp,
  Bot,
  Settings,
  ArrowRight,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const serviceIcons = {
  headset: Headset,
  "trending-up": TrendingUp,
  bot: Bot,
  settings: Settings,
} as const;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-primary/10 rounded-full blur-[96px]" />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-6">
              Inteligência Artificial para Empresas
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Inteligência Artificial que{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                gera resultado.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-10 leading-relaxed">
              Automatize atendimento, vendas e operações com soluções de IA sob
              medida para o seu negócio. Do diagnóstico ao resultado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedCTA href="/contato/" ctaName="falar_especialista" location="hero">
                Falar com especialista
                <ArrowRight size={18} />
              </TrackedCTA>
              <TrackedCTA href="/cases/" ctaName="ver_cases" location="hero" variant="secondary">
                Ver cases de sucesso
              </TrackedCTA>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS DE CLIENTES */}
      <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <AnimateOnScroll>
            <p className="text-center text-sm text-text-disabled uppercase tracking-widest mb-8">
              Empresas que confiam na VogaIA
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
              {[
                { src: "/logos/transtop.png", alt: "TransTop", h: "h-14" },
                { src: "/logos/nordplast.jpeg", alt: "NordPlast", h: "h-18" },
                { src: "/logos/polimatec.jpeg", alt: "Polimatec", h: "h-18" },
                { src: "/logos/impacto.png", alt: "Impacto Proteção", h: "h-16" },
                { src: "/logos/agilean.png", alt: "Agilean", h: "h-16" },
              ].map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={48}
                  className={`${logo.h} w-auto object-contain rounded-lg opacity-70 hover:opacity-100 transition-opacity`}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SERVIÇOS */}
      <Section>
        <AnimateOnScroll>
          <SectionHeader
            badge="Soluções"
            title="Soluções de IA para cada desafio"
            description="Combinamos inteligência artificial com estratégia de negócios para entregar resultados mensuráveis."
          />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <AnimateOnScroll key={service.slug} delay={i * 0.1}>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-orange-subtle shrink-0">
                      <Icon size={24} className="text-orange-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>
                      <a
                        href={`/servicos/${service.slug}/`}
                        className="inline-flex items-center gap-1 text-sm text-orange-primary hover:text-orange-hover transition-colors font-medium"
                      >
                        Saiba mais <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Section>

      {/* COMO FUNCIONA */}
      <Section className="bg-bg-secondary">
        <AnimateOnScroll>
          <SectionHeader
            badge="Processo"
            title="Do diagnóstico ao resultado em 3 passos"
            description="Uma metodologia clara e comprovada para transformar seu negócio com IA."
          />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <AnimateOnScroll key={step.step} delay={i * 0.15}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FFA020] to-[#FF5510] text-white text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* NÚMEROS DE IMPACTO - Placeholder */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "7+", label: "Verticais atendidas" },
            { value: "+42%", label: "Leads qualificados (SDR IA)" },
            { value: "~8s", label: "Tempo de resposta WhatsApp" },
            { value: "11", label: "Projetos em produção" },
          ].map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 0.1} direction="none">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* CASE DESTAQUE */}
      <Section className="bg-bg-secondary">
        <AnimateOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-4">
              Case em destaque
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              5 agentes de IA gerenciando{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                600+ ordens de serviço/mês
              </span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Metalúrgica industrial com materiais de alta complexidade precisava
              de planejamento de produção mais inteligente. Desenvolvemos 5 agentes
              CrewAI que analisam, preveem riscos e otimizam recursos automaticamente.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "60% de redução no tempo de análise de produção",
                "75% de precisão preditiva com modelo XGBoost",
                "84% de utilização média das máquinas",
                "85% de adoção do sistema pela equipe",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-secondary">
                  <CheckCircle size={18} className="text-orange-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/cases/agentes-autonomos-consultoria/">
              Ver case completo <ArrowRight size={16} />
            </Button>
          </div>
          <div className="bg-bg-card border border-border-subtle rounded-xl p-8 min-h-[300px]">
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-xs text-text-disabled uppercase tracking-widest mb-2">Pipeline de Agentes</p>
              </div>
              {[
                { step: "1", name: "Analista de Dados", desc: "Detecta padrões no histórico" },
                { step: "2", name: "Analista Preditivo", desc: "Pontua risco por OS (XGBoost)" },
                { step: "3", name: "Otimizador", desc: "Balanceia carga de máquinas" },
                { step: "4", name: "Scheduler", desc: "Cronograma otimizado de 5 dias" },
                { step: "5", name: "Executivo", desc: "Relatórios com KPIs e ROI" },
              ].map((agent) => (
                <div key={agent.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFA020] to-[#FF5510] flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {agent.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-text-muted">{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </Section>

      {/* DEPOIMENTOS */}
      <Section>
        <AnimateOnScroll>
          <SectionHeader
            badge="Depoimentos"
            title="O que nossos clientes dizem"
            description="Feedback real de quem já transformou seu negócio com nossas soluções."
          />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              texto: "Quando o sistema passou a considerar a complexidade de cada material, a precisão das previsões saltou de 58% para 75%. Os dois dashboards diferentes garantiram a adoção de 85% da equipe.",
              nome: "Gerente de Produção",
              cargo: "Metalúrgica Industrial",
            },
            {
              texto: "A busca híbrida desbloqueou o valor dos nossos 2.000+ projetos históricos. E a regra de que o agente nunca inventa número — sempre consulta a base — eliminou a desconfiança da equipe desde o primeiro dia.",
              nome: "Diretor de Produto",
              cargo: "Plataforma de Gestão de Obras",
            },
            {
              texto: "Os vendedores agora só falam com quem realmente tem perfil de compra. A IA faz as perguntas certas, no tom certo, e quando o lead chega pro vendedor já vem com toda a qualificação pronta.",
              nome: "Gerente Comercial",
              cargo: "Indústria de Plásticos B2B",
            },
          ].map((dep, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <Card hover={false}>
                <MessageSquare size={24} className="text-orange-primary mb-4" />
                <p className="text-text-muted italic leading-relaxed mb-6">
                  &ldquo;{dep.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFA020] to-[#FF5510] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {dep.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{dep.nome}</p>
                    <p className="text-xs text-text-muted">{dep.cargo}</p>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary">
        <AnimateOnScroll>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para transformar seu negócio com{" "}
            <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
              IA
            </span>
            ?
          </h2>
          <p className="text-text-muted text-lg mb-10">
            Agende uma conversa gratuita de 30 minutos com nosso time e descubra
            como a inteligência artificial pode impulsionar seus resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedCTA href="/contato/" ctaName="agendar_conversa" location="cta_final">
              Agendar conversa gratuita
              <ArrowRight size={18} />
            </TrackedCTA>
            <TrackedCTA
              href={SITE.whatsappLink}
              ctaName="whatsapp"
              location="cta_final"
              variant="secondary"
              isWhatsApp
            >
              Chamar no WhatsApp
            </TrackedCTA>
          </div>
        </div>
        </AnimateOnScroll>
      </Section>
    </>
  );
}
