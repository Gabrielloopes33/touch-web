'use client';

import { useState, useEffect } from 'react';
import { 
  Tractor, 
  Sprout, 
  BarChart3, 
  Camera, 
  Brain, 
  Palette,
  Play,
  ChevronRight
} from 'lucide-react';

export default function AgroHero() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Audiovisual Profissional",
      description: "Drones, câmeras 4K e produção cinematográfica"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Automação Inteligente",
      description: "Workflows automatizados e integração de sistemas"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Posicionamento Estratégico",
      description: "Branding e presença digital de alto impacto"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>

      <section className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 animate-bounce animate-delay-200">
            <Tractor className="w-24 md:w-32 h-24 md:h-32 text-green-300" />
          </div>
          <div className="absolute top-40 right-20 animate-pulse animate-delay-400">
            <Sprout className="w-20 md:w-24 h-20 md:h-24 text-green-400" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-bounce animate-delay-600">
            <BarChart3 className="w-24 md:w-28 h-24 md:h-28 text-green-300" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="text-white animate-slide-in-left">
              <h1 className="text-5xl sm:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight py-10">
                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent animate-fade-in-up">
                  Agro & Indústria
                </span>{' '}
                <span className="text-white animate-fade-in-up animate-delay-200">
                  Conectados
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl mb-6 md:mb-8 text-green-100 leading-relaxed animate-fade-in-up animate-delay-400">
                Eleve seu posicionamento no mercado com{' '}
                <span className="text-green-300 font-semibold">produção audiovisual cinematográfica</span>,{' '}
                <span className="text-green-300 font-semibold">automação inteligente</span> e{' '}
                <span className="text-green-300 font-semibold">estratégias de branding</span> que transformam sua empresa em referência do setor.
              </p>

              {/* Rotating Features */}
              <div className="mb-6 md:mb-8 h-16 md:h-20 animate-fade-in-up animate-delay-600">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-green-400/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-green-400 animate-float">
                    {features[currentFeature].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{features[currentFeature].title}</h3>
                    <p className="text-green-200 text-sm md:text-base">{features[currentFeature].description}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-800">
                <button className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base">
                  Começar Agora
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  Ver Demo
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-slide-in-right">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-float">
                {/* Audiovisual Preview */}
                <div className="aspect-video bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-xl mb-6 flex items-center justify-center border border-green-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-12 md:w-16 h-12 md:h-16 text-green-300" />
                    <span className="text-green-300 text-xs md:text-sm font-semibold">PRODUÇÃO 4K</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white/10 rounded-lg p-3 md:p-4 border border-green-400/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-xl md:text-2xl font-bold text-green-400">500+</div>
                    <div className="text-xs md:text-sm text-green-200">Vídeos Produzidos</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 md:p-4 border border-green-400/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-xl md:text-2xl font-bold text-green-400">50+</div>
                    <div className="text-xs md:text-sm text-green-200">Empresas Atendidas</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 md:p-4 border border-green-400/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-xl md:text-2xl font-bold text-green-400">10x</div>
                    <div className="text-xs md:text-sm text-green-200">Mais Visibilidade</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 md:p-4 border border-green-400/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-xl md:text-2xl font-bold text-green-400">24h</div>
                    <div className="text-xs md:text-sm text-green-200">Entrega Rápida</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3 shadow-lg animate-bounce animate-delay-400">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 rounded-full p-3 shadow-lg animate-pulse animate-delay-600">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
        </div>
      </div>
    </section>
    </>
  );
}
