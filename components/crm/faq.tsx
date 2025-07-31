'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "Como funciona o período de teste gratuito?",
    answer: "Oferecemos 14 dias de teste gratuito com acesso completo a todas as funcionalidades. Não é necessário cartão de crédito para começar. Nossa equipe te ajuda na configuração inicial para você aproveitar ao máximo o período de teste."
  },
  {
    question: "O CRM integra com as ferramentas que já uso?",
    answer: "Sim! Temos integrações nativas com mais de 50 ferramentas, incluindo WhatsApp Business, Instagram, Facebook, Gmail, Outlook, Zapier, RD Station, HubSpot e muito mais. Nossa API também permite integrações customizadas."
  },
  {
    question: "Quanto tempo leva para implementar o sistema?",
    answer: "A implementação básica leva menos de 24 horas. Nossa equipe de sucesso do cliente te acompanha durante todo o processo, desde a migração de dados até o treinamento da sua equipe. Em uma semana, sua empresa estará 100% operacional."
  },
  {
    question: "O sistema é seguro? Meus dados estão protegidos?",
    answer: "Absolutamente. Utilizamos criptografia de nível bancário, backup automático em múltiplas localizações e conformidade total com a LGPD. Nossos servidores são hospedados na AWS com certificação ISO 27001."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. Seus dados ficam disponíveis por 90 dias após o cancelamento, caso você queira reativar ou fazer o download."
  },
  {
    question: "Vocês oferecem treinamento para minha equipe?",
    answer: "Sim! Incluímos treinamento completo para sua equipe, webinars de onboarding, documentação detalhada e suporte via chat, email e telefone. Também temos uma universidade online gratuita com cursos sobre vendas e CRM."
  },
  {
    question: "O que acontece se eu precisar de mais funcionalidades?",
    answer: "Nosso CRM cresce junto com sua empresa. Oferecemos diferentes planos e funcionalidades adicionais que podem ser ativadas conforme sua necessidade. Nossa equipe te ajuda a escolher sempre a melhor opção."
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte 24/7 via chat e email. Para planos premium, incluímos suporte por telefone e um Customer Success Manager dedicado. Nosso tempo médio de resposta é de menos de 2 horas."
  }
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
            Perguntas
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa saber sobre nossa plataforma. Não encontrou sua resposta? Fale conosco!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 transition-transform duration-300 ${
                  openFAQ === index ? 'rotate-180' : 'rotate-0'
                }`}>
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe de especialistas está pronta para te ajudar com qualquer pergunta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20', '_blank')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Falar via WhatsApp
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
