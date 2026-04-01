import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site e serviços da VogaIA.",
};

export default function TermosPage() {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Termos de Uso</h1>
        <p className="text-text-muted text-sm mb-12">
          Última atualização: Abril de 2026
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
            <p className="text-text-muted leading-relaxed">
              Ao acessar e utilizar o site vogaia.com.br (&ldquo;Site&rdquo;), você concorda
              com estes Termos de Uso. Se não concordar com algum dos termos,
              recomendamos que não utilize o Site. A VogaIA reserva-se o direito
              de atualizar estes termos a qualquer momento.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Descrição dos Serviços</h2>
            <p className="text-text-muted leading-relaxed">
              A VogaIA oferece serviços de consultoria e desenvolvimento em
              inteligência artificial, incluindo: atendimento automatizado com
              IA, automação de vendas, criação de agentes e clones de IA, e
              projetos customizados. Os detalhes de cada serviço estão
              disponíveis nas respectivas páginas do Site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              3. Uso do Site
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              Ao utilizar o Site, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Fornecer informações verdadeiras e atualizadas nos formulários</li>
              <li>Não utilizar o Site para fins ilegais ou não autorizados</li>
              <li>Não tentar acessar áreas restritas ou comprometer a segurança do Site</li>
              <li>Não reproduzir, distribuir ou modificar o conteúdo sem autorização</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              4. Propriedade Intelectual
            </h2>
            <p className="text-text-muted leading-relaxed">
              Todo o conteúdo do Site — incluindo textos, imagens, logotipos,
              design, código-fonte e marca VogaIA — é de propriedade da VogaIA
              ou de seus licenciadores, protegido por leis de direitos autorais e
              propriedade intelectual. O uso não autorizado constitui violação
              destes direitos.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              5. Contratação de Serviços
            </h2>
            <p className="text-text-muted leading-relaxed">
              A contratação de serviços da VogaIA é formalizada por meio de
              contratos específicos, com escopo, prazos e valores acordados entre
              as partes. O preenchimento de formulários no Site não constitui
              vínculo contratual, sendo apenas uma solicitação de contato.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-text-muted leading-relaxed">
              A VogaIA não se responsabiliza por: (a) indisponibilidade temporária
              do Site; (b) decisões tomadas com base em informações do Site; (c)
              danos indiretos resultantes do uso do Site; (d) conteúdo de sites
              de terceiros linkados no Site. O Site é fornecido &ldquo;como está&rdquo;, sem
              garantias de qualquer tipo.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              7. Privacidade
            </h2>
            <p className="text-text-muted leading-relaxed">
              O tratamento de dados pessoais é regido pela nossa{" "}
              <a
                href="/privacidade/"
                className="text-orange-primary hover:text-orange-hover"
              >
                Política de Privacidade
              </a>
              , que integra estes Termos de Uso.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              8. Foro
            </h2>
            <p className="text-text-muted leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa
              do Brasil. Fica eleito o foro da Comarca de Fortaleza, Estado do
              Ceará, para dirimir quaisquer controvérsias decorrentes destes
              termos, com renúncia a qualquer outro, por mais privilegiado que
              seja.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Contato</h2>
            <p className="text-text-muted leading-relaxed">
              Para dúvidas sobre estes Termos de Uso:
            </p>
            <div className="mt-3 p-4 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-muted">
              <p><strong>VogaIA</strong></p>
              <p>Email: atendimento@vogaia.com.br</p>
              <p>Telefone: +55 (85) 98204-2293</p>
              <p>Endereço: Rua Vicente Leite, 1820 — Fortaleza, CE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
