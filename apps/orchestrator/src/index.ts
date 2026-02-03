import express from 'express';
import cors from 'cors';
import { Connection } from '@solana/web3.js';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;
const KERNEL_URL = process.env.KERNEL_URL || 'http://localhost:8080';
const SOLANA_CONNECTION = new Connection('https://api.devnet.solana.com');

// --- Runner simples: verificação financeira -> execução no Kernel ---
async function verifyPayment(): Promise<boolean> {
    console.log('💰 Verificando fundos...');
    // TODO: implementar verificação on-chain real usando SOLANA RPC
    return true; // mock
}

async function callKernel(mission: string) {
    console.log('⚙️ Enviando para Kernel Rust...');
    try {
        const response = await axios.post(`${KERNEL_URL}/api/v1/execute`, {
            agent_id: 'hunter-v1',
            payload: { context: mission },
            auth_token: 'valid-token-123'
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao chamar Kernel', e);
        return { error: 'Erro no Kernel' };
    }
}

// --- API ENDPOINTS ---

// 1. Rota principal chamada pelo Dashboard
app.post('/api/mission', async (req, res) => {
    const { mission } = req.body;
    console.log(`🤖 Nova missão recebida: ${mission}`);
    const paymentVerified = await verifyPayment();
    if (!paymentVerified) {
      return res.json({ paymentVerified: false, data: null });
    }
    const data = await callKernel(mission);
    res.json({ paymentVerified: true, data });
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
