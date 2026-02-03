# XPEX SYSTEMS AI — MVP Monorepo

Breve: monorepo contendo o stack mínimo para rodar o MVP do XPEX (Kernel Rust, Orchestrator Node.js, Dashboard Next.js, infra de dados).

Quick start

1. Copie variáveis de ambiente padrão:

```bash
cp .env.example .env
```

2. Suba todo o stack com Docker Compose:

```bash
docker compose up --build
```

3. Páginas/serviços:
- Dashboard: http://localhost:3000
- Orchestrator API: http://localhost:8081
- Kernel: http://localhost:8080

Build do Agente (WASM)

Para compilar o `hunter-v1` (WASI):

```bash
rustup target add wasm32-wasi
cargo build --release --target wasm32-wasi -p hunter-v1
# artefato: agents/hunter-v1/target/wasm32-wasi/release/hunter-v1.wasm
```

Troubleshooting rápido

- Erro: container Node falha com `dist/index.js` não encontrado
  - Solução: o Orchestrator é TypeScript; rode `npm run build` em `apps/orchestrator` localmente ou ajuste o Dockerfile para compilar antes de startar.

- Erro: build do kernel falha por falta de toolchain
  - Solução: o Dockerfile do kernel já usa imagem Rust oficial; para build local instale Rustup.

- Banco não inicializa / scripts SQL não aplicados
  - Cheque permissões e `docker compose logs postgres`.

CI

Um workflow básico de CI está em `.github/workflows/ci.yml` que compila o `kernel`, constrói o `hunter-v1` para `wasm32-wasi` e instala dependências JS.

Próximo passo recomendado

- Implementar validação on-chain (Solana) no Orchestrator e controlar `budget_caps` antes de chamar o Kernel.
- Adicionar testes unitários e E2E para o fluxo `Dashboard -> Orchestrator -> Kernel -> Agent WASM`.

Deploy na Vercel

O `apps/dashboard` está pronto para deploy na Vercel. Use uma das opções abaixo:

- Conectar o repositório diretamente no Vercel (recomendado) — o `vercel.json` já está presente.
- Usar o GitHub Action (`.github/workflows/vercel-deploy.yml`) — crie os segredos `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` no repositório.

Ajustes comuns

- Se o `Dashboard` usar providers (wallet), configure `NEXT_PUBLIC_API_URL` nas Environment Variables do projeto Vercel.
- Se o Orchestrator/Kernal ficar em outro host, configure `NEXT_PUBLIC_API_URL` para o domínio público do Orchestrator.

---
Feito por equipe XPEX — use com responsabilidade; revise políticas de privacidade e compliance antes de executar em produção.
