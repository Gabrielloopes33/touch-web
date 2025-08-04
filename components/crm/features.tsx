'use client';

import { useState } from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Automação Inteligente",
    description: "IA que aprende com seus processos e automatiza tarefas repetitivas, liberando sua equipe para focar no que realmente importa.",
    detailedDescription: "Nossa IA monitora constantemente seus processos de vendas e identifica padrões de comportamento. Ela aprende quando um lead está mais propenso a comprar, qual o melhor horário para fazer contato e quais mensagens geram mais conversões. A automação vai além de templates - ela personaliza cada interação baseada no histórico e perfil do cliente, aumentando suas taxas de conversão em até 300%.",
    benefits: [
      "Análise preditiva de comportamento",
      "Personalização automática de mensagens",
      "Otimização de timing de contato",
      "Redução de 85% em tarefas manuais"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Follow-up Instantâneo",
    description: "Resposta automática no mesmo momento. Seus leads nunca mais ficam esperando uma resposta.",
    detailedDescription: "O sistema monitora todos os pontos de contato em tempo real. Quando um lead interage com seu site, preenche um formulário ou envia uma mensagem, nossa IA responde instantaneamente com informações relevantes e qualificação inicial. Isso garante que o interesse não esfrie e aumenta drasticamente suas chances de conversão.",
    benefits: [
      "Resposta em menos de 30 segundos",
      "Qualificação automática de leads",
      "Agendamento inteligente de reuniões",
      "Aumento de 250% na taxa de resposta"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Analytics Avançado",
    description: "Dashboards em tempo real. Saiba exatamente onde estão suas oportunidades.",
    detailedDescription: "Tenha acesso a insights profundos sobre seu funil de vendas com dashboards interativos e relatórios em tempo real. Visualize métricas como taxa de conversão por canal, ROI de campanhas, performance individual da equipe e previsões de vendas baseadas em IA. Todos os dados são apresentados de forma visual e actionable.",
    benefits: [
      "Dashboards personalizáveis em tempo real",
      "Previsões de vendas com IA",
      "Análise de ROI por canal",
      "Relatórios automatizados por email"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Gestão de Equipe",
    description: "Acompanhe performance, distribua leads e mantenha sua equipe sempre produtiva com ferramentas colaborativas.",
    detailedDescription: "Gerencie sua equipe de vendas com ferramentas avançadas de distribuição de leads, acompanhamento de metas e gamificação. O sistema distribui leads automaticamente baseado na expertise e disponibilidade de cada vendedor, criando um ambiente competitivo saudável com rankings e recompensas.",
    benefits: [
      "Distribuição inteligente de leads",
      "Sistema de gamificação e rankings",
      "Metas individuais e em equipe",
      "Coaching automático baseado em performance"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    title: "Integrações Nativas",
    description: "Conecte com WhatsApp, Instagram, Facebook, site e integre com ferramentas que você já usa.",
    detailedDescription: "Mais de 200 integrações nativas com as principais ferramentas do mercado. Desde redes sociais até ERPs, nosso CRM se conecta com seu ecossistema existente sem a necessidade de desenvolvimento customizado. APIs robustas permitem integrações ilimitadas para casos específicos do seu negócio.",
    benefits: [
      "200+ integrações pré-configuradas",
      "API REST completa para desenvolvimento",
      "Sync bidirecional de dados",
      "Marketplace de integrações da comunidade"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Segurança Total",
    description: "Criptografia end-to-end, backup automático e conformidade com LGPD. Seus dados estão sempre seguros.",
    detailedDescription: "Segurança de nível bancário com criptografia AES-256, backup automático em múltiplas regiões e conformidade total com LGPD, GDPR e SOC 2. Auditoria completa de acessos, autenticação de dois fatores e controle granular de permissões garantem que seus dados corporativos estejam sempre protegidos.",
    benefits: [
      "Criptografia AES-256 end-to-end",
      "Backup automático em múltiplas regiões",
      "Conformidade LGPD, GDPR e SOC 2",
      "Auditoria completa e 2FA obrigatório"
    ]
  }
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const renderCardContent = (feature: any, index: number, isExpanded: boolean) => {
    if (!isExpanded) {
      return (
        <>
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 ${
            hoveredIndex === index 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {feature.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Hover Arrow */}
          <div className={`inline-flex items-center text-purple-600 font-medium transition-all duration-300 cursor-pointer ${
            hoveredIndex === index ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
          }`}>
            Saiba mais
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick(index);
          }}
          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors mb-4"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        {/* Expanded Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-purple-600 font-medium">Detalhes completos da funcionalidade</p>
        </div>

        {/* Detailed Description */}
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {feature.detailedDescription}
          </p>

          {/* Benefits List */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Principais Benefícios:</h4>
            <ul className="space-y-2">
              {feature.benefits.map((benefit: string, benefitIndex: number) => (
                <li key={benefitIndex} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button 
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20', '_blank')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Quero Testar Esta Funcionalidade
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-5xl font-bold text-gray-900 mb-6">
            Recursos que Fazem a
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Diferença
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para transformar leads em clientes, automatizar processos e aumentar suas vendas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-purple-200 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/50 cursor-pointer ${
                expandedCard === index 
                  ? 'md:col-span-2 lg:col-span-3 border-purple-300 shadow-xl shadow-purple-100/50' 
                  : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(index)}
              style={{
                minHeight: expandedCard === index ? '600px' : '320px',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl transition-opacity duration-300 ${
                expandedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full">
                {renderCardContent(feature, index, expandedCard === index)}
              </div>

              {/* Decorative Elements */}
              <div className={`absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full transition-all duration-300 ${
                hoveredIndex === index || expandedCard === index ? 'scale-150 opacity-100' : 'scale-100 opacity-50'
              }`}></div>

              {/* Expansion Indicator */}
              {expandedCard !== index && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {expandedCard === null && (
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">Quer ver todos os recursos em ação?</p>
            <button 
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20', '_blank')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Agendar Demonstração Completa
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
