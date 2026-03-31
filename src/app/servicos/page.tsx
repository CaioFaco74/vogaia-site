import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/lib/services-data";
import {
  ArrowRight,
  Check,
  X,
  Headset,
  TrendingUp,
  Bot,
  Settings,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  headset: Headset,
  "trending-up": TrendingUp,
  bot: Bot,
  settings: Settings,
};

export const metadata: Metadata = {
  title: "Serviços de IA para Empresas",
  description:
    "Atendimento com IA, automação de vendas, agentes inteligentes e projetos customizados. Descubra como a IA pode transformar seu negócio.",
};

const comparativo = [
  { item: "Tempo de resposta ao cliente", antes: "Horas ou dias", depois: "Segundos" },
  { item: "Disponibilidade", antes: "Horário comercial", depois: "24/7" },
  { item: "Qualificação de leads", antes: "Manual, inconsistente", depois: "Automática, padronizada" },
  { item: "Follow-up de vendas", antes: "Esquece ou atrasa", depois: "100% automatizado" },
  { item: "Capacidade de atendimento", antes: "Limitada ao time", depois: "Ilimitada" },
  { item: "Custo por atendimento", antes: "R$ 15-30", depois: "R$ 0,50-2" },
];

const processo = [
  { step: "01", title: "Discovery", description: "Entendemos seu negócio, processos e oportunidades de IA." },
  { step: "02", title: "Proposta", description: "Apresentamos a solução ideal com escopo, prazo e investimento." },
  { step: "03", title: "Desenvolvimento", description: "Construímos a solução em sprints com entregas incrementais." },
  { step: "04", title: "Deploy", description: "Implementamos em produção com treinamento da equipe." },
  { step: "05", title: "Acompanhamento", description: "Monitoramos métricas e otimizamos continuamente." },
];

export default function ServicosPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-6">
              Serviços
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Soluções de IA que{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                transformam negócios
              </span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Do atendimento ao cliente à automação de vendas, da criação de
              agentes inteligentes a projetos sob medida. Encontre a solução
              ideal para o seu desafio.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Serviços */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Settings;
            return (
            <Card key={service.slug} className="flex flex-col">
              <div className="p-3 rounded-lg bg-orange-subtle inline-flex mb-4 w-fit">
                <Icon size={28} className="text-orange-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-orange-primary font-medium mb-3">
                {service.subtitle}
              </p>
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.benefits.slice(0, 3).map((b) => (
                  <span
                    key={b.description}
                    className="text-xs bg-bg-secondary px-3 py-1 rounded-full text-text-muted"
                  >
                    {b.metric} {b.description}
                  </span>
                ))}
              </div>
              <Button
                href={`/servicos/${service.slug}/`}
                variant="secondary"
                size="sm"
              >
                Conhecer solução <ArrowRight size={14} />
              </Button>
            </Card>
            );
          })}
        </div>
      </Section>

      {/* Comparativo */}
      <Section className="bg-bg-secondary">
        <SectionHeader
          badge="Comparativo"
          title="Antes da IA vs Com a VogaIA"
          description="Veja o impacto real da inteligência artificial na operação."
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">Aspecto</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-error/80">
                  <X size={16} className="inline mr-1" />
                  Antes
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-success/80">
                  <Check size={16} className="inline mr-1" />
                  Com VogaIA
                </th>
              </tr>
            </thead>
            <tbody>
              {comparativo.map((row) => (
                <tr key={row.item} className="border-b border-border-subtle/50">
                  <td className="py-4 px-4 text-sm font-medium">{row.item}</td>
                  <td className="py-4 px-4 text-sm text-text-muted">{row.antes}</td>
                  <td className="py-4 px-4 text-sm text-orange-primary font-medium">
                    {row.depois}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Processo */}
      <Section>
        <SectionHeader
          badge="Processo"
          title="Como funciona o engajamento"
          description="Do primeiro contato ao resultado, um processo estruturado e transparente."
        />
        <div className="space-y-6">
          {processo.map((p) => (
            <div
              key={p.step}
              className="flex items-start gap-6 p-6 bg-bg-card border border-border-subtle rounded-xl hover:border-orange-primary/30 transition-colors"
            >
              <span className="text-2xl font-bold text-orange-primary shrink-0">
                {p.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                <p className="text-text-muted text-sm">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Não sabe qual solução é ideal?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Fale com um especialista e receba um diagnóstico gratuito do seu
            negócio.
          </p>
          <Button href="/contato/" size="lg">
            Falar com especialista <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </>
  );
}
