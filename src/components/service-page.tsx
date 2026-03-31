"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { ServiceData } from "@/lib/services-data";
import {
  ArrowRight,
  ChevronDown,
  AlertCircle,
  Headset,
  TrendingUp,
  Bot,
  Settings,
  MessageSquare,
  Clock,
  BarChart3,
  Users,
  Zap,
  Shield,
  Brain,
  Workflow,
  Target,
  Layers,
  Code,
  Database,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  headset: Headset,
  "trending-up": TrendingUp,
  bot: Bot,
  settings: Settings,
  "message-square": MessageSquare,
  clock: Clock,
  "bar-chart-3": BarChart3,
  users: Users,
  zap: Zap,
  shield: Shield,
  brain: Brain,
  workflow: Workflow,
  target: Target,
  layers: Layers,
  code: Code,
  database: Database,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Settings;
}

function FAQ({ faqs }: { faqs: ServiceData["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-card-hover transition-colors cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium text-sm pr-4">{faq.question}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-text-muted transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p className="text-sm text-text-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ServicePage({ service }: { service: ServiceData }) {
  const MainIcon = getIcon(service.icon);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="p-3 rounded-lg bg-orange-subtle inline-flex mb-6">
              <MainIcon size={28} className="text-orange-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-orange-primary font-medium text-lg mb-4">
              {service.subtitle}
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contato/" size="lg">
                Solicitar diagnóstico gratuito <ArrowRight size={18} />
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
        </div>
      </section>

      {/* O Problema */}
      <Section className="bg-bg-secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-error/10 text-error mb-4">
              O Problema
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {service.problem.title}
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              {service.problem.description}
            </p>
          </div>
          <div className="space-y-3">
            {service.problem.painPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 p-4 bg-bg-card border border-border-subtle rounded-lg"
              >
                <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
                <p className="text-sm text-text-muted">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* A Solução */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success mb-4">
            A Solução
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {service.solution.title}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            {service.solution.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.features.map((feature) => {
            const FeatureIcon = getIcon(feature.icon);
            return (
              <Card key={feature.title}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-subtle shrink-0">
                    <FeatureIcon size={22} className="text-orange-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Benefícios */}
      <Section className="bg-bg-secondary">
        <SectionHeader
          badge="Resultados"
          title="Benefícios concretos"
          description="Métricas reais que nossos clientes alcançam."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {service.benefits.map((b) => (
            <div key={b.description} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent mb-2">
                {b.metric}
              </div>
              <p className="text-text-muted text-sm">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Integrações */}
      <Section>
        <SectionHeader
          badge="Integrações"
          title="Funciona com as ferramentas que você já usa"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {service.integrations.map((name) => (
            <div
              key={name}
              className="px-6 py-3 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-muted"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-bg-secondary">
        <SectionHeader badge="Dúvidas" title="Perguntas frequentes" />
        <div className="max-w-2xl mx-auto">
          <FAQ faqs={service.faqs} />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Quer ver essa solução funcionando?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Agende uma demonstração gratuita e veja como podemos transformar seu
            negócio.
          </p>
          <Button href="/contato/" size="lg">
            Agendar demonstração <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </>
  );
}
