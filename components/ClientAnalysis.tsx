'use client';

import React, { useState, useEffect } from 'react';
import AuthNavigation from './AuthNavigation';
import LoadingSpinner from './LoadingSpinner';
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
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';

interface Ad {
  ad_id: string;
  ad_name: string;
  adset_name: string;
  reach: number;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
}

interface Campaign {
  campaign_id: string;
  campaign_name: string;
  reach: number;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  adsets_count: number;
  ads_count: number;
  ads: Ad[];
}

interface ClientData {
  client_id: string;
  campaigns: Campaign[];
  summary: {
    total_campaigns: number;
    total_reach: number;
    total_impressions: number;
    total_clicks: number;
    total_spend: number;
    avg_ctr: number;
    avg_cpc: number;
  };
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'
];

interface ClientAnalysisProps {
  clientId: string;
}

const ClientAnalysis: React.FC<ClientAnalysisProps> = ({ clientId }) => {
  const [data, setData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/metrics/client?client_id=${encodeURIComponent(clientId)}`);
      
      if (response.status === 401) {
        setError('Você precisa estar logado para acessar as métricas.');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Erro ao carregar dados do cliente');
      }
      
      const result = await response.json();
      setData(result);
      if (result.campaigns && result.campaigns.length > 0) {
        setSelectedCampaign(result.campaigns[0]);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
      setError('Erro ao carregar dados do cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Carregando dados do cliente..." />
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

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Erro ao carregar dados do cliente</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">{data.client_id}</h1>
        <AuthNavigation />
      </div>
      <p className="text-gray-600 mb-8">Análise detalhada das campanhas e anúncios</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Gastos Totais</h3>
          <p className="text-3xl font-bold text-blue-600">
            R$ {data.summary.total_spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Alcance Total</h3>
          <p className="text-3xl font-bold text-green-600">
            {data.summary.total_reach.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">CTR Médio</h3>
          <p className="text-3xl font-bold text-yellow-600">{data.summary.avg_ctr}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">CPC Médio</h3>
          <p className="text-3xl font-bold text-purple-600">
            R$ {data.summary.avg_cpc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Performance por Campanha - Gastos
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.campaigns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="campaign_name" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
              <Legend />
              <Bar dataKey="spend" fill="#0088FE" name="Gastos (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Distribuição de Gastos por Campanha
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data.campaigns}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.campaign_name.substring(0, 20)}...`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="spend"
              >
                {data.campaigns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTR vs CPC Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Análise CTR vs CPC por Campanha
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={data.campaigns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="ctr" 
              name="CTR (%)" 
              label={{ value: 'CTR (%)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              dataKey="cpc" 
              name="CPC (R$)" 
              label={{ value: 'CPC (R$)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value, name) => [
                name === 'cpc' ? `R$ ${Number(value).toFixed(2)}` : `${Number(value).toFixed(2)}%`,
                name === 'cpc' ? 'CPC (R$)' : 'CTR (%)'
              ]}
              labelFormatter={(label) => `Campanha: ${data.campaigns[Number(label)]?.campaign_name || 'N/A'}`}
            />
            <Scatter dataKey="cpc" fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign Selector and Ad Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise Detalhada por Campanha</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione uma campanha:
          </label>
          <select
            value={selectedCampaign?.campaign_id || ''}
            onChange={(e) => {
              const campaign = data.campaigns.find(c => c.campaign_id === e.target.value);
              setSelectedCampaign(campaign || null);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-2xl"
          >
            {data.campaigns.map(campaign => (
              <option key={campaign.campaign_id} value={campaign.campaign_id}>
                {campaign.campaign_name}
              </option>
            ))}
          </select>
        </div>

        {selectedCampaign && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">Gastos da Campanha</h4>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {selectedCampaign.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">CTR da Campanha</h4>
                <p className="text-2xl font-bold text-green-600">{selectedCampaign.ctr}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">CPC da Campanha</h4>
                <p className="text-2xl font-bold text-purple-600">
                  R$ {selectedCampaign.cpc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Anúncios da Campanha</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome do Anúncio
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conjunto de Anúncios
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alcance
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impressões
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliques
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CTR (%)
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPC (R$)
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gastos (R$)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedCampaign.ads.map((ad, index) => (
                    <tr key={ad.ad_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2 text-sm text-gray-900 max-w-xs truncate">
                        {ad.ad_name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {ad.adset_name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {ad.reach.toLocaleString('pt-BR')}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {ad.impressions.toLocaleString('pt-BR')}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {ad.clicks.toLocaleString('pt-BR')}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {ad.ctr}%
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        R$ {ad.cpc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        R$ {ad.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientAnalysis;
