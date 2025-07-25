'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface Agent {
  id?: string;
  name: string;
  status?: string;
  interactions?: number;
  successRate?: number;
  // adicione mais campos conforme precisar
}

export default function AgentsDebug() {
  const [data, setData] = useState<Agent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/agents')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`GET /api/agents → ${res.status}`);
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <pre className="mt-10 p-4 bg-red-100 text-red-600 rounded">
        {error}
      </pre>
    );
  }

  return (
    <div className="mt-10">
      {data ? (
        <pre className="p-4 bg-slate-100 rounded text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div className="flex justify-center p-4">
          <LoadingSpinner size="md" text="Carregando dados dos agentes..." />
        </div>
      )}
    </div>
  );
}
