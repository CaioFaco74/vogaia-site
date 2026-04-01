import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { casesData } from "@/lib/cases-data";
import { ArrowRight, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cases de Sucesso",
  description:
    "Veja resultados reais de empresas que transformaram seus negócios com as soluções de IA da VogaIA.",
};

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-6">
              Cases de Sucesso
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Resultados reais com{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                inteligência artificial
              </span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Conheça histórias de empresas que transformaram suas operações,
              aumentaram vendas e melhoraram o atendimento com nossas soluções de
              IA.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Cases */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {casesData.map((caseItem) => (
            <Link
              key={caseItem.slug}
              href={`/cases/${caseItem.slug}/`}
              className="group"
            >
              <Card className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-subtle">
                    <Building2 size={20} className="text-orange-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{caseItem.empresa}</p>
                    <p className="text-xs text-text-muted">{caseItem.industria}</p>
                  </div>
                </div>

                {/* Badge serviço */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-bg-secondary text-text-muted mb-4 w-fit">
                  {caseItem.servico}
                </span>

                {/* Resumo */}
                <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">
                  {caseItem.resumo}
                </p>

                {/* Métrica destaque */}
                <div className="p-4 bg-bg-secondary rounded-lg mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                    {caseItem.metricaDestaque.valor}
                  </div>
                  <p className="text-xs text-text-muted">
                    {caseItem.metricaDestaque.label}
                  </p>
                </div>

                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm text-orange-primary font-medium group-hover:gap-2 transition-all">
                  Ver case completo <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Quer ser o próximo case de sucesso?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Vamos conversar sobre como a IA pode gerar resultados no seu
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
