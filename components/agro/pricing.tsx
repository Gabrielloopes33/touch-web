'use client';

import { useState } from 'react';
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users,
  Cpu,
  BarChart3,
  Headphones
} from 'lucide-react';

export default function AgroPricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: "Presença Digital",
      description: "Ideal para empresas que querem fortalecer sua presença online e produzir conteúdo audiovisual básico",
      monthlyPrice: 1497,
      yearlyPrice: 14970,
      savings: 20,
      icon: <Zap className="w-6 h-6" />,
      color: "green",
      popular: false,
      features: [
        "2 vídeos institucionais por mês",
        "Cobertura de 1 evento mensal",
        "Criação de site responsivo",
        "Gestão básica de redes sociais",
        "Suporte via WhatsApp",
        "Banco de imagens exclusivas",
        "Edição profissional inclusa",
        "Direitos de uso total"
      ],
      limitations: [
        "Limitado a região metropolitana",
        "Suporte apenas em horário comercial"
      ]
    },
    {
      name: "Audiovisual Pro",
      description: "Solução completa para empresas que querem destacar-se com produção cinematográfica e automação",
      monthlyPrice: 2997,
      yearlyPrice: 29970,
      savings: 20,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "blue",
      popular: true,
      features: [
        "5 vídeos profissionais por mês",
        "Cobertura ilimitada de eventos",
        "Filmagem com drones 4K/8K",
        "Automação completa de CRM",
        "Dashboard de métricas em tempo real",
        "Transmissão ao vivo profissional",
        "Banco de conteúdo exclusivo",
        "Estratégia de posicionamento",
        "Suporte prioritário 24/7",
        "Equipe dedicada",
        "Integração de sistemas",
        "Consultoria estratégica mensal"
      ],
      limitations: []
    },
    {
      name: "Transformação Total",
      description: "Para grandes empresas que querem revolucionar completamente sua presença e processos digitais",
      monthlyPrice: 5997,
      yearlyPrice: 59970,
      savings: 20,
      icon: <Shield className="w-6 h-6" />,
      color: "purple",
      popular: false,
      features: [
        "Produção audiovisual ilimitada",
        "Equipe dedicada exclusiva",
        "Identidade visual completa",
        "Estratégia omnichannel",
        "Automação de todos os processos",
        "Integrações ERP/CRM complexas",
        "Consultoria C-Level",
        "Gestão multi-unidades",
        "Suporte dedicado 24/7",
        "Usuários ilimitados",
        "Desenvolvimentos customizados",
        "Consultoria estratégica semanal",
        "Treinamento completo da equipe",
        "SLA garantido de 99.9%"
      ],
      limitations: []
    }
  ];

  const addOns = [
    {
      name: "Módulo Drone Avançado",
      description: "Filmagens aéreas com equipamentos de cinema",
      price: 997,
      features: ["Drones RED 8K", "Certificação ANAC", "Edição cinematográfica"]
    },
    {
      name: "Automação Avançada",
      description: "Workflows complexos e integrações personalizadas",
      price: 1497,
      features: ["Automação customizada", "Integrações ERP", "Dashboards personalizados"]
    },
    {
      name: "Branding Completo",
      description: "Identidade visual e estratégia de posicionamento total",
      price: 2497,
      features: ["Identidade visual completa", "Manual de marca", "Estratégia de posicionamento"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6">
            Planos que{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Transformam Empresas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o pacote ideal para sua empresa do agronegócio ou setor industrial. 
            Todos incluem produção audiovisual profissional e estratégias de posicionamento.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center justify-center gap-4 bg-white p-2 rounded-xl shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-green-500 md:scale-105' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${plan.color}-100 rounded-xl text-${plan.color}-600 mb-4`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    R$ {billingCycle === 'yearly' ? 
                      (plan.yearlyPrice / 12).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : 
                      plan.monthlyPrice.toLocaleString('pt-BR')
                    }
                    <span className="text-lg text-gray-600 font-normal">/mês</span>
                  </div>
                  
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      Economize R$ {((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString('pt-BR')} por ano
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Começar Agora
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Módulos Adicionais
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {addon.name}
                </h4>
                
                <p className="text-gray-600 mb-4">
                  {addon.description}
                </p>
                
                <div className="text-2xl font-bold text-green-600 mb-4">
                  +R$ {addon.price}/mês
                </div>
                
                <div className="space-y-2 mb-6">
                  {addon.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300">
                  Adicionar ao Plano
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-4xl font-bold mb-4">
              Precisa de um Plano Personalizado?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Para operações com necessidades específicas, criamos soluções sob medida. 
              Fale com nossos especialistas e descubra como podemos ajudar sua fazenda a crescer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Falar com Especialista
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300">
                Agendar Demonstração
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
