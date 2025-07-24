'use client';

import React, { useState } from 'react';
import { IoInformationCircleOutline, IoChevronDown, IoChevronUp, IoStatsChart } from 'react-icons/io5';

interface ClientHeaderProps {
  clientId: string;
  clientName?: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ clientId, clientName }) => {
  const displayName = clientName || clientId;
  const [showMetricsGuide, setShowMetricsGuide] = useState(false);
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Análise do Cliente: {displayName}</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowMetricsGuide(!showMetricsGuide)}
            className="flex items-center mt-2 md:mt-0 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <IoInformationCircleOutline className="mr-1" size={20} />
            <span>Entenda as métricas</span>
            {showMetricsGuide ? <IoChevronUp className="ml-1" /> : <IoChevronDown className="ml-1" />}
          </button>
          
          <button 
            onClick={() => window.open('/metrics', '_self')}
            className="flex items-center mt-2 md:mt-0 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <IoStatsChart className="mr-1" size={18} />
            <span>Dashboard Geral</span>
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">Dashboard detalhado com métricas e performance de marketing</p>
      
      {showMetricsGuide && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 mb-6">
            <h2 className="font-bold text-lg text-blue-800 mb-4">Principais Métricas Explicadas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Card de ROAS */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-amber-600 text-xl mr-2">🔥</span>
                  <h3 className="font-bold text-lg">ROAS Global</h3>
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">3.06x</div>
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
                <div className="text-2xl font-bold text-blue-700 mb-2">R$ 100.81</div>
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
                <div className="text-2xl font-bold text-purple-700 mb-2">6.05%</div>
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
                <div className="text-2xl font-bold text-amber-700 mb-2">7.1</div>
                <p className="text-sm text-gray-600">
                  Índice de qualidade das campanhas (1-10). Um score alto reduz o CPC e aumenta a visibilidade. Acima de 7 é 
                  considerado muito bom.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4 mb-6">
            <h2 className="font-bold text-lg text-gray-800 mb-3">Entendendo os Gráficos de Correlação</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">CTR vs CPC</h3>
                <p className="text-sm text-gray-600">
                  Anúncios no canto superior esquerdo (alto CTR, baixo CPC) são os mais eficientes. Um alto CTR geralmente 
                  resulta em menor custo por clique, melhorando o desempenho geral da campanha.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">CTR vs Taxa de Conversão</h3>
                <p className="text-sm text-gray-600">
                  Alto CTR com baixa conversão pode indicar problemas na landing page. Idealmente, busca-se anúncios com alto 
                  CTR e alta conversão, demonstrando alinhamento entre anúncio e página.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 mb-6">
            <h2 className="font-bold text-lg text-blue-800 mb-3">Guia de Métricas para Campanhas Digitais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">Indicadores Financeiros e de Geração de Leads</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-800">ROAS (Retorno sobre Investimento em Anúncios)</p>
                    <p className="text-sm text-gray-600">Mostra quanto a campanha retorna por cada real investido. Um ROAS acima de 2 (200%) é geralmente considerado bom, indicando que para cada R$1 investido, você obtém R$2 em retorno. Ajuda a entender se os anúncios estão gerando lucro ou prejuízo.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800">CPL (Custo por Lead)</p>
                    <p className="text-sm text-gray-600">Calcula o custo médio para adquirir um novo lead, dividindo o total investido pelo número de leads gerados. CPL alto sugere segmentação inadequada ou ofertas pouco atrativas; CPL baixo indica boa eficiência na captação de potenciais clientes.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800">CPC (Custo por Clique)</p>
                    <p className="text-sm text-gray-600">Valor médio pago por clique nos anúncios. Ajuda a acompanhar quanto está sendo pago por cada visita gerada. Um CPC alto pode exigir ajustes na segmentação ou na qualidade do anúncio para reduzir custos.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">Indicadores de Engajamento e Conversão</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-800">CTR (Click-Through Rate)</p>
                    <p className="text-sm text-gray-600">Proporção de cliques em relação às impressões. Avalia se o anúncio desperta interesse. CTR alto indica que a mensagem e a segmentação estão alinhadas; CTR baixo sugere que o criativo ou o público devem ser revisados.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800">Taxa de Conversão (CVR)</p>
                    <p className="text-sm text-gray-600">Proporção de conversões em relação aos cliques. Mede o sucesso da página de destino ou funil de vendas em transformar visitantes em clientes. Uma CVR baixa aponta que a experiência ou a oferta precisa ser aprimorada.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800">Taxa de Rejeição (Bounce Rate)</p>
                    <p className="text-sm text-gray-600">Percentual de visitantes que acessam a landing page e saem sem interagir. Uma rejeição alta indica que a página não atende às expectativas criadas pelo anúncio (carregamento lento, mensagem desalinhada ou layout confuso).</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-blue-700 mb-2">Indicadores de Qualidade e Experiência</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-gray-800">Índice de Qualidade (Quality Score)</p>
                  <p className="text-sm text-gray-600">Nota de 1 a 10 atribuída pelo Google que reflete a qualidade de palavras-chave, anúncio e página de destino. Um índice alto melhora a posição do anúncio e reduz o custo por clique. Notas baixas exigem melhorar texto e alinhamento com a landing page.</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-800">Frequência</p>
                  <p className="text-sm text-gray-600">Número médio de vezes que cada usuário viu o anúncio. Frequências altas podem levar à saturação do público e reduzir o CTR. Monitorar esta métrica ajuda a perceber quando precisa renovar criativos ou ampliar o público.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
