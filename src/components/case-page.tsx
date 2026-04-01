import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/cases-data";
import {
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  MessageSquare,
  Quote,
} from "lucide-react";

export function CasePage({ caseData }: { caseData: CaseStudy }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-subtle">
                <Building2 size={24} className="text-orange-primary" />
              </div>
              <div>
                <p className="font-semibold">{caseData.empresa}</p>
                <p className="text-sm text-text-muted">
                  {caseData.industria} &middot; {caseData.servico}
                </p>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {caseData.resumo}
            </h1>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                Implementação: {caseData.timeline}
              </span>
              <a
                href={`/servicos/${caseData.servicoSlug}/`}
                className="text-orange-primary hover:text-orange-hover transition-colors"
              >
                {caseData.servico} &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados em destaque */}
      <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {caseData.resultados.map((r) => (
              <div key={r.description}>
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent mb-1">
                  {r.metric}
                </div>
                <p className="text-text-muted text-xs md:text-sm">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desafio */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-error/10 text-error mb-4">
              O Desafio
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O que a empresa enfrentava
            </h2>
            <p className="text-text-muted leading-relaxed">
              {caseData.desafio}
            </p>
          </div>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success mb-4">
              A Solução
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O que implementamos
            </h2>
            <p className="text-text-muted leading-relaxed">
              {caseData.solucao}
            </p>
          </div>
        </div>
      </Section>

      {/* Resultados detalhados */}
      <Section className="bg-bg-secondary">
        <SectionHeader
          badge="Resultados"
          title="Impacto mensurável"
          description="Números reais que comprovam a transformação."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {caseData.resultados.map((r) => (
            <div
              key={r.description}
              className="flex items-center gap-4 p-5 bg-bg-card border border-border-subtle rounded-xl"
            >
              <CheckCircle size={22} className="text-orange-primary shrink-0" />
              <div>
                <span className="text-xl font-bold text-orange-primary">
                  {r.metric}
                </span>
                <p className="text-sm text-text-muted">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Depoimento */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="relative">
            <Quote
              size={40}
              className="text-orange-primary/20 absolute top-6 right-6"
            />
            <MessageSquare size={24} className="text-orange-primary mb-4" />
            <blockquote className="text-lg md:text-xl leading-relaxed italic text-text-secondary mb-6">
              &ldquo;{caseData.depoimento.texto}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-subtle rounded-full flex items-center justify-center">
                <span className="text-orange-primary font-bold text-lg">
                  {caseData.depoimento.nome.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{caseData.depoimento.nome}</p>
                <p className="text-sm text-text-muted">
                  {caseData.depoimento.cargo}, {caseData.depoimento.empresa}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Quer resultados semelhantes?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Vamos conversar sobre como a IA pode gerar impacto no seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contato/" size="lg">
              Falar com especialista <ArrowRight size={18} />
            </Button>
            <Button href="/cases/" variant="secondary" size="lg">
              Ver outros cases
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
