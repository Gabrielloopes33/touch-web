'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Cpu, 
  BarChart3, 
  Zap, 
  Shield, 
  Tractor,
  Target,
  Palette 
} from 'lucide-react';

export default function AgroFeatures() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar cards sequencialmente
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const allFeatures = [
    // Audiovisual & Produção
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Produção Cinematográfica",
      description: "Filmagem em 4K/8K com drones profissionais, câmeras RED, equipamentos de cinema para documentários corporativos, institucionais e comerciais de alto impacto.",
      benefits: ["Qualidade cinematográfica", "Drones certificados ANAC", "Equipe especializada", "Entrega em 24-48h"],
      category: "Audiovisual",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cobertura de Eventos",
      description: "Documentação completa de eventos corporativos, feiras agropecuárias, inaugurações e cerimônias com transmissão ao vivo e edição profissional.",
      benefits: ["Transmissão ao vivo", "Multi-câmeras", "Edição em tempo real", "Cobertura 360°"],
      category: "Audiovisual",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Portfólio Visual Corporativo",
      description: "Criação de banco de imagens e vídeos exclusivos da sua empresa, produtos e processos para uso em marketing, redes sociais e apresentações institucionais.",
      benefits: ["Banco de conteúdo exclusivo", "Direitos de uso total", "Múltiplos formatos", "Atualizações periódicas"],
      category: "Audiovisual",
      gradient: "from-blue-500 to-blue-600"
    },
    // Automação & Integração
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Automação de Processos",
      description: "Criação de workflows automatizados para integrar sistemas internos, CRM, gestão de leads, follow-up de clientes e processos administrativos.",
      benefits: ["Redução de trabalho manual", "Integração de sistemas", "Aumento de produtividade", "Menos erros humanos"],
      category: "Automação",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dashboards Inteligentes",
      description: "Desenvolvimento de painéis personalizados que consolidam dados de vendas, produção, estoque e indicadores de performance em tempo real.",
      benefits: ["Visão unificada", "Dados em tempo real", "Relatórios automáticos", "Tomada de decisão ágil"],
      category: "Automação",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Tractor className="w-8 h-8" />,
      title: "Gestão de Relacionamento",
      description: "Automação completa do funil de vendas, desde captação de leads até pós-venda, com nurturing automatizado e gestão de pipeline comercial.",
      benefits: ["Pipeline organizado", "Follow-up automático", "Nutrição de leads", "Conversão otimizada"],
      category: "Automação",
      gradient: "from-green-500 to-emerald-600"
    },
    // Posicionamento & Branding
    {
      icon: <Target className="w-8 h-8" />,
      title: "Estratégia de Posicionamento",
      description: "Desenvolvimento de identidade visual, estratégia de comunicação e posicionamento de marca para destacar sua empresa como referência no setor.",
      benefits: ["Identidade única", "Diferenciação competitiva", "Presença marcante", "Reconhecimento de mercado"],
      category: "Posicionamento",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Presença Digital Estratégica",
      description: "Criação de sites institucionais, landing pages de alta conversão, estratégias de SEO e gestão de redes sociais corporativas.",
      benefits: ["Site responsivo", "SEO otimizado", "Conversão elevada", "Presença digital forte"],
      category: "Posicionamento",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Marketing de Conteúdo",
      description: "Produção de conteúdo técnico, cases de sucesso, whitepapers e materiais educativos que posicionam sua empresa como autoridade no mercado.",
      benefits: ["Autoridade de mercado", "Geração de leads", "Educação do mercado", "Credibilidade técnica"],
      category: "Posicionamento",
      gradient: "from-purple-500 to-purple-600"
    }
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

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .feature-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .feature-card {
            transform: translateY(20px);
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Serviços que{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Destacam sua Empresa
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Produção audiovisual cinematográfica, automação inteligente e estratégias de posicionamento 
              para agronegócio e indústria
            </p>
          </div>

          {/* Cards Grid - Always Visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:scale-[1.02] cursor-pointer"
              >
                {/* Category Badge */}
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-4 transition-colors duration-300 group-hover:bg-green-200">
                  {feature.category}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>

                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-px my-4 group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300" />

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-3">Benefícios:</h4>
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300"></div>
                      <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 md:mt-20 animate-slide-in">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                Pronto para Transformar sua Empresa?
              </h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Descubra como nossa produção audiovisual e automação podem aumentar sua visibilidade, 
                otimizar processos e posicionar sua marca como referência no mercado.
              </p>
              <button className="bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base">
                Solicitar Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
