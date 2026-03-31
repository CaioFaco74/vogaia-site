export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  benefits: {
    metric: string;
    description: string;
  }[];
  integrations: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "atendimento-ia",
    title: "Atendimento com IA",
    subtitle: "Chatbots inteligentes que atendem 24/7 com qualidade humana",
    description:
      "Automatize seu atendimento ao cliente com agentes de IA que entendem contexto, resolvem problemas e escalam quando necessário. Reduza tempo de espera e custos operacionais sem perder a qualidade.",
    icon: "headset",
    problem: {
      title: "Seu atendimento não escala",
      description:
        "Clientes esperando, equipe sobrecarregada e custos crescendo. Atendimento manual tem limites que a IA resolve.",
      painPoints: [
        "Tempo de resposta alto frustra clientes",
        "Equipe não consegue atender fora do horário comercial",
        "Perguntas repetitivas consomem tempo da equipe qualificada",
        "Dificuldade em manter qualidade com volume crescente",
      ],
    },
    solution: {
      title: "IA que atende como seu melhor funcionário",
      description:
        "Nossos chatbots inteligentes são treinados com o conhecimento do seu negócio. Eles entendem perguntas complexas, fornecem respostas precisas e sabem quando escalar para um humano.",
    },
    features: [
      { icon: "message-square", title: "Chat inteligente", description: "Respostas contextuais baseadas no conhecimento do seu negócio." },
      { icon: "clock", title: "Disponível 24/7", description: "Atendimento ininterrupto, inclusive feriados e madrugadas." },
      { icon: "users", title: "Escalação inteligente", description: "Transfere para humano quando necessário, com todo o contexto." },
      { icon: "bar-chart-3", title: "Analytics completo", description: "Dashboard com métricas de satisfação, volume e resolução." },
    ],
    benefits: [
      { metric: "70%", description: "Redução no tempo de resposta" },
      { metric: "24/7", description: "Disponibilidade total" },
      { metric: "60%", description: "Menos tickets para equipe humana" },
      { metric: "90%+", description: "Taxa de resolução automatizada" },
    ],
    integrations: ["WhatsApp", "Instagram", "Messenger", "Site", "Email"],
    faqs: [
      { question: "O chatbot consegue entender perguntas complexas?", answer: "Sim. Utilizamos modelos de linguagem avançados treinados especificamente com o conhecimento do seu negócio, permitindo respostas contextuais e precisas." },
      { question: "E quando o chatbot não sabe responder?", answer: "O sistema identifica automaticamente quando precisa de intervenção humana e transfere a conversa com todo o histórico e contexto." },
      { question: "Quanto tempo leva para implementar?", answer: "Em média, 2-4 semanas dependendo da complexidade. Começamos com um MVP funcional e iteramos com base em dados reais." },
    ],
  },
  {
    slug: "automacao-vendas",
    title: "Automação de Vendas",
    subtitle: "VendaInteligente AI — mais leads qualificados, mais conversão",
    description:
      "Automatize a qualificação de leads, follow-ups e nurturing com IA. Sua equipe de vendas foca nos leads mais quentes enquanto a IA trabalha o funil completo.",
    icon: "trending-up",
    problem: {
      title: "Leads escapando pelo funil",
      description:
        "Leads entram mas não convertem. Follow-ups atrasam, qualificação é manual e oportunidades são perdidas.",
      painPoints: [
        "Follow-up manual é lento e inconsistente",
        "Leads frios misturam com leads quentes",
        "Equipe de vendas perde tempo com leads não qualificados",
        "Falta de dados para priorizar oportunidades",
      ],
    },
    solution: {
      title: "IA que vende enquanto você dorme",
      description:
        "O VendaInteligente AI qualifica leads automaticamente usando SPIN Selling, faz follow-ups personalizados e entrega para seu time apenas os leads prontos para comprar.",
    },
    features: [
      { icon: "target", title: "Qualificação automática", description: "IA classifica leads por temperatura usando critérios BANT/SPIN." },
      { icon: "zap", title: "Follow-up inteligente", description: "Sequências personalizadas por canal, hora e comportamento." },
      { icon: "bar-chart-3", title: "Pipeline visual", description: "Visão completa do funil com previsão de conversão." },
      { icon: "brain", title: "Insights de vendas", description: "IA identifica padrões e sugere melhores abordagens." },
    ],
    benefits: [
      { metric: "40%", description: "Aumento em taxa de conversão" },
      { metric: "3x", description: "Mais leads qualificados/mês" },
      { metric: "50%", description: "Redução no ciclo de vendas" },
      { metric: "0", description: "Leads perdidos por falta de follow-up" },
    ],
    integrations: ["WhatsApp", "CRM", "Email", "LinkedIn", "Instagram"],
    faqs: [
      { question: "Funciona com meu CRM atual?", answer: "Sim, integramos com os principais CRMs do mercado (NectarCRM, Pipedrive, HubSpot, RD Station, entre outros)." },
      { question: "A IA substitui minha equipe de vendas?", answer: "Não. A IA cuida da qualificação e nurturing, liberando sua equipe para focar nos leads mais quentes e fechar negócios." },
      { question: "Quais canais são suportados?", answer: "WhatsApp (principal), email, Instagram Direct e LinkedIn. Novos canais podem ser adicionados conforme necessidade." },
    ],
  },
  {
    slug: "agentes-ia",
    title: "Agentes e Clones de IA",
    subtitle: "Agentes autônomos que trabalham por você, 24 horas por dia",
    description:
      "Crie agentes de IA que executam tarefas complexas de forma autônoma e clones digitais de especialistas que multiplicam a capacidade do seu time.",
    icon: "bot",
    problem: {
      title: "Sua equipe é o gargalo",
      description:
        "Especialistas sobrecarregados, processos dependem de pessoas específicas e escalar significa contratar mais gente.",
      painPoints: [
        "Conhecimento concentrado em poucas pessoas",
        "Processos manuais que consomem horas diárias",
        "Dificuldade em escalar sem aumentar headcount",
        "Especialistas gastam tempo em tarefas operacionais",
      ],
    },
    solution: {
      title: "Clone seus melhores profissionais",
      description:
        "Criamos agentes de IA treinados com o conhecimento e estilo dos seus melhores profissionais. Eles executam tarefas, respondem perguntas e tomam decisões seguindo a lógica dos seus especialistas.",
    },
    features: [
      { icon: "bot", title: "Agentes autônomos", description: "Executam tarefas complexas sem supervisão constante." },
      { icon: "brain", title: "Clones de especialistas", description: "Replicam conhecimento e estilo de decisão do seu time." },
      { icon: "workflow", title: "Automação de workflows", description: "Orquestram processos multi-etapa de ponta a ponta." },
      { icon: "shield", title: "Guardrails de segurança", description: "Limites claros de atuação e escalação quando necessário." },
    ],
    benefits: [
      { metric: "10x", description: "Mais capacidade sem contratar" },
      { metric: "80%", description: "Redução em tarefas operacionais" },
      { metric: "24/7", description: "Agentes trabalhando continuamente" },
      { metric: "0", description: "Conhecimento perdido com turnover" },
    ],
    integrations: ["WhatsApp", "Slack", "Email", "APIs", "ERPs"],
    faqs: [
      { question: "O que é um 'clone de IA'?", answer: "É um agente de IA treinado para replicar o conhecimento, estilo de comunicação e lógica de decisão de um profissional específico. Ele pode responder perguntas e executar tarefas como aquele profissional faria." },
      { question: "Os agentes podem acessar meus sistemas?", answer: "Sim, através de integrações seguras via API. Os agentes podem consultar dados, atualizar registros e executar ações nos seus sistemas." },
      { question: "É seguro?", answer: "Todos os agentes operam com guardrails de segurança: limites de atuação, logs de auditoria e escalação automática para humanos em cenários definidos." },
    ],
  },
  {
    slug: "projetos-customizados",
    title: "Projetos de IA Customizados",
    subtitle: "Soluções sob medida para desafios únicos do seu negócio",
    description:
      "Quando seu desafio é único, a solução precisa ser também. Desenvolvemos projetos de IA customizados do zero, integrando com seus sistemas e processos existentes.",
    icon: "settings",
    problem: {
      title: "Soluções genéricas não resolvem",
      description:
        "Cada negócio é diferente. Ferramentas prontas não cobrem suas necessidades específicas e integrações complexas exigem desenvolvimento sob medida.",
      painPoints: [
        "Ferramentas de mercado não se encaixam no seu processo",
        "Integrações complexas entre sistemas legados",
        "Necessidade de IA treinada com dados proprietários",
        "Requisitos de compliance e segurança específicos",
      ],
    },
    solution: {
      title: "Tecnologia sob medida para seu negócio",
      description:
        "Do diagnóstico à implementação, desenvolvemos soluções de IA completamente customizadas. Trabalhamos dentro dos seus requisitos técnicos, de segurança e de negócio.",
    },
    features: [
      { icon: "code", title: "Desenvolvimento sob medida", description: "Arquitetura e código desenvolvidos para seu caso específico." },
      { icon: "database", title: "Integração com sistemas", description: "Conectamos com ERPs, CRMs, bancos de dados e APIs existentes." },
      { icon: "layers", title: "Modelos customizados", description: "IA treinada com seus dados para máxima precisão no seu domínio." },
      { icon: "shield", title: "Compliance e segurança", description: "Desenvolvimento seguindo LGPD e requisitos de segurança da informação." },
    ],
    benefits: [
      { metric: "100%", description: "Aderência ao seu processo" },
      { metric: "ROI", description: "Positivo em 3-6 meses" },
      { metric: "Full", description: "Propriedade intelectual sua" },
      { metric: "∞", description: "Escalabilidade sem limites" },
    ],
    integrations: ["ERPs", "CRMs", "APIs REST", "Bancos de dados", "Cloud"],
    faqs: [
      { question: "Quanto custa um projeto customizado?", answer: "Cada projeto é orçado individualmente após o diagnóstico inicial (gratuito). O investimento varia conforme complexidade, integrações e escopo." },
      { question: "Quanto tempo leva?", answer: "Projetos simples: 4-8 semanas. Projetos complexos: 3-6 meses. Sempre entregamos em fases incrementais para gerar valor rapidamente." },
      { question: "Vocês dão suporte após a entrega?", answer: "Sim. Oferecemos pacotes de suporte e manutenção contínua, incluindo monitoramento, ajustes e evolução da solução." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}
