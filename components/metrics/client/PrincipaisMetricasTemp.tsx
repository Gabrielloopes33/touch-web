'use client';

import React, { useState, useEffect } from 'react';

interface PrincipaisMetricasProps {
  clientId: string;
}

interface ClientMetrics {
  roas: string;
  cpl: string;
  conversionRate: string;
  qualityScore: string;
  isLoading: boolean;
  error: string | null;
}

const PrincipaisMetricas: React.FC<PrincipaisMetricasProps> = ({ clientId }) => {
  const [metrics, setMetrics] = useState<ClientMetrics>({
    roas: '0',
    cpl: '0',
    conversionRate: '0',
    qualityScore: '0',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchClientMetrics = async () => {
      try {
        const response = await fetch(`/api/metrics/client?client_id=${encodeURIComponent(clientId)}`);
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        
        const data = await response.json();
        setMetrics({
          roas: data.roas || '0',
          cpl: data.cpl || '0',
          conversionRate: data.conversionRate || '0',
          qualityScore: data.qualityScore || '0',
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Erro ao buscar métricas do cliente:', error);
        setMetrics(prev => ({
          ...prev,
          isLoading: false,
          error: 'Não foi possível carregar os dados. Tente novamente mais tarde.'
        }));
      }
    };

    if (clientId) {
      fetchClientMetrics();
    }
  }, [clientId]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h2 className="font-bold text-lg text-blue-800 mb-4">Principais Métricas Explicadas</h2>
      
      {metrics.isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <span className="ml-2 text-blue-700">Carregando métricas...</span>
        </div>
      ) : metrics.error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{metrics.error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card de ROAS */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-amber-600 text-xl mr-2">🔥</span>
              <h3 className="font-bold text-lg">ROAS Global</h3>
            </div>
            <div className="text-2xl font-bold text-green-700 mb-2">{metrics.roas}x</div>
            <p className="text-sm text-gray-600">
              Retorno sobre Investimento em Anúncios. Mostra quantos reais de receita são gerados para cada real 
              investido. Um ROAS acima de 4x é considerado excelente.
            </p>
          </div>

          {/* Card de CPL */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-blue-600 text-xl mr-2">📊</span>
              <h3 className="font-bold text-lg">CPL Médio</h3>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">R$ {metrics.cpl}</div>
            <p className="text-sm text-gray-600">
              Custo por Lead. Indica quanto custa para gerar cada novo lead qualificado. Quanto menor, melhor a eficiência 
              da campanha.
            </p>
          </div>

          {/* Card de Taxa de Conversão */}
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-purple-600 text-xl mr-2">📈</span>
              <h3 className="font-bold text-lg">Taxa de Conversão</h3>
            </div>
            <div className="text-2xl font-bold text-purple-700 mb-2">{metrics.conversionRate}%</div>
            <p className="text-sm text-gray-600">
              Percentual de cliques que se convertem em leads. Uma boa CVR indica que a landing page e oferta estão 
              alinhadas com as expectativas do anúncio.
            </p>
          </div>

          {/* Card de Quality Score */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-amber-600 text-xl mr-2">⭐</span>
              <h3 className="font-bold text-lg">Quality Score Médio</h3>
            </div>
            <div className="text-2xl font-bold text-amber-700 mb-2">{metrics.qualityScore}</div>
            <p className="text-sm text-gray-600">
              Índice de qualidade das campanhas (1-10). Um score alto reduz o CPC e aumenta a visibilidade. Acima de 7 é 
              considerado muito bom.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipaisMetricas;
