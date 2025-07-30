'use client';

import { useState } from 'react';

const plans = [
  {
    name: "Starter",
    price: "97",
    description: "Perfeito para pequenas empresas que estão começando",
    features: [
      "Até 1.000 contatos",
      "2 usuários inclusos",
      "Automações básicas",
      "Integração WhatsApp",
      "Relatórios essenciais",
      "Suporte por email"
    ],
    highlighted: false,
    cta: "Começar Agora"
  },
  {
    name: "Professional",
    price: "197",
    description: "Ideal para empresas em crescimento",
    features: [
      "Até 10.000 contatos",
      "10 usuários inclusos",
      "Automações avançadas",
      "Todas as integrações",
      "Relatórios completos",
      "Suporte prioritário",
      "API personalizada",
      "Treinamento incluído"
    ],
    highlighted: true,
    cta: "Mais Popular"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Para grandes empresas com necessidades específicas",
    features: [
      "Contatos ilimitados",
      "Usuários ilimitados",
      "Automações customizadas",
      "Integrações sob demanda",
      "Analytics avançado",
      "Suporte 24/7",
      "Customer Success dedicado",
      "Implementação assistida"
    ],
    highlighted: false,
    cta: "Falar com Vendas"
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Planos que Cabem no
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Seu Orçamento
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para sua empresa. Todos incluem 14 dias de teste grátis.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isAnnual 
                  ? 'bg-gray-900 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAnnual 
                  ? 'bg-gray-900 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                2 meses grátis
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                plan.highlighted 
                  ? 'border-purple-200 ring-2 ring-purple-500 ring-opacity-50' 
                  : 'border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {plan.price === 'Custom' ? (
                      <div className="text-4xl font-bold text-gray-900">
                        Sob Consulta
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          R$ {isAnnual ? Math.round(parseInt(plan.price) * 0.83) : plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /mês
                        </span>
                        {isAnnual && (
                          <div className="text-sm text-green-600 mt-1">
                            Economize R$ {Math.round(parseInt(plan.price) * 0.17 * 12)} por ano
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Garantia de 30 Dias
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Teste nossa plataforma sem riscos. Se não ficar 100% satisfeito, devolvemos seu dinheiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sem contrato de fidelidade
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancele quando quiser
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Suporte incluído
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
