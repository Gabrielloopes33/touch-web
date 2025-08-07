'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Zap, Users } from 'lucide-react';

export default function AgroFAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'item-1',
      question: 'Como a IA funciona para agricultura de precisão?',
      answer: 'Nossa inteligência artificial analisa dados de múltiplas fontes: imagens de satélite, sensores IoT, dados meteorológicos e histórico de cultivo. Utilizamos algoritmos de machine learning para identificar padrões, prever problemas como pragas e doenças, otimizar irrigação e fertilização, e recomendar as melhores práticas para maximizar a produtividade da sua propriedade.'
    },
    {
      id: 'item-2',
      question: 'Quais tipos de culturas e propriedades vocês atendem?',
      answer: 'Atendemos todos os tipos de culturas: grãos (soja, milho, trigo), frutas, vegetais, pastagens, silvicultura e cultivos especiais. Nossas soluções são adaptáveis para propriedades de qualquer tamanho, desde pequenos produtores familiares até grandes operações comerciais e cooperativas. O sistema se adapta às características específicas de cada cultura e região.'
    },
    {
      id: 'item-3',
      question: 'Como funciona a integração com meus equipamentos existentes?',
      answer: 'Nossa plataforma é compatível com a maioria dos equipamentos agrícolas modernos através de APIs e protocolos padrão da indústria. Integramos com tratores autônomos, sistemas de irrigação, estações meteorológicas, drones, sensores de solo e equipamentos de pulverização. Nossa equipe técnica faz toda a configuração e treinamento necessário.'
    },
    {
      id: 'item-4',
      question: 'Que tipo de ROI posso esperar com a implementação?',
      answer: 'Nossos clientes relatam em média: 15-30% de aumento na produtividade, 20-40% de redução nos custos com insumos, 25-50% de economia no uso de água, e redução de 30-60% nas perdas por pragas e doenças. O ROI típico é alcançado entre 6-12 meses, dependendo do tamanho e tipo da operação.'
    },
    {
      id: 'item-5',
      question: 'Como vocês garantem a segurança dos meus dados agrícolas?',
      answer: 'Utilizamos criptografia de nível bancário (AES-256), servidores em nuvem certificados ISO 27001, backup automático em múltiplas regiões, e acesso restrito com autenticação multifator. Seus dados são sua propriedade e nunca são compartilhados com terceiros. Cumprimos todas as regulamentações de proteção de dados, incluindo LGPD.'
    },
    {
      id: 'item-6',
      question: 'Preciso de internet na fazenda para usar o sistema?',
      answer: 'O sistema funciona tanto online quanto offline. Dados são coletados localmente e sincronizados quando há conexão disponível. Para áreas com conectividade limitada, oferecemos soluções híbridas com sincronização via 4G/5G, internet via satélite ou redes mesh. A análise crítica pode ser feita localmente nos dispositivos.'
    },
    {
      id: 'item-7',
      question: 'Qual o suporte técnico disponível?',
      answer: 'Oferecemos suporte 24/7 via chat, telefone e WhatsApp. Temos agrônomos especialistas para consultoria técnica, técnicos para suporte em campo quando necessário, treinamento completo da equipe, e atualizações automáticas do sistema. Também fornecemos materiais educativos e webinars regulares sobre melhores práticas.'
    },
    {
      id: 'item-8',
      question: 'Como funciona o módulo de análise audiovisual?',
      answer: 'Utilizamos drones equipados com câmeras multiespectrais e RGB para captura aérea, processamento de imagens com IA para detectar anomalias, geração automática de mapas de índices vegetativos (NDVI, NDRE), identificação de áreas com estresse hídrico ou nutricional, e criação de relatórios visuais profissionais. As imagens são processadas e analisadas automaticamente, gerando insights acionáveis.'
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Segurança Garantida",
      description: "Seus dados protegidos com tecnologia de nível bancário"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Implementação Rápida",
      description: "Sistema funcionando em até 48 horas após contratação"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Suporte Especializado",
      description: "Agrônomos e técnicos dedicados ao seu sucesso"
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Treinamento Incluído",
      description: "Capacitação completa da sua equipe sem custo adicional"
    }
  ];

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6">
            Perguntas{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respondemos as principais dúvidas sobre nossa tecnologia para o agronegócio. 
            Não encontrou sua pergunta? Entre em contato conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id}>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 hover:border-green-300 transition-colors duration-300">
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="flex justify-between items-center w-full p-6 text-left group"
                    >
                      <span className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 group-hover:text-green-600 transition-all duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <div className="pt-2 border-t border-gray-200">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Por que Escolher a Touch?
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-green-200">
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Falar com Especialista
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4">
                Ainda tem dúvidas?
              </h4>
              <p className="text-gray-600 mb-4 text-sm">
                Nossa equipe de especialistas está pronta para responder suas perguntas específicas.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Resposta em até 2 horas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Consultoria agronômica gratuita</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Demonstração personalizada</span>
                </div>
              </div>
              <button className="w-full mt-4 border-2 border-green-500 text-green-600 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors duration-300">
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
