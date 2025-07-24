'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

// Define a type for our data to ensure type safety
interface MetricData {
  date_start: string;
  spend: number;
  [key: string]: any; // Allow other properties
}

export default function SpendChart() {
  const [data, setData] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/metrics');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const rawData = await response.json();
        
        // Process data: convert spend to a number and format date
        const processedData = rawData.map((item: any) => ({
          ...item,
          spend: parseFloat(item.spend || 0),
          date_start: new Date(item.date_start).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        }));

        setData(processedData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" text="Carregando dados do gráfico..." />
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 className="text-lg font-semibold mb-4">Investimento por Dia</h2>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_start" />
          <YAxis />
          <Tooltip formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Investimento']} />
          <Legend />
          <Bar dataKey="spend" fill="#8884d8" name="Investimento (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
