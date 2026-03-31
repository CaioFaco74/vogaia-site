import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
              <Button href="/contato/" size="lg">
                Falar com especialista
                <ArrowRight size={18} />
              </Button>
              <Button href="/cases/" variant="secondary" size="lg">
                Ver cases de sucesso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS - Placeholder para quando tiver logos de clientes */}
      <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <p className="text-center text-sm text-text-disabled uppercase tracking-widest mb-8">
            Empresas que confiam na VogaIA
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            {/* Placeholder logos — substituir por logos reais */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-text-muted/20 rounded"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <Section>
        <SectionHeader
          badge="Soluções"
          title="Soluções de IA para cada desafio"
          description="Combinamos inteligência artificial com estratégia de negócios para entregar resultados mensuráveis."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Card key={service.slug}>
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
            );
          })}
        </div>
      </Section>

      {/* COMO FUNCIONA */}
      <Section className="bg-bg-secondary">
        <SectionHeader
          badge="Processo"
          title="Do diagnóstico ao resultado em 3 passos"
          description="Uma metodologia clara e comprovada para transformar seu negócio com IA."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FFA020] to-[#FF5510] text-white text-2xl font-bold mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* NÚMEROS DE IMPACTO - Placeholder */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Horas economizadas/mês" },
            { value: "40%", label: "Aumento em conversão" },
            { value: "3s", label: "Tempo de resposta" },
            { value: "20+", label: "Projetos entregues" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CASE DESTAQUE - Placeholder */}
      <Section className="bg-bg-secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-4">
              Case em destaque
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resultados reais com inteligência artificial
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Em breve, nossos cases de sucesso com métricas reais de clientes
              que transformaram seus negócios com as soluções da VogaIA.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Redução de custos operacionais",
                "Aumento na velocidade de atendimento",
                "Mais leads qualificados automaticamente",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-secondary">
                  <CheckCircle size={18} className="text-orange-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/cases/">
              Ver todos os cases <ArrowRight size={16} />
            </Button>
          </div>
          <div className="bg-bg-card border border-border-subtle rounded-xl p-12 flex items-center justify-center min-h-[300px]">
            <p className="text-text-disabled text-center">
              Imagem do case em destaque
            </p>
          </div>
        </div>
      </Section>

      {/* DEPOIMENTOS - Placeholder */}
      <Section>
        <SectionHeader
          badge="Depoimentos"
          title="O que nossos clientes dizem"
          description="Feedback real de quem já transformou seu negócio com nossas soluções."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} hover={false}>
              <MessageSquare size={24} className="text-orange-primary mb-4" />
              <p className="text-text-muted italic leading-relaxed mb-6">
                &ldquo;Depoimento real de cliente em breve.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg-card-hover rounded-full" />
                <div>
                  <p className="text-sm font-medium">Nome do Cliente</p>
                  <p className="text-xs text-text-muted">Cargo, Empresa</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary">
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
            <Button href="/contato/" size="lg">
              Agendar conversa gratuita
              <ArrowRight size={18} />
            </Button>
            <Button
              href={SITE.whatsappLink}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
