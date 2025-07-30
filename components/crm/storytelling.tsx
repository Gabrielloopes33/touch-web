'use client';

import { useState, useEffect } from 'react';

const challenges = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Agendamentos quebrados",
    description: "Processos manuais geram falhas e retrabalho constante."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Falta de visão única",
    description: "Sistemas fragmentados escondem o histórico completo do cliente."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Taxa de no-show elevada",
    description: "Até 30% das agendas ficam em branco, impactando receita e produtividade."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lead scoring ineficaz",
    description: "Sem inteligência preditiva, leads quentes esfriam antes de serem trabalhados."
  }
];

const solutions = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Visão 360° do Cliente",
    description: "Todos os históricos e interações num painel único — sem silos de informação.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Chatbot Proativo 24/7",
    description: "Qualifique leads e responda dúvidas automaticamente, mantendo o funil sempre ativo.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Agendamento Inteligente",
    description: "Sugestão automática de horários, convites e confirmações com um clique.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-.707.707a1 1 0 101.414 1.414L5.5 6.5H9V7H5.5a2 2 0 00-1.414.586l-.707.707a1 1 0 101.414 1.414L6.207 8.293A2 2 0 015.5 8H9v1H5.5a1 1 0 00-.707.293l-.707.707a1 1 0 101.414 1.414L6.914 9.5H9v1H6.914l1.414 1.414a1 1 0 101.414-1.414L8.328 9.086A1 1 0 019 9h5v6l5-5h-5z" />
      </svg>
    ),
    title: "Lembretes Automatizados",
    description: "Mensagens, e-mail e notificações reduzem cancelamentos em até 40%.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Insights Preditivos",
    description: "Dashboards em tempo real apontam leads com maior probabilidade de conversão.",
    gradient: "from-indigo-500 to-purple-500"
  }
];

export default function StorytellingAndSolution() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.solution-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Storytelling Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            A Realidade de Quem
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gerencia Relacionamentos
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              No início de cada dia, gestores se veem afogados em tarefas manuais: retornando e-mails, confirmando agendamentos por telefone e reconciliando dados espalhados em diversos sistemas.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Essa fragmentação não só consome horas de trabalho, mas também cria ruídos que afastam potenciais clientes no momento decisivo. A chave para reconquistar esse tempo e atenção está em uma narrativa clara, focada em benefícios tangíveis.
            </p>
          </div>
        </div>

        {/* Challenges Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Desafios que Você Enfrenta
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm hover:bg-red-900/30 transition-all duration-300"
              >
                <div className="text-red-400 mb-4">
                  {challenge.icon}
                </div>
                <h4 className="text-white font-semibold mb-3">
                  {challenge.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossa Solução
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Única
              </span>
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unimos IA conversacional, automação de fluxo de trabalho e agendamento inteligente em uma só plataforma, eliminando trocas de sistema e fricções no atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                data-index={index}
                className={`solution-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-700 transform ${
                  visibleCards.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${solution.gradient} mb-6`}>
                  <div className="text-white">
                    {solution.icon}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4">
                  {solution.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed">
                  {solution.description}
                </p>

                {/* Decorative element */}
                <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${solution.gradient} rounded-full opacity-60`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Eliminar Esses Desafios?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Veja como nossa solução transforma cada um desses problemas em oportunidades de crescimento.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              Ver Demonstração Completa
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
