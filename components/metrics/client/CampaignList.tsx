'use client';

import React, { useState, useEffect } from 'react';
import { IoInformationCircleOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';

interface CampaignListProps {
  clientId: string;
  startDate?: string;
  endDate?: string;
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
  roas?: number;
  cvr?: number;
  status: 'active' | 'paused' | 'completed';
  start_date: string;
  end_date?: string;
}

interface ColumnTooltip {
  [key: string]: string;
}

const CampaignList: React.FC<CampaignListProps> = ({ clientId, startDate, endDate }) => {
  // Estado para controlar qual campanha está expandida
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Descrições explicativas para cada coluna
  const columnTooltips: ColumnTooltip = {
    impressions: "Total de vezes que o anúncio foi exibido para os usuários. É um indicador de alcance da campanha.",
    clicks: "Número de vezes que usuários clicaram no anúncio. Indica interesse inicial na sua oferta.",
    ctr: "Click-Through Rate (Taxa de Cliques). Percentual de impressões que resultaram em cliques. Um CTR maior indica anúncios mais eficazes.",
    cpc: "Custo Por Clique. Valor médio gasto para cada clique no anúncio. Um CPC menor representa melhor eficiência do orçamento.",
    spend: "Total investido nesta campanha específica. Representa todo o orçamento aplicado.",
    roas: "Return On Ad Spend (Retorno sobre Investimento em Anúncios). Mostra quanto de receita foi gerado para cada real investido.",
    status: "Status atual da campanha: ativa, pausada ou encerrada."
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        
        // Construir URL com parâmetros de data se fornecidos
        let url = `/api/metrics/client?client_id=${encodeURIComponent(clientId)}`;
        
        if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
        if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar os dados');
        
        const data = await response.json();
        
        // Transformar dados da API para o formato esperado
        if (data.campaigns && data.campaigns.length > 0) {
          const formattedCampaigns: Campaign[] = data.campaigns.map((campaign: any) => ({
            campaign_id: campaign.campaign_id || 'N/A',
            campaign_name: campaign.campaign_name || 'Campanha sem nome',
            reach: campaign.reach || 0,
            impressions: campaign.impressions || 0,
            clicks: campaign.clicks || 0,
            spend: campaign.spend || 0,
            ctr: campaign.ctr || 0,
            cpc: campaign.cpc || 0,
            roas: campaign.roas || 0,
            cvr: campaign.cvr || 0,
            status: 'active', // Status padrão, pode ser adicionado à planilha
            start_date: campaign.start_date || '',
            end_date: campaign.end_date || ''
          }));
          
          setCampaigns(formattedCampaigns);
        } else {
          setCampaigns([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar campanhas:', err);
        setError('Erro ao carregar dados das campanhas');
        setLoading(false);
      }
    };

    if (clientId) {
      fetchCampaigns();
    }
  }, [clientId, startDate, endDate]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Campanhas</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Campanhas</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL'
    }).format(value);
  };
  
  // Função que retorna uma classe CSS baseada no desempenho da métrica
  const getPerformanceClass = (metric: string, value: number) => {
    if (metric === 'ctr') {
      if (value >= 5) return 'text-green-600 font-medium';
      if (value >= 2) return 'text-amber-600';
      return 'text-red-600';
    }
    
    if (metric === 'roas') {
      if (value >= 3) return 'text-green-600 font-medium';
      if (value >= 1.5) return 'text-amber-600';
      return 'text-red-600';
    }
    
    return '';
  };
  
  // Função para renderizar o status da campanha
  const renderStatus = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Ativa</span>;
      case 'paused':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Pausada</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Encerrada</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500">{status}</span>;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Campanhas</h2>
        <div className="text-sm text-gray-500 italic">
          Clique em uma campanha para visualizar mais detalhes
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
                <div className="flex items-center">
                  <span>Impressões</span>
                  <button 
                    className="ml-1 focus:outline-none" 
                    onClick={() => setShowTooltip(showTooltip === 'impressions' ? null : 'impressions')}
                    aria-label="Mostrar explicação sobre impressões"
                  >
                    <IoInformationCircleOutline size={14} />
                  </button>
                  {showTooltip === 'impressions' && (
                    <div className="absolute top-10 left-0 z-10 bg-white p-2 rounded shadow-md border border-gray-200 w-48 text-xs text-gray-700">
                      {columnTooltips.impressions}
                    </div>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
                <div className="flex items-center">
                  <span>Cliques</span>
                  <button 
                    className="ml-1 focus:outline-none" 
                    onClick={() => setShowTooltip(showTooltip === 'clicks' ? null : 'clicks')}
                    aria-label="Mostrar explicação sobre cliques"
                  >
                    <IoInformationCircleOutline size={14} />
                  </button>
                  {showTooltip === 'clicks' && (
                    <div className="absolute top-10 left-0 z-10 bg-white p-2 rounded shadow-md border border-gray-200 w-48 text-xs text-gray-700">
                      {columnTooltips.clicks}
                    </div>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
                <div className="flex items-center">
                  <span>CTR</span>
                  <button 
                    className="ml-1 focus:outline-none" 
                    onClick={() => setShowTooltip(showTooltip === 'ctr' ? null : 'ctr')}
                    aria-label="Mostrar explicação sobre CTR"
                  >
                    <IoInformationCircleOutline size={14} />
                  </button>
                  {showTooltip === 'ctr' && (
                    <div className="absolute top-10 left-0 z-10 bg-white p-2 rounded shadow-md border border-gray-200 w-48 text-xs text-gray-700">
                      {columnTooltips.ctr}
                    </div>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
                <div className="flex items-center">
                  <span>ROAS</span>
                  <button 
                    className="ml-1 focus:outline-none" 
                    onClick={() => setShowTooltip(showTooltip === 'roas' ? null : 'roas')}
                    aria-label="Mostrar explicação sobre ROAS"
                  >
                    <IoInformationCircleOutline size={14} />
                  </button>
                  {showTooltip === 'roas' && (
                    <div className="absolute top-10 left-0 z-10 bg-white p-2 rounded shadow-md border border-gray-200 w-48 text-xs text-gray-700">
                      {columnTooltips.roas}
                    </div>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
                <div className="flex items-center">
                  <span>Investimento</span>
                  <button 
                    className="ml-1 focus:outline-none" 
                    onClick={() => setShowTooltip(showTooltip === 'spend' ? null : 'spend')}
                    aria-label="Mostrar explicação sobre investimento"
                  >
                    <IoInformationCircleOutline size={14} />
                  </button>
                  {showTooltip === 'spend' && (
                    <div className="absolute top-10 left-0 z-10 bg-white p-2 rounded shadow-md border border-gray-200 w-48 text-xs text-gray-700">
                      {columnTooltips.spend}
                    </div>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <React.Fragment key={campaign.campaign_id}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer ${expandedId === campaign.campaign_id ? 'bg-blue-50' : ''}`}
                  onClick={() => setExpandedId(expandedId === campaign.campaign_id ? null : campaign.campaign_id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{campaign.campaign_name}</div>
                      {expandedId === campaign.campaign_id ? 
                        <IoChevronUp className="ml-2 text-gray-500" /> : 
                        <IoChevronDown className="ml-2 text-gray-500" />
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.impressions.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.clicks.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${getPerformanceClass('ctr', campaign.ctr)}`}>
                      {campaign.ctr.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${getPerformanceClass('roas', campaign.roas || 0)}`}>
                      {campaign.roas ? `${campaign.roas.toFixed(1)}x` : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(campaign.spend)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatus(campaign.status)}
                  </td>
                </tr>
                {expandedId === campaign.campaign_id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-blue-50">
                      <div className="text-sm">
                        <h3 className="font-medium text-gray-900 mb-3">Detalhes da Campanha</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Período da Campanha</p>
                            <p className="text-gray-800">
                              {new Date(campaign.start_date).toLocaleDateString('pt-BR')} 
                              {campaign.end_date ? ` - ${new Date(campaign.end_date).toLocaleDateString('pt-BR')}` : ' - Atual'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">CPC</p>
                            <p className="text-gray-800">{formatCurrency(campaign.cpc)}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Taxa de Conversão</p>
                            <p className="text-gray-800">{campaign.cvr ? `${campaign.cvr.toFixed(1)}%` : 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Recomendações</h4>
                          <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                            {campaign.ctr < 3 && (
                              <li>O CTR está abaixo da média do setor. Considere revisar os criativos e a segmentação do público.</li>
                            )}
                            {campaign.roas && campaign.roas < 1.5 && (
                              <li>O ROAS está abaixo do ideal. Analise quais anúncios estão gerando conversões e otimize o investimento.</li>
                            )}
                            {campaign.status === 'active' && campaign.cpc > 0.55 && (
                              <li>O CPC está acima da média. Melhore a qualidade dos anúncios para reduzir os custos.</li>
                            )}
                            {campaign.roas && campaign.roas > 3 && (
                              <li className="text-green-600">Esta campanha tem excelente retorno! Considere aumentar o orçamento para ampliar os resultados.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p className="mb-2">
          <span className="font-medium">Entendendo as métricas:</span> Passe o mouse sobre os ícones <IoInformationCircleOutline className="inline" /> para ver explicações.
        </p>
        <p>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mr-2">Ativa</span> 
          Campanhas em execução atualmente
        </p>
        <p>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 mr-2">Pausada</span>
          Campanhas temporariamente interrompidas
        </p>
        <p>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 mr-2">Encerrada</span>
          Campanhas que já foram concluídas
        </p>
      </div>
    </div>
  );
};

export default CampaignList;
