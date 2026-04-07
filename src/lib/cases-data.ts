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
    slug: "agentes-autonomos-consultoria",
    empresa: "Metalúrgica Industrial",
    industria: "Indústria Metalúrgica",
    servico: "Agentes e Clones de IA",
    servicoSlug: "agentes-ia",
    resumo:
      "5 agentes de IA autônomos para planejamento e controle de produção (PCP) — reduzindo 60% do tempo de análise com 75% de precisão preditiva.",
    metricaDestaque: { valor: "60%", label: "Redução no tempo de análise" },
    desafio:
      "Metalúrgica com mais de 600 ordens de serviço por mês, materiais de alta complexidade (Hardox, inox, ferro fundido) e integração entre ERP legado, MS Project e dashboards. O planejamento de produção era manual, dependia de planilhas e da experiência de poucos profissionais. Atrasos eram identificados tarde demais e a utilização das máquinas ficava abaixo do ideal.",
    solucao:
      "Desenvolvemos um sistema com 5 agentes CrewAI especializados que trabalham em sequência: (1) Analista de Dados detecta padrões no histórico de produção; (2) Analista Preditivo pontua risco por OS usando modelo XGBoost; (3) Otimizador de Recursos balanceia carga de máquinas; (4) Especialista em Scheduling gera cronograma otimizado de 5 dias; (5) Analista Executivo produz relatórios com KPIs e ROI. Integração completa com ERP via ETL automatizado e dashboards separados para chão de fábrica e gestão.",
    resultados: [
      { metric: "60%", description: "Redução no tempo de análise de produção" },
      { metric: "75%", description: "Precisão do modelo preditivo (XGBoost)" },
      { metric: "84%", description: "Utilização média das máquinas" },
      { metric: "85%", description: "Adoção do sistema pela equipe" },
    ],
    depoimento: {
      texto:
        "A chave foi o fator de complexidade por material — quando o sistema passou a considerar que Hardox leva 40% mais tempo para usinar que aço carbono, a precisão das previsões saltou de 58% para 75%. E os dois dashboards diferentes, um pro chão de fábrica e outro pra gestão, foram o que garantiu a adoção de 85%.",
      nome: "Gerente de Produção",
      cargo: "Gerente de Produção",
      empresa: "Metalúrgica Industrial",
    },
    timeline: "8 semanas",
  },
  {
    slug: "planejamento-ia-construcao",
    empresa: "Plataforma de Gestão de Obras",
    industria: "Construção Civil / SaaS",
    servico: "Projetos de IA Customizados",
    servicoSlug: "projetos-customizados",
    resumo:
      "3 agentes de IA com RAG híbrido sobre 2.000+ obras históricas — reduzindo planejamento de obras de 30 para 15 dias com busca inteligente de referências.",
    metricaDestaque: { valor: "50%", label: "Redução no tempo de planejamento" },
    desafio:
      "Plataforma SaaS de gestão Lean para construção civil precisava acelerar o planejamento de novas obras. Cada projeto exigia que engenheiros pesquisassem manualmente referências históricas, montassem cronogramas do zero e estimassem riscos com base na experiência pessoal. O processo levava em média 30 dias e a qualidade dependia do profissional disponível. Com mais de 2.000 obras no histórico, havia uma riqueza de dados que ninguém conseguia aproveitar — expertise concentrada em poucos profissionais sêniores.",
    solucao:
      "Desenvolvemos 3 agentes especializados orquestrados em sequência com checkpoints de validação humana: (1) Descobridor de Obras Similares usa busca híbrida BM25 + semântica + re-ranker sobre o banco vetorial para encontrar as 5 obras mais relevantes; (2) Parametrizador Inteligente gera EAP, cronograma e linha de balanço adaptados a partir da obra de referência aprovada; (3) Preditor de Riscos analisa histórico de problemas em obras similares e gera alertas com plano de mitigação em formato 5W2H. O engenheiro valida cada etapa antes de avançar — os agentes propõem, o humano decide. Todo dado numérico é buscado via tool obrigatória, eliminando alucinações.",
    resultados: [
      { metric: "50%", description: "Redução no tempo de planejamento (30d → 15d)" },
      { metric: ">80%", description: "Hit Rate na busca de obras similares" },
      { metric: "0%", description: "Alucinações numéricas (tool obrigatória)" },
      { metric: "108%", description: "ROI estimado no primeiro ano" },
    ],
    depoimento: {
      texto:
        "A busca híbrida foi o que desbloqueou o valor. Termos técnicos como EAP e PPCQ precisam de busca exata, mas quando o engenheiro pede 'uma obra parecida', precisa de semântica. E a regra de que o agente nunca inventa número — sempre consulta a base — eliminou a desconfiança da equipe desde o primeiro dia.",
      nome: "Diretor de Produto",
      cargo: "Diretor de Produto",
      empresa: "Plataforma de Gestão de Obras",
    },
    timeline: "12 semanas",
  },
  {
    slug: "automacao-vendas-b2b",
    empresa: "Indústria de Plásticos",
    industria: "Indústria B2B",
    servico: "Automação de Vendas",
    servicoSlug: "automacao-vendas",
    resumo:
      "SDR com IA qualificando 100% dos leads via WhatsApp com SPIN Selling adaptado — tempo de resposta de 8 segundos e +42% em leads qualificados.",
    metricaDestaque: { valor: "+42%", label: "Leads qualificados" },
    desafio:
      "Indústria de plásticos B2B com equipe comercial enxuta. Os vendedores gastavam metade do dia respondendo mensagens no WhatsApp de leads frios — perguntas genéricas sobre preço e prazo que não avançavam. Não existia processo de qualificação, os follow-ups dependiam da memória de cada vendedor, e leads quentes esfriavam esperando retorno.",
    solucao:
      "Implementamos um agente SDR que atende 100% dos primeiros contatos via WhatsApp, usando metodologia SPIN Selling adaptada para o segmento industrial. O agente identifica situação, problema, implicação e necessidade do lead antes de pontuar e encaminhar para o vendedor certo. Dados de qualificação são gravados automaticamente no CRM com campos personalizados (score SPIN, canal de entrada, próxima ação). Follow-ups automáticos e personalizados garantem que nenhum lead é perdido.",
    resultados: [
      { metric: "+42%", description: "Aumento em leads qualificados (meta: 30%)" },
      { metric: "~8s", description: "Tempo de resposta (meta: <15s)" },
      { metric: "99.7%", description: "Disponibilidade do sistema" },
      { metric: "7%", description: "Taxa de handoff incorreto (meta: <10%)" },
    ],
    depoimento: {
      texto:
        "Os vendedores agora só falam com quem realmente tem perfil de compra. A IA faz as perguntas certas, no tom certo, e quando o lead chega pro vendedor já vem com toda a qualificação pronta. Superou todas as metas que tínhamos definido.",
      nome: "Gerente Comercial",
      cargo: "Gerente Comercial",
      empresa: "Indústria de Plásticos",
    },
    timeline: "4 semanas",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return casesData.find((c) => c.slug === slug);
}
