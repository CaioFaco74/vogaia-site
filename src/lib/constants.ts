export const SITE = {
  name: "VogaIA",
  url: "https://vogaia.com.br",
  email: "atendimento@vogaia.com.br",
  phone: "+55 (85) 98204-2293",
  whatsapp: "5585982042293",
  address: "Rua Vicente Leite, 1820 - Fortaleza, CE",
  whatsappLink:
    "https://wa.me/5585982042293?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20VogaIA",
  social: {
    linkedin: "https://www.linkedin.com/company/vogaia",
    instagram: "https://www.instagram.com/vogaia",
  },
} as const;

export const SERVICES = [
  {
    slug: "atendimento-ia",
    title: "Atendimento com IA",
    shortDescription:
      "Automatize seu atendimento ao cliente com chatbots inteligentes que funcionam 24/7.",
    icon: "headset",
  },
  {
    slug: "automacao-vendas",
    title: "Automação de Vendas",
    shortDescription:
      "Qualifique leads automaticamente e aumente sua conversão com o VendaInteligente AI.",
    icon: "trending-up",
  },
  {
    slug: "agentes-ia",
    title: "Agentes e Clones de IA",
    shortDescription:
      "Crie agentes autônomos e clones de especialistas que trabalham por você.",
    icon: "bot",
  },
  {
    slug: "projetos-customizados",
    title: "Projetos Customizados",
    shortDescription:
      "Soluções de IA sob medida, do diagnóstico à implementação no seu negócio.",
    icon: "settings",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Diagnóstico",
    description:
      "Entendemos seu negócio e mapeamos oportunidades de IA com maior impacto.",
  },
  {
    step: 2,
    title: "Implementação",
    description:
      "Desenvolvemos e integramos a solução no seu fluxo de trabalho existente.",
  },
  {
    step: 3,
    title: "Resultado",
    description:
      "Acompanhamos métricas e otimizamos continuamente para maximizar o retorno.",
  },
] as const;
