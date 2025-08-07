'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Clock,
  Users,
  Award,
  Target,
  Zap
} from 'lucide-react';

export default function AgroResults() {
  const [progressValues, setProgressValues] = useState({
    productivity: 0,
    cost: 0,
    sustainability: 0,
    efficiency: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animar barras de progresso
            const timer = setTimeout(() => {
              setProgressValues({
                productivity: 85,
                cost: 40,
                sustainability: 92,
                efficiency: 78
              });
            }, 500);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "500+",
      label: "Vídeos Produzidos",
      description: "Conteúdo audiovisual profissional entregue para empresas do agronegócio e indústria",
      color: "green"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "10x",
      label: "Retorno no Investimento",
      description: "Aumento médio na visibilidade e geração de leads após implementação completa",
      color: "blue"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      value: "50+",
      label: "Empresas Atendidas",
      description: "Companhias do agronegócio e setor industrial com presença digital transformada",
      color: "emerald"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "24h",
      label: "Entrega Expressa",
      description: "Tempo médio para entrega de conteúdo audiovisual de alta qualidade",
      color: "orange"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendonça",
      role: "CEO - AgroVale Sementes",
      content: "A Touch revolucionou nossa comunicação visual. Os vídeos institucionais e a nova identidade digital nos posicionaram como referência no mercado. Nossa presença em feiras aumentou 300% após o trabalho deles.",
      results: ["↗ 300% presença em eventos", "↗ 10x leads qualificados", "↗ 250% reconhecimento marca"]
    },
    {
      name: "Patricia Silva",
      role: "Diretora de Marketing - Industria MetalAgro",
      content: "O portfólio audiovisual criado pela Touch transformou nossa forma de apresentar a empresa. Os vídeos com drone das nossas instalações e a automação do CRM geraram resultados incríveis em poucos meses.",
      results: ["↗ 400% conversão site", "↘ 60% tempo vendas", "↗ 8x engajamento social"]
    }
  ];

  const progressBars = [
    { label: "Aumento de Produtividade", value: progressValues.productivity, color: "bg-green-500" },
    { label: "Redução de Custos", value: progressValues.cost, color: "bg-blue-500" },
    { label: "Sustentabilidade", value: progressValues.sustainability, color: "bg-emerald-500" },
    { label: "Eficiência Operacional", value: progressValues.efficiency, color: "bg-orange-500" }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .animate-count-up {
          animation: countUp 0.6s ease-out forwards;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-delay-500 {
          animation-delay: 0.5s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

      <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Resultados que{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Comprovam a Excelência
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Números reais de empresas que transformaram sua presença digital e resultados comerciais 
              com nossos serviços audiovisuais e estratégias de posicionamento
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group hover:scale-105 animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-xl text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300 animate-count-up">
                  {stat.icon}
                </div>
                
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 animate-count-up animate-delay-200">
                  {stat.value}
                </div>
                
                <div className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                  {stat.label}
                </div>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {stat.description}
                </p>
              </div>
          ))}
        </div>

        {/* Progress Bars Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg mb-16 md:mb-20 animate-fade-in-up animate-delay-400">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Impacto Medido em Números
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {progressBars.map((bar, index) => (
              <div key={index} className="space-y-3 animate-slide-in-left" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 text-sm md:text-base">{bar.label}</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">{bar.value}%</span>
                </div>
                
                <div className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3">
                  <div
                    className={`${bar.color} h-full transition-all duration-[2000ms] ease-out rounded-full`}
                    style={{ width: `${isVisible ? bar.value : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-4xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center animate-fade-in-up animate-delay-500 py-10">
            Histórias de Sucesso
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
                style={{ animationDelay: `${0.7 + index * 0.2}s` }}
              >
                {/* Quote */}
                <div className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </div>
                
                {/* Results */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {testimonial.results.map((result, resultIndex) => (
                    <span 
                      key={resultIndex}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {result}
                    </span>
                  ))}
                </div>
                
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl">
                <Target className="w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-4xl font-bold mb-4">
              Seja o Próximo Case de Sucesso
            </h3>
            
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se aos produtores que já estão transformando suas operações 
              e alcançando resultados extraordinários com nossa tecnologia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Agendar Demonstração
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300">
                Baixar Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
