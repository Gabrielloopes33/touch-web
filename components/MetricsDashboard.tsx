'use client';

import React, { useState, useEffect } from 'react';
import AuthNavigation from './AuthNavigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';

interface MetricsData {
  client_id: string;
  total_reach: number;
  total_impressions: number;
  total_clicks: number;
  total_spend: number;
  campaigns: number;
  ads: number;
  avg_ctr: number;
  avg_cpc: number;
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'
];

const MetricsDashboard: React.FC = () => {
  const [data, setData] = useState<MetricsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState('total_spend');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/metrics/aggregated');
      
      if (response.status === 401) {
        setError('Você precisa estar logado para acessar as métricas.');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Erro ao carregar dados');
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error}</div>
          {error.includes('logado') && (
            <a 
              href="/signin" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Fazer Login
            </a>
          )}
        </div>
      </div>
    );
  }

  const topClients = data.slice(0, 10); // Top 10 clients

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Métricas Meta Ads</h1>
        <AuthNavigation />
      </div>
      
      {/* Metric Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione a métrica para visualizar:
        </label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="total_spend">Gastos Totais (R$)</option>
          <option value="total_reach">Alcance Total</option>
          <option value="total_impressions">Impressões Totais</option>
          <option value="total_clicks">Cliques Totais</option>
          <option value="campaigns">Número de Campanhas</option>
          <option value="ads">Número de Anúncios</option>
          <option value="avg_ctr">CTR Médio (%)</option>
          <option value="avg_cpc">CPC Médio (R$)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Top 10 Clientes - {getMetricLabel(selectedMetric)}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topClients} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="client_id" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={(value) => formatValue(value, selectedMetric)} />
              <Legend />
              <Bar 
                dataKey={selectedMetric} 
                fill="#0088FE" 
                name={getMetricLabel(selectedMetric)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Distribuição - {getMetricLabel(selectedMetric)}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topClients}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.client_id.substring(0, 10)}...`}
                outerRadius={120}
                fill="#8884d8"
                dataKey={selectedMetric}
              >
                {topClients.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatValue(value, selectedMetric)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Linha - CTR vs CPC */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Relação CTR vs CPC por Cliente
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={topClients} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="client_id" 
              angle={-45}
              textAnchor="end"
              height={100}
              fontSize={12}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="avg_ctr" 
              stroke="#8884d8" 
              name="CTR Médio (%)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="avg_cpc" 
              stroke="#82ca9d" 
              name="CPC Médio (R$)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Área - Impressões vs Cliques */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Impressões vs Cliques por Cliente
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={topClients} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="client_id" 
              angle={-45}
              textAnchor="end"
              height={100}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="total_impressions"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Impressões Totais"
            />
            <Area
              type="monotone"
              dataKey="total_clicks"
              stackId="2"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Cliques Totais"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela de Resumo */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo dos Dados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gastos (R$)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alcance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impressões
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPC (R$)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topClients.map((client, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <a 
                      href={`/metrics/client?id=${encodeURIComponent(client.client_id)}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {client.client_id}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {client.total_spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.total_reach.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.total_impressions.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.total_clicks.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.avg_ctr}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {client.avg_cpc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getMetricLabel = (metric: string): string => {
  const labels: { [key: string]: string } = {
    total_spend: 'Gastos Totais (R$)',
    total_reach: 'Alcance Total',
    total_impressions: 'Impressões Totais',
    total_clicks: 'Cliques Totais',
    campaigns: 'Número de Campanhas',
    ads: 'Número de Anúncios',
    avg_ctr: 'CTR Médio (%)',
    avg_cpc: 'CPC Médio (R$)'
  };
  return labels[metric] || metric;
};

const formatValue = (value: any, metric: string): string => {
  const num = Number(value);
  
  if (metric === 'total_spend' || metric === 'avg_cpc') {
    return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  } else if (metric === 'avg_ctr') {
    return `${num}%`;
  } else {
    return num.toLocaleString('pt-BR');
  }
};

export default MetricsDashboard;
