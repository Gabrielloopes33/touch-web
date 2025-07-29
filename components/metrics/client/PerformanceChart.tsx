'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  clientId: string;
  startDate?: string;
  endDate?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ clientId, startDate, endDate }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        
        // Construir URL com parâmetros de data se fornecidos
        let url = `/api/metrics/client?client_id=${encodeURIComponent(clientId)}`;
        
        if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
        if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar os dados');
        
        const clientData = await response.json();
        
        // Transformar dados das campanhas para o gráfico
        if (clientData.campaigns && clientData.campaigns.length > 0) {
          const chartData = clientData.campaigns.map((campaign: any, index: number) => ({
            name: campaign.campaign_name || `Campanha ${index + 1}`,
            impressions: campaign.impressions || 0,
            clicks: campaign.clicks || 0,
            spend: campaign.spend || 0
          }));
          setData(chartData);
        } else {
          // Se não há campanhas, mostrar dados do resumo
          setData([{
            name: 'Total',
            impressions: clientData.summary?.total_impressions || 0,
            clicks: clientData.summary?.total_clicks || 0,
            spend: clientData.summary?.total_spend || 0
          }]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados de performance:', err);
        setError('Erro ao carregar dados de performance');
        setLoading(false);
      }
    };

    if (clientId) {
      fetchPerformanceData();
    }
  }, [clientId, startDate, endDate]);

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance por Campanha</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance por Campanha</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Performance ao longo do tempo</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="impressions" name="Impressões" fill="#8884d8" />
            <Bar dataKey="clicks" name="Cliques" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
