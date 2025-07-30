'use client';

import { useState, useEffect } from 'react';

const stats = [
  {
    number: "300%",
    label: "Aumento em Conversões",
    description: "Empresas que usam nosso CRM veem um aumento médio de 300% nas conversões de leads"
  },
  {
    number: "85%",
    label: "Redução no Tempo",
    description: "Menos tempo gasto em tarefas repetitivas, mais tempo para vender"
  },
  {
    number: "24h",
    label: "Implementação",
    description: "Sistema totalmente configurado e sua equipe produtiva em até de 24 horas"
  },
  {
    number: "+5000",
    label: "Empresas Ativas",
    description: "Milhares de empresas já transformaram seus resultados conosco"
  }
];

const testimonials = [
  {
    name: "Ana Costa",
    role: "Diretora de Operações",
    company: "HealthCare Solutions",
    avatar: "AC",
    content: "Adotar essa solução nos permitiu reduzir faltas em 30% e eliminar 20 horas semanais de trabalho administrativo.",
    rating: 5,
    highlight: "30% menos faltas"
  },
  {
    name: "Ricardo Alves",
    role: "CEO",
    company: "Growth Tech",
    avatar: "RA",
    content: "Automatizamos nosso atendimento 24/7 e vimos nossas taxas de conversão de leads subirem quase instantaneamente.",
    rating: 5,
    highlight: "Conversão instantânea"
  },
  {
    name: "Marina Costa",
    role: "Gerente Comercial",
    company: "Digital Sales",
    avatar: "MC",
    content: "A automação de follow-up é impressionante. Não perdemos mais nenhum lead e nossa taxa de conversão triplicou.",
    rating: 5,
    highlight: "3x mais conversões"
  }
];

export default function Results() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimatedStats(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resultados que
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Falam por Si
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Não é só mais um CRM. É a ferramenta que vai transformar seus resultados de forma mensurável e consistente.
          </p>
        </div>

        {/* Stats Grid */}
        <div id="stats-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-700 delay-${index * 200} ${
                animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-3">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              O que Nossos Clientes Dizem
            </h3>
            <p className="text-gray-600">
              Histórias reais de transformação e crescimento
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              {/* Highlight Badge */}
              <div className="flex justify-center mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {testimonials[currentTestimonial].highlight}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Transformar Seus Resultados?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 5.000 empresas que já escolheram o futuro das vendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                Começar Teste Grátis
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
