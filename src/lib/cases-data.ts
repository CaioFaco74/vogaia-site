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
  depoimento?: {
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
    industria: "Construção Civil",
    servico: "Projetos de IA Customizados",
    servicoSlug: "projetos-customizados",
    resumo:
      "IA no planejamento de obras sobre mais de 2.000 obras do histórico: mais de 80% de acerto na busca de obras de referência, em 3 etapas validadas pelo engenheiro e sem nenhum número inventado.",
    metricaDestaque: { valor: ">80%", label: "Acerto na busca de obras similares" },
    desafio:
      "Uma empresa de tecnologia para gestão de obras precisava acelerar o planejamento de novas obras. Cada projeto exigia que engenheiros pesquisassem à mão referências históricas, montassem cronogramas do zero e estimassem riscos com base na experiência pessoal. A qualidade dependia do profissional disponível. Com mais de 2.000 obras no histórico, havia uma riqueza de dados que ninguém conseguia aproveitar, e a experiência ficava concentrada em poucos profissionais seniores. Em obra, número errado custa caro: a solução não podia correr o risco de chutar um valor num orçamento ou num cronograma.",
    solucao:
      "Colocamos a IA para trabalhar em 3 etapas, com validação do engenheiro ao fim de cada uma: (1) busca das obras mais parecidas no histórico, para o planejamento partir de uma referência real e não de uma folha em branco; (2) montagem do plano a partir da obra de referência aprovada, com EAP, cronograma e linha de balanço adaptados; (3) leitura dos riscos registrados em obras semelhantes, com alertas e plano de mitigação. A IA propõe, o engenheiro decide. E a regra mais importante do projeto: o sistema nunca inventa número. Todo dado vem da base de obras da empresa.",
    resultados: [
      { metric: ">80%", description: "Acerto na busca de obras similares" },
      { metric: "2.000+", description: "Obras do histórico usadas como referência" },
      { metric: "3", description: "Etapas, todas validadas pelo engenheiro" },
      { metric: "0", description: "Números inventados: todo dado vem da base" },
    ],
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
