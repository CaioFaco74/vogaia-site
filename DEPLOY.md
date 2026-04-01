# Deploy na Hostinger — VogaIA

## Pré-requisitos
- Conta Hostinger Premium Web Hosting
- Domínio vogaia.com.br apontado para a conta
- Acesso ao File Manager ou FTP

## Processo de Deploy

### 1. Build do site
```bash
cd /Users/caiofaco/Documents/VogaIA/renovacao-site/vogaia-site
npm run build
```
Isso gera a pasta `out/` com todos os arquivos estáticos.

### 2. Upload para Hostinger

**Opção A — File Manager (mais simples):**
1. Acesse hPanel → Files → File Manager
2. Navegue até `public_html/`
3. Delete o conteúdo antigo (ou mova para backup)
4. Faça upload de TODO o conteúdo da pasta `out/` para `public_html/`
5. Certifique-se de que `index.html` está na raiz de `public_html/`

**Opção B — FTP:**
1. Use FileZilla ou similar
2. Host: seu-dominio ou IP da Hostinger
3. User/Pass: credenciais FTP do hPanel
4. Upload o conteúdo de `out/` para `public_html/`

**Opção C — Git (recomendado para atualizações frequentes):**
1. No hPanel → Advanced → Git
2. Conecte o repositório CaioFaco74/vogaia-site
3. Configure para fazer build e copiar `out/` para `public_html/`

### 3. Verificação pós-deploy
- [ ] https://vogaia.com.br carrega a Home
- [ ] Navegação entre páginas funciona
- [ ] https://vogaia.com.br/contato/ — formulário aparece
- [ ] https://vogaia.com.br/sitemap.xml — sitemap carrega
- [ ] https://vogaia.com.br/robots.txt — robots carrega
- [ ] Botão WhatsApp funciona
- [ ] 404: https://vogaia.com.br/pagina-inexistente mostra 404 customizado
- [ ] SSL/HTTPS funciona (sem mixed content)

### 4. Pós-deploy
1. Google Search Console: adicionar propriedade vogaia.com.br
2. Submeter sitemap: https://vogaia.com.br/sitemap.xml
3. Google Analytics: verificar se GA4 está recebendo dados
4. Google Business Profile: atualizar URL se necessário

## Estrutura do deploy
```
public_html/
├── index.html          ← Home
├── 404.html            ← Página de erro
├── robots.txt          ← SEO
├── sitemap.xml         ← SEO
├── .htaccess           ← Cache, GZIP, segurança
├── logo.png            ← Logo
├── favicon.ico         ← Favicon
├── _next/              ← Assets (CSS, JS, fonts)
├── sobre/index.html
├── servicos/index.html
├── servicos/atendimento-ia/index.html
├── servicos/automacao-vendas/index.html
├── servicos/agentes-ia/index.html
├── servicos/projetos-customizados/index.html
├── cases/index.html
├── cases/*/index.html
├── blog/index.html
├── blog/*/index.html
├── contato/index.html
├── privacidade/index.html
└── termos/index.html
```
