-- Usuários e Créditos
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(64) UNIQUE NOT NULL,
    credits DECIMAL(18, 8) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Histórico de Execuções (Audit Log)
CREATE TABLE IF NOT EXISTS execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id),
    input_payload JSONB,
    output_payload JSONB,
    cost_credits DECIMAL(10, 4),
    execution_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Produtos (Agentes à venda)
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id SERIAL PRIMARY KEY,
    agent_name VARCHAR(100),
    description TEXT,
    price_per_call DECIMAL(10, 4),
    active BOOLEAN DEFAULT TRUE
);
