"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={sectionRef}>
      <motion.div 
        className="mx-auto max-w-6xl px-4 sm:px-6"
        style={{ scale, opacity }}
      >
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
              Tráfego Pago + Automação Inteligente = Máquina de Vendas
            </h2>
          </motion.div>

          {/* 3 Pillars */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Pilar 1 - Atração */}
            <motion.div
              className="relative rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-8 shadow-xl"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 70px rgba(107, 77, 168, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="mb-6 flex justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </motion.div>
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white">
                ATRAÇÃO
              </h3>
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                  🚀 Tráfego Pago Estratégico
                </span>
              </div>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
                Trouxemos os clientes certos para você. Mas isso é só o começo.
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                Anúncios direcionados + público nichado + copy que converte = leads qualificados.
              </p>
            </motion.div>

            {/* Pilar 2 - Atendimento (DIFERENCIAL) */}
            <motion.div
              className="relative rounded-2xl border-2 border-purple-500 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-8 shadow-2xl"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 30px 80px rgba(107, 77, 168, 0.5)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Badge de destaque */}
              <motion.div 
                className="absolute -top-4 left-1/2 -translate-x-1/2"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 text-xs font-bold text-white shadow-lg">
                  ⭐ SEU DIFERENCIAL
                </span>
              </motion.div>
              <motion.div 
                className="mb-6 flex justify-center pt-4"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-900 shadow-lg">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </motion.div>
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white">
                ATENDIMENTO
              </h3>
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-purple-200 dark:bg-purple-800 px-4 py-1 text-sm font-semibold text-purple-900 dark:text-purple-100">
                  ⚡ Automação WhatsApp 24/7
                </span>
              </div>
              <p className="mb-4 text-center font-semibold text-gray-700 dark:text-gray-300">
                Todos os leads são atendidos em 10 segundos. Mesmo enquanto você dorme.
              </p>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Bot inteligente qualifica, tira dúvidas, envia proposta. Sua equipe só fala com quem está pronto pra comprar.
              </p>
            </motion.div>

            {/* Pilar 3 - Conversão */}
            <motion.div
              className="relative rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-8 shadow-xl"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 70px rgba(107, 77, 168, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="mb-6 flex justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </motion.div>
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white">
                CONVERSÃO
              </h3>
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                  💰 Follow-up Inteligente
                </span>
              </div>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
                Nenhum lead se perde no esquecimento. Sistema faz acompanhamento automático até a venda.
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                Integrado com seu CRM/planilhas = visão 360° do funil.
              </p>
            </motion.div>
          </div>

          {/* Diferencial destacado */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="rounded-2xl border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 text-center"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(107, 77, 168, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                <span className="text-purple-600 dark:text-purple-400">Usamos ferramentas </span>{" "}
                para criar automações 100% customizadas por até{" "}
                <motion.span 
                  className="text-2xl text-purple-600 dark:text-purple-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  70% menos
                </motion.span>{" "}
                que concorrentes.
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Sem templates genéricos. Sem compromissos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
