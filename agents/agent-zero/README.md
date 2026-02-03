# Agente Zero — `arb-info-agent` (Especificação mínima)

Resumo rápido:
- Nome: `arb-info-agent` (Agente de Arbitragem de Informação)
- Objetivo: Encontrar e transformar oportunidades de informação em ações monetizáveis (ex.: alertas de edital, arbitragem de preço, leads qualificados).
- Modelo de monetização inicial: Pay-per-Call ($0.05 por execução) + consumo de `XPEX Fuel`.

Responsabilidades:
- Escutar triggers do browser (metadados apenas) ou do Orchestrator.
- Validar oportunidade via fontes oficiais / APIs.
- Gerar um relatório conciso (JSON + artefato opcional PDF/CSV).
- Emitir custo estimado e pedir autorização do usuário (quando aplicável).

Inputs / Triggers:
- `trigger`: {source, type, metadata}
- `wallet_id` (opcional, para cobrança)
- `budget_caps` (limites por usuário/agent)

Outputs:
- `report`: {id, summary, score, actions:[...], usd_cost}
- `events`: logs + métricas (latência, tokens, success_rate)

Memória / Estado:
- Curto prazo: contexto da sessão em Redis (TTL curto, p.ex. 30m)
- Longo prazo: transações e histórico em Postgres
- Memória semântica: Vector DB com embeddings para similaridade de casos

Interface mínima (HTTP/JSON):
- POST `/run` -> body: `{trigger, user_id, budget_caps}`
  - Retorna: `{run_id, estimated_cost, status}`
- GET `/status/:run_id` -> progresso
- GET `/report/:run_id` -> relatório final

Roteiro de execução (happy path):
1. Recebe `trigger` do Orchestrator.
2. Consulta memória curta para contexto.
3. Busca dados relevantes (APIs públicas, Webhooks autorizados).
4. Roda pipeline de decisão (model routing: local small LLM -> se necessário cloud LLM).
5. Gera `report` e calcula `usd_cost`.
6. Se custo > 0: notifica usuário via extensão/dashboard para autorização (on-demand) ou consome `Fuel` se pré-autorizado.
7. Persistência em Postgres + indexação em Vector DB.

Métricas de sucesso (fase 0):
- Time-to-first-report < 10s (target)
- Precision (relevância do report) > 80% nas validações manuais iniciais
- Custo médio por run < $0.12

Notas de segurança/controle:
- `budget_caps` sempre validados on-chain / no DB antes de gastar.
- Operações com custo exigem assinatura (wallet) ou pré-autorização.
- Limitar acessos a fontes e sanitizar todas as respostas (checagem de fact-check).

Implementação mínima para MVP:
- Runner em Rust (kernel) que executa o fluxo core.
- Thin HTTP shim em Node.js (orchestrator) para roteamento e fila via BullMQ.
- SDK JS para `POST /run` e `GET /report`.
