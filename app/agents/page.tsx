// app/agents/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface AgentReply {
  reply: string;
}

export default function AgentsPage() {
  const [data, setData] = useState<AgentReply | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/agents')
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Respostas do Agente</h1>

      {error && (
        <p className="text-red-600 bg-red-50 p-4 rounded">{error}</p>
      )}

      {!error && !data && <p>Carregando…</p>}

      {data && (
        <pre className="bg-slate-100 p-4 rounded whitespace-pre-wrap">
          {data.reply}
        </pre>
      )}
    </div>
  );
}
