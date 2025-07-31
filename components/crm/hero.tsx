'use client';

import { useState, useEffect } from 'react';
import { chatwootUtils } from '../../lib/chatwoot';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-24">
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm text-white">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>CRM Inteligente • Sempre Ativo</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block">Nunca Mais</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Perca um Compromisso
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-300 leading-relaxed mb-6">
            Transforme cada lead em oportunidade com um CRM que pensa por você.
          </p>

          {/* Texto de apoio */}
          <p className="max-w-4xl mx-auto text-lg text-gray-400 leading-relaxed">
            Imagine acordar e encontrar sua agenda completa, sem vazios e sem ligações perdidas. 
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20', '_blank')}
              className="group relative inline-flex items-center justify-center px-6 py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10">Quero Agendar Minha Demonstração</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button 
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20', '_blank')}
              className="inline-flex items-center justify-center px-6 py-4 text-base sm:text-lg font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver Demo
            </button>
          </div>

          {/* Stats/Social Proof */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-gray-400">Taxa de Conversão</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Acompanhamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">+5000</div>
              <div className="text-sm text-gray-400">Empresas Confiam</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-400 rounded-full animate-bounce animation-delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-2000"></div>
      <div className="absolute bottom-40 right-10 w-5 h-5 bg-yellow-400 rounded-full animate-bounce animation-delay-3000"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
