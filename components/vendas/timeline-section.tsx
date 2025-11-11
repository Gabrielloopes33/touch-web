"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineSection() {
  const timeline = [
    {
      day: "DIA 1-2",
      title: "Reunião de Estratégia",
      description: "Analisamos seu negócio, entendemos as dores e definimos objetivos",
    },
    {
      day: "DIA 3-5",
      title: "Criação dos Anúncios e Automações",
      description: "Desenvolvemos estratégia de tráfego e programamos os fluxos de automação",
    },
    {
      day: "DIA 6-7",
      title: "Testes e Ajustes",
      description: "Testamos tudo, corrigimos detalhes, garantimos perfeição",
    },
    {
      day: "DIA 8",
      title: "LANÇAMENTO!",
      description: "Sistema no ar, trabalhando para você. Primeiros resultados aparecem aqui",
    },
    {
      day: "DIA 9-30",
      title: "Otimização Contínua",
      description: "Monitoramos, otimizamos, aumentamos resultados. Suporte 100% dedicado",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            O Que Acontece Depois Que Você Contrata?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Processo simples, rápido e transparente
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 md:left-1/2"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Circle */}
                <motion.div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-lg font-bold text-white shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {index + 1}
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-6 shadow-lg">
                    <span className="mb-2 inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">
                      {item.day}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
            Rápido, simples, sem complicação. Sem longos contratos de implementação.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
