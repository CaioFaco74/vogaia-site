import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import {
  Target,
  Eye,
  Heart,
  Zap,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a VogaIA",
  description:
    "Conheça a VogaIA: equipe especializada em inteligência artificial aplicada a negócios. Soluções de IA em Fortaleza e todo o Brasil.",
};

const valores = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Democratizar o acesso à inteligência artificial para empresas de todos os portes, transformando operações e gerando resultados mensuráveis.",
  },
  {
    icon: Eye,
    title: "Visão",
    description:
      "Ser a referência em soluções de IA aplicada a negócios no Brasil, reconhecida pela excelência técnica e pelos resultados entregues.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Resultado primeiro, transparência total, inovação com propósito, parceria genuína e melhoria contínua em cada projeto.",
  },
];

const diferenciais = [
  {
    icon: Zap,
    title: "Foco em resultado",
    description:
      "Cada projeto começa com métricas claras de sucesso. Não entregamos tecnologia por tecnologia — entregamos impacto no negócio.",
  },
  {
    icon: Users,
    title: "Equipe especialista",
    description:
      "Time multidisciplinar com experiência em IA, automação, vendas e atendimento ao cliente.",
  },
  {
    icon: BarChart3,
    title: "Metodologia própria",
    description:
      "Do diagnóstico à implementação, seguimos um processo estruturado que minimiza riscos e maximiza resultados.",
  },
  {
    icon: Shield,
    title: "Suporte contínuo",
    description:
      "Não entregamos e sumimos. Acompanhamos métricas, otimizamos e garantimos que a solução evolua com seu negócio.",
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-6">
              Sobre nós
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Quem é a{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                VogaIA
              </span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Somos uma empresa especializada em inteligência artificial aplicada
              a negócios. Ajudamos empresas a automatizar processos, aumentar
              vendas e melhorar o atendimento ao cliente com soluções de IA sob
              medida.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valores.map((item) => (
            <Card key={item.title} hover={false}>
              <div className="p-3 rounded-lg bg-orange-subtle inline-flex mb-4">
                <item.icon size={24} className="text-orange-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Diferenciais */}
      <Section className="bg-bg-secondary">
        <SectionHeader
          badge="Diferenciais"
          title="Por que escolher a VogaIA"
          description="O que nos diferencia no mercado de inteligência artificial."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diferenciais.map((item) => (
            <Card key={item.title}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-subtle shrink-0">
                  <item.icon size={24} className="text-orange-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Localização */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-4">
              Localização
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Feito em Fortaleza, para o Brasil
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Nossa sede fica em Fortaleza, Ceará, mas atendemos empresas em todo
              o Brasil. Combinamos atendimento próximo com a escalabilidade das
              soluções digitais.
            </p>
            <div className="flex items-center gap-3 text-text-muted mb-8">
              <MapPin size={20} className="text-orange-primary" />
              <span>{SITE.address}</span>
            </div>
            <Button href="/contato/">
              Fale conosco <ArrowRight size={16} />
            </Button>
          </div>
          <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3!2d-38.51!3d-3.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMjQuMCJTIDM4wrAzMCczNi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização VogaIA"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Quer fazer parte dessa história?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Vamos conversar sobre como a IA pode transformar o seu negócio.
          </p>
          <Button href="/contato/" size="lg">
            Falar com a VogaIA <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </>
  );
}
