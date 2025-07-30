'use client';

import { useState, useEffect } from 'react';

const steps = [
  {
    number: "01",
    title: "Integração Rápida",
    description: "Após a reunião de Briefing, em até 24h sua plataforma está funcionando.",
    details: "Nossa integração é pré configurada com Google Calendar, Whatsapp e muitas outras ferramentas.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  {
    number: "02",
    title: "Automação Sem Esforço",
    description: "Defina fluxos e deixe a IA orquestrar confirmações e follow-ups.",
    details: "Configuramos nossa IA para cuidar de tudo: desde o primeiro contato até o pós-venda.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Acompanhamento Personalizado",
    description: "Mensagens adaptadas ao perfil de cada lead, aumentando a taxa de resposta.",
    details: "IA analisa o comportamento e histórico para criar mensagens que realmente convertem.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  }
];

const benefits = [
  {
    stat: "40%",
    label: "Redução em faltas",
    description: "com lembretes automatizados",
    source: "mConsent"
  },
  {
    stat: "20h",
    label: "Economia semanal",
    description: "ao remover tarefas manuais",
    source: "MGMA"
  },
  {
    stat: "300%",
    label: "Aumento eficiência",
    description: "operacional comprovado",
    source: "Estudo Interno"
  },
  {
    stat: "∞",
    label: "Melhoria experiência",
    description: "do cliente e fidelização",
    source: "Customer Success"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('how-it-works');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Como
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em apenas 3 passos simples, transforme completamente sua gestão de relacionamento com clientes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                activeStep === index
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl scale-105'
                  : 'bg-gray-50 border border-gray-200 hover:shadow-lg'
              }`}
              onClick={() => setActiveStep(index)}
            >
              {/* Step Number */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 ${
                activeStep === index
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-300'
              }`}>
                <span className="text-xl font-bold">{step.number}</span>
              </div>

              {/* Icon */}
              <div className={`mb-6 transition-colors duration-300 ${
                activeStep === index ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                activeStep === index ? 'text-purple-700' : 'text-gray-900'
              }`}>
                {step.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {step.description}
              </p>

              <p className={`text-sm transition-all duration-300 ${
                activeStep === index 
                  ? 'text-purple-600 opacity-100 max-h-20' 
                  : 'text-gray-500 opacity-70 max-h-0 overflow-hidden'
              }`}>
                {step.details}
              </p>

              {/* Active Indicator */}
              {activeStep === index && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              )}

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Benefícios Comprovados
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-purple-100 transform transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {benefit.stat}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.label}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {benefit.description}
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  Fonte: {benefit.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para Começar sua Transformação?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Implemente em minutos e veja resultados desde o primeiro dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                Começar Implementação
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
