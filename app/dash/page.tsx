"use client";
import React from "react";

import { useEffect, useState } from "react";

// Definindo a estrutura dos dados que serão recebidos da API
interface Metric {
  Data: string;
  Impressões: number;
  Alcance: number;
  Seguidores: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetch("/api/metrics") // Temporariamente pega os dados gerais
      .then(res => res.json())
      .then((data: Metric[]) => setMetrics(data)) // Tipando a resposta da API
      .catch(err => console.error("Erro ao buscar métricas:", err));
  }, []);

  return (
    <div>
      <h1>Painel de Métricas</h1>
      {metrics.length > 0 ? (
        <ul>
          {metrics.map((metric, index) => (
            <li key={index}>
              <strong>Data:</strong> {metric.Data} | 
              <strong> Impressões:</strong> {metric.Impressões} | 
              <strong> Alcance:</strong> {metric.Alcance} | 
              <strong> Seguidores:</strong> {metric.Seguidores}
            </li>
          ))}
        </ul>
      ) : (
        <p>Carregando métricas...</p>
      )}
    </div>
  );
}
