'use client';
import { useState } from 'react';

export default function Home() {
  const [mission, setMission] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startAgent = async () => {
    setLoading(true);
    addLog('🚀 Inicializando XPEX Swarm...');
    
    try {
      // 1. Chama o Orquestrador
      const res = await fetch('http://localhost:8081/api/mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission })
      });
      const data = await res.json();
      
      addLog(`💰 Pagamento Verificado: ${data.paymentVerified}`);
      addLog(`🧠 Resposta do Kernel: ${JSON.stringify(data.data)}`);
    } catch (e) {
      addLog('❌ Erro de conexão com o sistema.');
    } finally {
      setLoading(false);
    }
  };

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono p-8">
      <div className="max-w-4xl mx-auto border border-green-800 p-6 rounded bg-gray-900">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-green-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tighter">XPEX SYSTEMS AI <span className="text-xs bg-green-900 px-2 py-1 rounded">V2.0 ALPHA</span></h1>
          {/* Mock do botão da wallet - Em prod precisa do Provider completo */}
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Conectar Wallet (Solana)
          </button>
        </div>

        {/* INPUT MISSION */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-gray-400">COMANDO DE MISSÃO</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Ex: Encontrar arbitragem ETH/USDT na Uniswap..." 
              className="flex-1 bg-black border border-green-700 p-3 focus:outline-none focus:border-green-400 text-white"
            />
            <button 
              onClick={startAgent}
              disabled={loading}
              className="bg-green-700 hover:bg-green-600 text-black font-bold px-6 py-3 transition disabled:opacity-50"
            >
              {loading ? 'EXECUTANDO...' : 'EXECUTAR AGENTE'}
            </button>
          </div>
        </div>

        {/* TERMINAL OUTPUT */}
        <div className="bg-black border border-gray-800 h-64 overflow-y-auto p-4 font-mono text-sm">
          {logs.length === 0 && <span className="text-gray-600 opacity-50">Aguardando comando...</span>}
          {logs.map((log, i) => (
            <div key={i} className="mb-1 border-l-2 border-green-900 pl-2 hover:bg-gray-900">
              {log}
            </div>
          ))}
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="p-4 bg-gray-900 border border-gray-700">
            <div className="text-xs text-gray-500">KERNEL LATENCY</div>
            <div className="text-xl font-bold text-white">42ms</div>
          </div>
          <div className="p-4 bg-gray-900 border border-gray-700">
            <div className="text-xs text-gray-500">ACTIVE AGENTS</div>
            <div className="text-xl font-bold text-white">3</div>
          </div>
          <div className="p-4 bg-gray-900 border border-gray-700">
            <div className="text-xs text-gray-500">REVENUE (24H)</div>
            <div className="text-xl font-bold text-green-400">$124.50</div>
          </div>
        </div>

      </div>
    </main>
  );
}
