'use client';

import React from 'react';
import { useClientData, useFormatter } from './hooks';

interface ClientSummaryProps {
  clientId: string;
  startDate?: string;
  endDate?: string;
}

const ClientSummary: React.FC<ClientSummaryProps> = ({ clientId, startDate, endDate }) => {
  const { data, loading, error } = useClientData(clientId, startDate, endDate);
  const { formatNumber, formatCurrency, formatPercentage } = useFormatter();

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumo do Cliente</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumo do Cliente</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p>{error || 'Não foi possível carregar os dados do cliente'}</p>
          <p className="text-sm mt-2">As métricas exibidas abaixo são dados de demonstração e não representam dados reais.</p>
        </div>
      </div>
    );
  }

  // Aqui você pode usar os dados reais retornados da API
  const summary = data.summary || {
    total_reach: 0,
    total_impressions: 0,
    total_clicks: 0,
    total_spend: 0,
    avg_ctr: 0,
    avg_cpc: 0
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resumo do Cliente</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-700">Total de Impressões</p>
          <p className="text-2xl font-bold">{formatNumber(summary.total_impressions)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-sm text-green-700">Total de Cliques</p>
          <p className="text-2xl font-bold">{formatNumber(summary.total_clicks)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-md">
          <p className="text-sm text-purple-700">CTR Médio</p>
          <p className="text-2xl font-bold">{formatPercentage(summary.avg_ctr)}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-md">
          <p className="text-sm text-amber-700">CPC Médio</p>
          <p className="text-2xl font-bold">{formatCurrency(summary.avg_cpc)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">Investimento Total</p>
          <p className="text-2xl font-bold">{formatCurrency(summary.total_spend)}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="text-sm text-indigo-700">Total de Campanhas</p>
          <p className="text-2xl font-bold">{data.campaigns ? data.campaigns.length : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientSummary;
