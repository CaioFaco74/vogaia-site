export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
}

export const blogCategories = [
  "Todos",
  "IA para Negócios",
  "Automação",
  "Tendências",
  "Casos de Uso",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "como-ia-reduz-tempo-atendimento",
    title: "Como IA pode reduzir em 70% o tempo de atendimento ao cliente",
    description:
      "Descubra como empresas estão usando inteligência artificial para transformar o atendimento ao cliente, reduzir custos e aumentar a satisfação.",
    category: "IA para Negócios",
    date: "2026-04-01",
    readTime: "5 min",
    author: { name: "VogaIA", role: "Equipe de Conteúdo" },
    content: `
## O desafio do atendimento moderno

O atendimento ao cliente é um dos maiores custos operacionais de qualquer empresa. Equipes sobrecarregadas, tempo de resposta alto e disponibilidade limitada ao horário comercial são problemas que afetam diretamente a satisfação e a retenção de clientes.

Segundo pesquisas recentes, **72% dos consumidores esperam ser atendidos em menos de 5 minutos** — uma expectativa que a maioria das empresas não consegue atender com equipes humanas.

## Como a IA transforma o atendimento

A inteligência artificial aplicada ao atendimento não substitui humanos — ela **potencializa** a capacidade do time. Aqui estão as principais formas:

### 1. Respostas instantâneas para perguntas frequentes

Chatbots inteligentes treinados com o conhecimento do seu negócio respondem instantaneamente às dúvidas mais comuns: status de pedidos, políticas de troca, informações sobre produtos e preços.

### 2. Disponibilidade 24/7

Enquanto sua equipe descansa, a IA continua atendendo. Clientes que entram em contato às 23h recebem a mesma qualidade de atendimento que às 10h.

### 3. Escalação inteligente

Quando o assunto é complexo — uma reclamação delicada ou uma negociação — a IA identifica e transfere para um humano, passando todo o contexto da conversa.

### 4. Análise de sentimento em tempo real

A IA detecta quando um cliente está frustrado e prioriza o atendimento, evitando que pequenos problemas virem crises.

## Resultados reais

Empresas que implementaram IA no atendimento reportam:

- **70% de redução** no tempo médio de resposta
- **60% dos atendimentos** resolvidos sem intervenção humana
- **40% de aumento** na satisfação do cliente (NPS)
- **30% de redução** nos custos de operação

## Por onde começar

O primeiro passo é mapear as perguntas mais frequentes dos seus clientes. Em geral, **80% das interações** se concentram em 20% dos temas. É exatamente aí que a IA gera mais impacto com menos esforço.

Na VogaIA, começamos com um diagnóstico gratuito da sua operação de atendimento. Em 30 minutos, identificamos as maiores oportunidades de automação e estimamos o impacto potencial.

---

*Quer saber como a IA pode transformar o atendimento da sua empresa? [Fale com um especialista](/contato).*
    `,
  },
  {
    slug: "automacao-vendas-guia-pme",
    title: "Automação de vendas com IA: guia prático para PMEs",
    description:
      "Um guia completo sobre como pequenas e médias empresas podem usar IA para qualificar leads, automatizar follow-ups e vender mais.",
    category: "Automação",
    date: "2026-03-25",
    readTime: "7 min",
    author: { name: "VogaIA", role: "Equipe de Conteúdo" },
    content: `
## Por que PMEs precisam de automação de vendas

Se você tem uma equipe de vendas pequena (1 a 10 vendedores), cada minuto conta. O problema é que a maior parte do tempo é gasta em atividades que **não são vender**: qualificar leads, fazer follow-ups, atualizar CRM, enviar propostas.

A automação de vendas com IA muda esse cenário radicalmente.

## O que pode ser automatizado

### Qualificação de leads

Em vez de seu vendedor gastar 30 minutos em uma ligação para descobrir que o lead não tem orçamento, a IA faz essa triagem automaticamente. Via WhatsApp ou email, o agente de IA faz perguntas estratégicas (BANT, SPIN Selling) e classifica o lead por temperatura.

### Follow-up automático

Quantas vendas você perde porque o follow-up atrasou? A IA nunca esquece. Ela envia mensagens personalizadas no momento certo, pelo canal certo, com o conteúdo certo.

### Agendamento de reuniões

O lead está quente? A IA agenda automaticamente uma reunião com o vendedor, verificando disponibilidade na agenda e enviando confirmações.

### Nutrição de leads frios

Leads que não estão prontos para comprar hoje recebem conteúdo relevante automaticamente, mantendo sua empresa no radar até o momento da decisão.

## Resultados típicos para PMEs

| Métrica | Antes | Com IA |
|---------|-------|--------|
| Leads qualificados/mês | 20 | 60+ |
| Taxa de conversão | 5% | 15-20% |
| Tempo de follow-up | 24-48h | Instantâneo |
| Leads perdidos | 40%+ | ~0% |

## Como implementar

### Passo 1: Defina seu perfil de cliente ideal (ICP)

Quais características definem um bom lead para você? Tamanho da empresa, segmento, cargo do decisor, orçamento mínimo.

### Passo 2: Mapeie sua jornada de vendas

Do primeiro contato ao fechamento, quais são as etapas? Onde estão os gargalos?

### Passo 3: Escolha os canais

WhatsApp é o canal mais efetivo para PMEs no Brasil. Email funciona bem para nutrição. LinkedIn para prospecção B2B.

### Passo 4: Comece pequeno

Não tente automatizar tudo de uma vez. Comece pela qualificação de leads — é onde o ROI é mais rápido e visível.

## Quanto custa

Para PMEs, soluções de automação de vendas com IA custam a partir de R$ 2.000/mês — menos que um SDR junior. E trabalham 24/7, sem férias, sem turnover.

---

*Quer um diagnóstico gratuito da sua operação de vendas? [Agende uma conversa](/contato) com nosso time.*
    `,
  },
  {
    slug: "o-que-sao-agentes-ia",
    title: "O que são agentes de IA e como podem ajudar sua empresa",
    description:
      "Entenda o que são agentes de IA, como funcionam e por que empresas estão adotando essa tecnologia para escalar operações.",
    category: "Tendências",
    date: "2026-03-18",
    readTime: "6 min",
    author: { name: "VogaIA", role: "Equipe de Conteúdo" },
    content: `
## O que é um agente de IA?

Um agente de IA é um software inteligente capaz de **executar tarefas de forma autônoma**, tomando decisões com base em objetivos definidos. Diferente de um chatbot simples que apenas responde perguntas, um agente pode:

- Acessar sistemas e bancos de dados
- Executar ações (enviar emails, atualizar registros, agendar reuniões)
- Tomar decisões com base em regras e contexto
- Aprender e melhorar com o tempo

## Agentes vs Chatbots: qual a diferença?

| Aspecto | Chatbot | Agente de IA |
|---------|---------|-------------|
| Capacidade | Responde perguntas | Executa tarefas completas |
| Autonomia | Baixa (segue scripts) | Alta (toma decisões) |
| Integração | Limitada | Conecta com múltiplos sistemas |
| Complexidade | Conversas simples | Workflows multi-etapa |

## Casos de uso para empresas

### SDR (Sales Development Representative) com IA

Um agente que qualifica leads automaticamente, faz perguntas estratégicas e agenda reuniões com vendedores. Funciona 24/7 via WhatsApp.

### Assistente de atendimento

Vai além do FAQ: acessa o sistema para verificar status de pedidos, processar trocas e resolver problemas sem intervenção humana.

### Clone de especialista

Replica o conhecimento de um profissional-chave da empresa. Ideal para consultorias, suporte técnico e treinamento.

### Automação de processos

Agentes que monitoram eventos, processam dados e disparam ações automaticamente. Ex: quando um contrato é assinado, o agente cria o projeto no sistema, notifica a equipe e agenda o kickoff.

## É seguro?

Sim, desde que implementado com as devidas precauções:

- **Guardrails**: limites claros do que o agente pode e não pode fazer
- **Logs de auditoria**: todas as ações são registradas
- **Escalação humana**: o agente sabe quando pedir ajuda
- **Aprovação para ações críticas**: decisões de alto impacto requerem confirmação

## Como começar

O melhor caminho é identificar **um processo repetitivo** que consome tempo da sua equipe e tem regras claras. Esse é o candidato ideal para o primeiro agente.

Na VogaIA, fazemos um diagnóstico gratuito para identificar as maiores oportunidades de automação com agentes no seu negócio.

---

*Quer entender como agentes de IA podem escalar sua operação? [Fale com nosso time](/contato).*
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
