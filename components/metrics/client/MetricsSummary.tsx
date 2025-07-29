'use client';

import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';

interface MetricsSummaryProps {
  clientId: string;
  startDate?: string;
  endDate?: string;
}

interface SummaryData {
  total_reach: number;
  total_impressions: number;
  total_clicks: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  total_campaigns: number;
  roas?: number;
  cpl?: number;
  cvr?: number;
  bounce_rate?: number;
  quality_score?: number;
  frequency?: number;
}

const MetricsSummary: React.FC<MetricsSummaryProps> = ({ clientId, startDate, endDate }) => {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        
        // Construir URL com parâmetros de data se fornecidos
        let url = `/api/metrics/client?client_id=${encodeURIComponent(clientId)}`;
        
        if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
        if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
        
        // Buscar dados reais da API
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar os dados');
        const data = await response.json();
        
        // Usar dados reais da planilha
        setSummaryData({
          total_reach: data.summary?.total_reach || 0,
          total_impressions: data.summary?.total_impressions || 0,
          total_clicks: data.summary?.total_clicks || 0,
          total_spend: data.summary?.total_spend || 0,
          avg_ctr: data.summary?.avg_ctr || 0,
          avg_cpc: data.summary?.avg_cpc || 0,
          total_campaigns: data.summary?.total_campaigns || 0,
          roas: parseFloat(data.roas) || 0,
          cpl: parseFloat(data.cpl) || 0,
          cvr: parseFloat(data.conversionRate) || 0,
          bounce_rate: parseFloat(data.bounce_rate) || 0, // Se disponível na planilha
          quality_score: parseFloat(data.qualityScore) || 0,
          frequency: parseFloat(data.frequency) || 0 // Se disponível na planilha
        });
        
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados do cliente');
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, [clientId, startDate, endDate]);
  
  if (loading) {
    return <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate-pulse h-40"></div>;
  }
  
  if (error || !summaryData) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-red-500">{error || 'Não foi possível carregar os dados'}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resumo de Métricas</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Indicadores Financeiros e de Geração de Leads</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Investimento Total" 
            value={`R$ ${summaryData.total_spend.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            description="Total investido nas campanhas de marketing digital durante o período analisado. Este valor representa todo o orçamento aplicado em anúncios."
            color="red"
          />
          
          <MetricCard 
            title="ROAS" 
            value={`${summaryData.roas?.toFixed(1)}x`}
            description="Retorno sobre Investimento em Anúncios. Um ROAS de 2.0 significa que para cada R$1 investido, você obtém R$2 em retorno. Valores acima de 2 são considerados bons."
            color="green"
            trend={{ value: 0.3, isPositive: true }}
          />
          
          <MetricCard 
            title="CPL (Custo por Lead)" 
            value={`R$ ${summaryData.cpl?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            description="Custo médio para adquirir um novo lead. Calculado dividindo o total investido pelo número de leads gerados. Valores menores indicam melhor eficiência na captação."
            color="amber"
          />
          
          <MetricCard 
            title="CPC Médio" 
            value={`R$ ${summaryData.avg_cpc.toFixed(2)}`}
            description="Valor médio pago por cada clique nos anúncios. Um CPC menor representa melhor eficiência do orçamento, permitindo mais cliques com o mesmo investimento."
            color="blue"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Indicadores de Engajamento e Conversão</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard 
            title="Impressões" 
            value={summaryData.total_impressions.toLocaleString()}
            description="Número total de vezes que seus anúncios foram exibidos para usuários. Uma métrica importante para avaliar o alcance das campanhas."
            color="blue"
          />
          
          <MetricCard 
            title="Cliques" 
            value={summaryData.total_clicks.toLocaleString()}
            description="Quantidade de vezes que usuários clicaram em seus anúncios. Indica interesse inicial na sua oferta."
            color="indigo"
          />
          
          <MetricCard 
            title="CTR Médio" 
            value={`${summaryData.avg_ctr.toFixed(2)}%`}
            description="Taxa de cliques em relação às impressões. Um CTR maior indica anúncios mais relevantes e atrativos para o público-alvo."
            color="purple"
            trend={{ value: 0.5, isPositive: true }}
          />
          
          <MetricCard 
            title="Taxa de Conversão" 
            value={`${summaryData.cvr?.toFixed(1)}%`}
            description="Percentual de visitantes que realizaram a ação desejada (compra, cadastro, etc). Uma taxa maior indica páginas de destino eficientes e ofertas atrativas."
            color="green"
          />
          
          <MetricCard 
            title="Taxa de Rejeição" 
            value={`${summaryData.bounce_rate?.toFixed(1)}%`}
            description="Percentual de visitantes que saem do site sem interagir. Uma taxa menor é melhor, indicando que o conteúdo da página atende às expectativas criadas pelo anúncio."
            color="red"
          />
          
          <MetricCard 
            title="Alcance Total" 
            value={summaryData.total_reach.toLocaleString()}
            description="Número estimado de pessoas únicas que viram seus anúncios pelo menos uma vez. Diferente das impressões, conta cada pessoa apenas uma vez."
            color="blue"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Indicadores de Qualidade e Experiência</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard 
            title="Índice de Qualidade" 
            value={summaryData.quality_score?.toFixed(1) || 'N/A'}
            description="Nota de 1 a 10 atribuída pelo Google que avalia relevância de palavras-chave, anúncios e páginas de destino. Notas maiores resultam em melhor posicionamento e menor CPC."
            color="purple"
          />
          
          <MetricCard 
            title="Frequência" 
            value={summaryData.frequency?.toFixed(1) || 'N/A'}
            description="Número médio de vezes que cada pessoa viu seus anúncios. Uma frequência alta pode causar fadiga da audiência, enquanto muito baixa pode não gerar reconhecimento."
            color="amber"
          />
          
          <MetricCard 
            title="Campanhas Ativas" 
            value={summaryData.total_campaigns}
            description="Número total de campanhas publicitárias sendo executadas durante o período analisado."
            color="indigo"
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsSummary;
