export interface CaseStudy {
  slug: string;
  empresa: string;
  industria: string;
  servico: string;
  servicoSlug: string;
  resumo: string;
  metricaDestaque: { valor: string; label: string };
  desafio: string;
  solucao: string;
  resultados: { metric: string; description: string }[];
  depoimento: {
    texto: string;
    nome: string;
    cargo: string;
    empresa: string;
  };
  timeline: string;
}

export const casesData: CaseStudy[] = [
  {
    slug: "atendimento-automatizado-varejo",
    empresa: "Empresa de Varejo",
    industria: "Varejo",
    servico: "Atendimento com IA",
    servicoSlug: "atendimento-ia",
    resumo:
      "Automatização do atendimento ao cliente via WhatsApp com IA, reduzindo tempo de resposta de horas para segundos.",
    metricaDestaque: { valor: "85%", label: "Atendimentos automatizados" },
    desafio:
      "A empresa recebia mais de 500 mensagens por dia no WhatsApp e a equipe de 4 atendentes não conseguia dar conta. O tempo médio de resposta era de 2 horas, gerando reclamações e perda de vendas. Clientes desistiam antes de serem atendidos, especialmente fora do horário comercial.",
    solucao:
      "Implementamos um agente de IA treinado com todo o catálogo de produtos, políticas de troca e FAQ da empresa. O agente responde instantaneamente via WhatsApp, tira dúvidas sobre produtos, informa status de pedidos e encaminha para um humano apenas casos complexos como reclamações formais.",
    resultados: [
      { metric: "85%", description: "Atendimentos resolvidos pela IA" },
      { metric: "3s", description: "Tempo médio de resposta" },
      { metric: "40%", description: "Aumento em vendas pelo WhatsApp" },
      { metric: "24/7", description: "Atendimento ininterrupto" },
    ],
    depoimento: {
      texto:
        "A IA da VogaIA transformou nosso atendimento. Antes perdíamos vendas porque não conseguíamos responder a tempo. Hoje, 85% das dúvidas são resolvidas instantaneamente e nossa equipe foca nos casos que realmente precisam de atenção humana.",
      nome: "Diretor Comercial",
      cargo: "Diretor Comercial",
      empresa: "Empresa de Varejo",
    },
    timeline: "3 semanas",
  },
  {
    slug: "automacao-vendas-b2b",
    empresa: "Indústria B2B",
    industria: "Indústria",
    servico: "Automação de Vendas",
    servicoSlug: "automacao-vendas",
    resumo:
      "SDR com IA qualificando leads via WhatsApp usando metodologia SPIN Selling, triplicando o pipeline de vendas.",
    metricaDestaque: { valor: "3x", label: "Pipeline de vendas" },
    desafio:
      "A equipe comercial de 3 vendedores perdia tempo com leads não qualificados. De cada 100 leads que entravam, apenas 5 viravam reuniões. Não havia processo de qualificação estruturado e os follow-ups dependiam da memória de cada vendedor.",
    solucao:
      "Implementamos o VendaInteligente AI — um agente SDR que qualifica leads automaticamente via WhatsApp usando SPIN Selling. O agente identifica necessidade, urgência e orçamento antes de agendar reunião com o vendedor. Follow-ups são automáticos e personalizados.",
    resultados: [
      { metric: "3x", description: "Mais reuniões qualificadas/mês" },
      { metric: "45%", description: "Taxa de conversão lead-reunião" },
      { metric: "0", description: "Leads perdidos por falta de follow-up" },
      { metric: "60%", description: "Redução no ciclo de vendas" },
    ],
    depoimento: {
      texto:
        "Nossos vendedores agora só falam com quem realmente quer comprar. A IA faz todo o trabalho de qualificação que antes tomava metade do dia da equipe. Triplicamos as reuniões qualificadas sem contratar ninguém.",
      nome: "Gerente Comercial",
      cargo: "Gerente Comercial",
      empresa: "Indústria B2B",
    },
    timeline: "4 semanas",
  },
  {
    slug: "agentes-autonomos-consultoria",
    empresa: "Consultoria Executiva",
    industria: "Serviços",
    servico: "Agentes e Clones de IA",
    servicoSlug: "agentes-ia",
    resumo:
      "Clone digital de consultor sênior para atendimento inicial e diagnóstico automatizado de clientes.",
    metricaDestaque: { valor: "10x", label: "Capacidade de diagnóstico" },
    desafio:
      "O consultor sênior era gargalo da operação — todo cliente novo precisava de uma sessão de diagnóstico com ele. Com agenda lotada, novos clientes esperavam semanas para o primeiro atendimento, gerando desistências.",
    solucao:
      "Criamos um clone de IA do consultor sênior, treinado com sua metodologia, frameworks e estilo de comunicação. O clone conduz sessões de diagnóstico iniciais via chat, coleta informações estruturadas e gera um relatório preliminar. O consultor humano só entra para validar e aprofundar.",
    resultados: [
      { metric: "10x", description: "Mais diagnósticos por semana" },
      { metric: "80%", description: "Redução no tempo do consultor" },
      { metric: "48h", description: "Tempo para primeiro atendimento" },
      { metric: "95%", description: "Satisfação com diagnóstico IA" },
    ],
    depoimento: {
      texto:
        "O clone de IA captura exatamente como eu conduzo um diagnóstico. Meus clientes recebem atendimento imediato e de qualidade, e eu foco meu tempo onde realmente preciso estar — nas decisões estratégicas.",
      nome: "Consultor Sênior",
      cargo: "CEO",
      empresa: "Consultoria Executiva",
    },
    timeline: "5 semanas",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return casesData.find((c) => c.slug === slug);
}
