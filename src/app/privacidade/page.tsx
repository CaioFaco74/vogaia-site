import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade da VogaIA. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Política de Privacidade
        </h1>
        <p className="text-text-muted text-sm mb-12">
          Última atualização: Abril de 2026
        </p>

        <div className="prose-custom space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
            <p className="text-text-muted leading-relaxed">
              A VogaIA (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;) está comprometida com a proteção
              dos dados pessoais dos visitantes do nosso site (vogaia.com.br) e
              clientes dos nossos serviços. Esta Política de Privacidade
              descreve como coletamos, usamos, armazenamos e protegemos suas
              informações pessoais, em conformidade com a Lei Geral de Proteção
              de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              2. Dados que coletamos
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              Coletamos os seguintes tipos de dados pessoais:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>
                <strong>Dados de identificação:</strong> nome completo, email,
                telefone, empresa e cargo — fornecidos voluntariamente ao
                preencher formulários de contato.
              </li>
              <li>
                <strong>Dados de uso:</strong> páginas visitadas, tempo de
                permanência, cliques e interações — coletados automaticamente via
                Google Analytics.
              </li>
              <li>
                <strong>Dados de comunicação:</strong> mensagens enviadas pelo
                formulário de contato, chatbot ou WhatsApp.
              </li>
              <li>
                <strong>Cookies e tecnologias similares:</strong> utilizamos
                cookies essenciais e de análise para melhorar a experiência do
                site.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              3. Como usamos seus dados
            </h2>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Responder solicitações de contato e orçamento</li>
              <li>Enviar informações sobre nossos serviços (com seu consentimento)</li>
              <li>Melhorar a experiência de navegação no site</li>
              <li>Analisar métricas de uso para aprimorar nossos serviços</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              4. Compartilhamento de dados
            </h2>
            <p className="text-text-muted leading-relaxed">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com
              terceiros para fins de marketing. Podemos compartilhar dados com:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2 mt-3">
              <li>
                <strong>Prestadores de serviço:</strong> ferramentas de analytics
                (Google), email marketing e CRM, sob contratos de proteção de
                dados.
              </li>
              <li>
                <strong>Autoridades competentes:</strong> quando exigido por lei
                ou ordem judicial.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              5. Seus direitos (LGPD)
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              Conforme a LGPD, você tem direito a:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos dados</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-3">
              Para exercer qualquer desses direitos, entre em contato pelo email:{" "}
              <a
                href="mailto:atendimento@vogaia.com.br"
                className="text-orange-primary hover:text-orange-hover"
              >
                atendimento@vogaia.com.br
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              6. Armazenamento e segurança
            </h2>
            <p className="text-text-muted leading-relaxed">
              Seus dados são armazenados em servidores seguros e protegidos por
              medidas técnicas e organizacionais adequadas, incluindo
              criptografia, controle de acesso e monitoramento. Retemos seus
              dados apenas pelo período necessário para cumprir as finalidades
              descritas nesta política.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
            <p className="text-text-muted leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento do site e
              cookies de análise (Google Analytics) para entender como os
              visitantes interagem com o site. Você pode desabilitar cookies nas
              configurações do seu navegador, mas isso pode afetar a
              funcionalidade do site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              8. Alterações nesta política
            </h2>
            <p className="text-text-muted leading-relaxed">
              Esta política pode ser atualizada periodicamente. A data da última
              atualização será sempre indicada no topo do documento. Recomendamos
              que você revise esta página regularmente.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Contato</h2>
            <p className="text-text-muted leading-relaxed">
              Para dúvidas sobre esta Política de Privacidade ou sobre o
              tratamento dos seus dados pessoais, entre em contato:
            </p>
            <div className="mt-3 p-4 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-muted">
              <p>
                <strong>VogaIA</strong>
              </p>
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
