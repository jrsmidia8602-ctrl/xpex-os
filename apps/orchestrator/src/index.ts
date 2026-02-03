import express from 'express';
import cors from 'cors';
import { Connection, PublicKey } from '@solana/web3.js';
import { StateGraph, END } from "@langchain/langgraph";
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;
const KERNEL_URL = process.env.KERNEL_URL || 'http://localhost:8080';
const SOLANA_CONNECTION = new Connection('https://api.devnet.solana.com');

// --- LANGGRAPH: DEFINIÇÃO DO FLUXO DO AGENTE ---
// Estado do Agente
interface AgentState {
    mission: string;
    paymentVerified: boolean;
    data?: any;
}

// Nó 1: Verificador Financeiro
const financialNode = async (state: AgentState) => {
    console.log("💰 Verificando fundos...");
    // Lógica real: Checar saldo ou transação on-chain
    // Mock: Sucesso
    return { paymentVerified: true };
};

// Nó 2: Executor (Chama o Kernel Rust)
const executionNode = async (state: AgentState) => {
    if (!state.paymentVerified) return { data: "Pagamento pendente" };
    
    console.log("⚙️ Enviando para Kernel Rust...");
    try {
        const response = await axios.post(`${KERNEL_URL}/api/v1/execute`, {
            agent_id: "hunter-v1",
            payload: { context: state.mission },
            auth_token: "valid-token-123"
        });
        return { data: response.data };
    } catch (e) {
        return { data: "Erro no Kernel" };
    }
};

// Construção do Grafo
const graph = new StateGraph<AgentState>({
    channels: {
        mission: { reducer: (x: any) => x },
        paymentVerified: { reducer: (x: any) => x },
        data: { reducer: (x: any) => x }
    }
})
.addNode("finance", financialNode)
.addNode("kernel_exec", executionNode)
.addEdge("finance", "kernel_exec")
.addEdge("kernel_exec", END)
.setEntryPoint("finance");

const runner = graph.compile();

// --- API ENDPOINTS ---

// 1. Rota principal chamada pelo Dashboard
app.post('/api/mission', async (req, res) => {
    const { mission } = req.body;
    console.log(`🤖 Nova missão recebida: ${mission}`);
    
    const result = await runner.invoke({ 
        mission, 
        paymentVerified: false 
    });
    
    res.json(result);
});

// 2. Webhook para Solana Pay (Confirmação On-Chain)
app.post('/api/webhook/solana', async (req, res) => {
    const { signature } = req.body;
    // Validar assinatura na blockchain
    try {
        const tx = await SOLANA_CONNECTION.getTransaction(signature);
        if (tx) {
            // Atualizar DB: Créditos liberados
            console.log(`✅ Pagamento confirmado: ${signature}`);
            res.json({ success: true });
        }
    } catch (e) {
        res.status(400).json({ error: "Transação inválida" });
    }
});

app.listen(PORT, () => {
    console.log(`📡 Orchestrator rodando na porta ${PORT}`);
});
