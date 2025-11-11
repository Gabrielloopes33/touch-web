"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Meus clientes vão achar robô chato?",
      answer:
        "Nossos bots são customizados e conversam de forma natural. + 90% dos usuários nem percebem que é bot no início. E quando percebem, acham prático (resposta instantânea, horário flexível).",
    },
    {
      question: "E se meu negócio é diferente? Funciona?",
      answer:
        "Por isso fazemos diagnóstico gratuito PRIMEIRO. Mostramos exatamente como funciona para SEU negócio específico, com dados reais. Sem compromisso.",
    },
    {
      question: "Qual a diferença de outras agências de marketing?",
      answer:
        "Outras focam em TRÁFEGO (levar clique). Nós focamos em VENDAS (transformar clique em cliente). Integração completa = resultado completo.",
    },
    {
      question: "Quanto tempo leva pra começar a ver resultados?",
      answer:
        "Resultados iniciais em 7-14 dias (sistema no ar). Resultado completo em 30 dias (otimizações + dados). Garantia: se não ver ROI positivo em 30 dias, devolvemos.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Sim. Sem taxas de cancelamento. Mas recomendamos mínimo 30 dias (tempo pra otimizar tudo). 99% dos clientes viram resultado e ficam.",
    },
    {
      question: "É muito caro?",
      answer:
        "Custo-benefício incomparável. Compare: contratar 1 atendente (R$ 2.500 salário) + ferramenta cara (R$ 1.500/mês) = R$ 4.000. Nossa automação: começa em R$ 1.997 e atende infinito clientes, 24/7, sem limite.",
    },
    {
      question: "Precisa contratar dev para implementar?",
      answer:
        "Zero. Cuidamos de tudo. Você só aprova os fluxos e acompanha os resultados no dashboard.",
    },
    {
      question: "E se não gostar?",
      answer:
        "30 dias garantia. Não gostou? 100% de volta. Mas recomendo dar 30 dias completos pra ver tudo funcionando (quer dizer 1 mês de otimizações e dados).",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <motion.div 
            className="mx-auto max-w-3xl pb-12 text-center md:pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tudo o que você precisa saber antes de começar
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 40px rgba(107, 77, 168, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.button
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="pr-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <motion.svg
                    className="h-6 w-6 flex-shrink-0 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 dark:border-gray-700 p-6 pt-4">
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
