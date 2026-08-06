# Deploy do site VogaIA na Hostinger

## Processo recomendado (automatizado)

```bash
cd ~/projetos/vogaia-site
./deploy.sh
```

O script faz build + rsync com `--exclude=posts/` + ajuste de permissoes em um passo.

## ATENCAO — pasta `/posts/` nao pode ser apagada

A pasta `~/domains/vogaia.com.br/public_html/posts/` **NAO** faz parte do build do site. Ela e alimentada pelo pipeline de postagem automatizado (orchestrator.py rodando na VM GCP) que renderiza imagens dos posts de IG/FB/LinkedIn e faz rsync para la.

O deploy do site usa `rsync -avz --delete`. **Sem o `--exclude=posts/`**, o rsync apaga essa pasta toda e:

- Os proximos carousels falham com HTTP 404 no publish
- Imagens ja publicadas no IG/FB quebram (Meta cachea mas nao infinitamente)
- O orchestrator detecta 404 e tenta reupload, mas se a pasta nem existir, falha com `rsync: change_dir failed: No such file or directory`

**Sempre que editar o comando de deploy manualmente, mantenha o `--exclude=posts/`.**

## Processo manual (se precisar rodar sem o script)

```bash
cd ~/projetos/vogaia-site
npm run build

SSHPASS='Ca221074@' sshpass -e rsync -avz --delete \
  --exclude=posts/ \
  -e 'ssh -p 65002 -o StrictHostKeyChecking=no' \
  out/ u564158865@185.245.180.175:~/domains/vogaia.com.br/public_html/

SSHPASS='Ca221074@' sshpass -e ssh -p 65002 -o StrictHostKeyChecking=no \
  u564158865@185.245.180.175 \
  'find ~/domains/vogaia.com.br/public_html -type d -exec chmod 755 {} \; \
   && find ~/domains/vogaia.com.br/public_html -type f -exec chmod 644 {} \;'
```

## Credenciais Hostinger

- **Host:** 185.245.180.175 (porta SSH 65002)
- **User:** u564158865
- **Diretorio:** ~/domains/vogaia.com.br/public_html/
- **Senha:** em `~/.claude/projects/-Users-caiofaco/memory/hostinger-vogaia.md`

## Verificacao pos-deploy

- [ ] https://vogaia.com.br — Home carrega
- [ ] https://vogaia.com.br/contato/ — formulario aparece
- [ ] https://vogaia.com.br/posts/ — **NAO** retorna 404 (precisa existir)
- [ ] Validar alguma imagem recente: https://vogaia.com.br/posts/post_YYYYMMDD_HHMMSS.png
- [ ] https://vogaia.com.br/sitemap.xml
- [ ] Navegacao entre paginas
- [ ] Cookie consent aparece (LGPD)

## Se a pasta `/posts/` sumir

Se por acidente o deploy rodar sem `--exclude=posts/` e apagar a pasta:

```bash
# 1. Recriar a pasta no Hostinger
SSHPASS='Ca221074@' sshpass -e ssh -p 65002 -o StrictHostKeyChecking=no \
  u564158865@185.245.180.175 \
  'mkdir -p ~/domains/vogaia.com.br/public_html/posts && \
   chmod 755 ~/domains/vogaia.com.br/public_html/posts'

# 2. Forcar re-upload da proxima publicacao (cron reupload automatico)
gcloud compute ssh vogaia-vm --zone=southamerica-east1-b --project=vogaia-prod \
  --command='/opt/vogaia/growth/run-orchestrator.sh publish --platforms instagram,facebook'
```

O orchestrator detecta 404 nas imagens aprovadas e faz reupload automatico slide a slide antes de publicar no Make.

## Stack

- Next.js 16 (App Router) + Static Export
- Tailwind CSS 4 / Framer Motion / TypeScript
- Hostinger Premium Web Hosting
- Build gera `out/` (19 paginas estaticas)
