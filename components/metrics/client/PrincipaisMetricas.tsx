'use client';

import React, { useState, useEffect } from 'react';

interface PrincipaisMetricasProps {
  clientId: string;
  startDate?: string;
  endDate?: string;
}

interface ClientMetrics {
  roas: string;
  cpl: string;
  conversionRate: string;
  qualityScore: string;
  isLoading: boolean;
  error: string | null;
}

const PrincipaisMetricas: React.FC<PrincipaisMetricasProps> = ({ clientId, startDate, endDate }) => {
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
        // Construir URL com parâmetros de data se fornecidos
        let url = `/api/metrics/client?client_id=${encodeURIComponent(clientId)}`;
        
        if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
        if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
        
        const response = await fetch(url);
        
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
  }, [clientId, startDate, endDate]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-3xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in"
         style={{ animationDelay: '0.1s' }}>
      <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-6 animate-gradient">Principais Métricas Explicadas</h2>
      
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
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-3">
              <span className="text-emerald-600 text-2xl mr-3">🔥</span>
              <h3 className="font-bold text-xl text-emerald-800">ROAS Global</h3>
            </div>
            <div className="text-3xl font-bold text-emerald-700 mb-3">{metrics.roas}x</div>
            <p className="text-sm text-gray-600">
              Retorno sobre Investimento em Anúncios. Mostra quantos reais de receita são gerados para cada real 
              investido. Um ROAS acima de 4x é considerado excelente.
            </p>
          </div>

          {/* Card de CPL */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-3">
              <span className="text-blue-600 text-2xl mr-3">📊</span>
              <h3 className="font-bold text-xl text-blue-800">CPL Médio</h3>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-3">R$ {metrics.cpl}</div>
            <p className="text-sm text-gray-600">
              Custo por Lead. Indica quanto custa para gerar cada novo lead qualificado. Quanto menor, melhor a eficiência 
              da campanha.
            </p>
          </div>

          {/* Card de Taxa de Conversão */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-3">
              <span className="text-purple-600 text-2xl mr-3">📈</span>
              <h3 className="font-bold text-xl text-purple-800">Taxa de Conversão</h3>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-3">{metrics.conversionRate}%</div>
            <p className="text-sm text-gray-600">
              Percentual de cliques que se convertem em leads. Uma boa CVR indica que a landing page e oferta estão 
              alinhadas com as expectativas do anúncio.
            </p>
          </div>

          {/* Card de Quality Score */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-3">
              <span className="text-amber-600 text-2xl mr-3">⭐</span>
              <h3 className="font-bold text-xl text-amber-800">Quality Score Médio</h3>
            </div>
            <div className="text-3xl font-bold text-amber-700 mb-3">{metrics.qualityScore}</div>
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
