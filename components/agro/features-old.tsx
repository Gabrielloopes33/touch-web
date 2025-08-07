'use client';

import { useState } from 'react';
import { 
  Satellite,
  Droplets,
  Thermometer,
  Cpu,
  Camera,
  BarChart3,
  Shield,
  Zap,
  Sprout,
  Tractor
} from 'lucide-react';

export default function AgroFeatures() {
  const [activeTab, setActiveTab] = useState('ia');
  const featureCategories = [
    {
      id: 'audiovisual',
      label: 'Audiovisual & Produção',
      icon: <Camera className="w-5 h-5" />,
      features: [
        {
          icon: <Camera className="w-8 h-8" />,
          title: "Produção Cinematográfica",
          description: "Filmagem em 4K/8K com drones profissionais, câmeras RED, equipamentos de cinema para documentários corporativos, institucionais e comerciais de alto impacto.",
          benefits: ["Qualidade cinematográfica", "Drones certificados ANAC", "Equipe especializada", "Entrega em 24-48h"]
        },
        {
          icon: <Zap className="w-8 h-8" />,
          title: "Cobertura de Eventos",
          description: "Documentação completa de eventos corporativos, feiras agropecuárias, inaugurações e cerimônias com transmissão ao vivo e edição profissional.",
          benefits: ["Transmissão ao vivo", "Multi-câmeras", "Edição em tempo real", "Cobertura 360°"]
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Portfólio Visual Corporativo",
          description: "Criação de banco de imagens e vídeos exclusivos da sua empresa, produtos e processos para uso em marketing, redes sociais e apresentações institucionais.",
          benefits: ["Banco de conteúdo exclusivo", "Direitos de uso total", "Múltiplos formatos", "Atualizações periódicas"]
        }
      ]
    },
    {
      id: 'automacao',
      label: 'Automação & Integração',
      icon: <Cpu className="w-5 h-5" />,
      features: [
        {
          icon: <Cpu className="w-8 h-8" />,
          title: "Automação de Processos",
          description: "Criação de workflows automatizados para integrar sistemas internos, CRM, gestão de leads, follow-up de clientes e processos administrativos.",
          benefits: ["Redução de trabalho manual", "Integração de sistemas", "Aumento de produtividade", "Menos erros humanos"]
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Dashboards Inteligentes",
          description: "Desenvolvimento de painéis personalizados que consolidam dados de vendas, produção, estoque e indicadores de performance em tempo real.",
          benefits: ["Visão unificada", "Dados em tempo real", "Relatórios automáticos", "Tomada de decisão ágil"]
        },
        {
          icon: <Tractor className="w-8 h-8" />,
          title: "Gestão de Relacionamento",
          description: "Automação completa do funil de vendas, desde captação de leads até pós-venda, com nurturing automatizado e gestão de pipeline comercial.",
          benefits: ["Pipeline organizado", "Follow-up automático", "Nutrição de leads", "Conversão otimizada"]
        }
      ]
    },
    {
      id: 'posicionamento',
      label: 'Posicionamento & Branding',
      icon: <BarChart3 className="w-5 h-5" />,
      features: [
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Estratégia de Posicionamento",
          description: "Desenvolvimento de identidade visual, estratégia de comunicação e posicionamento de marca para destacar sua empresa como referência no setor.",
          benefits: ["Identidade única", "Diferenciação competitiva", "Presença marcante", "Reconhecimento de mercado"]
        },
        {
          icon: <Thermometer className="w-8 h-8" />,
          title: "Presença Digital Estratégica",
          description: "Criação de sites institucionais, landing pages de alta conversão, estratégias de SEO e gestão de redes sociais corporativas.",
          benefits: ["Site responsivo", "SEO otimizado", "Conversão elevada", "Presença digital forte"]
        },
        {
          icon: <Sprout className="w-8 h-8" />,
          title: "Marketing de Conteúdo",
          description: "Produção de conteúdo técnico, cases de sucesso, whitepapers e materiais educativos que posicionam sua empresa como autoridade no mercado.",
          benefits: ["Autoridade de mercado", "Geração de leads", "Educação do mercado", "Credibilidade técnica"]
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Serviços que{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Destacam sua Empresa
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Produção audiovisual cinematográfica, automação inteligente e estratégias de posicionamento 
            para agronegócio e indústria
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 bg-white p-2 rounded-xl shadow-lg border">
          {featureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {featureCategories.map((category) => (
          activeTab === category.id && (
            <div key={category.id}>
              <div className="grid lg:grid-cols-3 gap-8">
                {category.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                  >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="bg-gray-200 h-px my-4" />

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Benefícios:</h4>
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para Revolucionar sua Operação Agrícola?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Descubra como nossa tecnologia pode aumentar sua produtividade, 
              reduzir custos e tornar sua operação mais sustentável.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Solicitar Demonstração
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
