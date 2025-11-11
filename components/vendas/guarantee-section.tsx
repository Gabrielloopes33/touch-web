"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GuaranteeSection() {
  const guarantees = [
    {
      icon: "📈",
      title: "+25% de Conversão",
      description: "Ou devolvemos 100% do seu investimento",
    },
    {
      icon: "⏱️",
      title: "-15h Semanais",
      description: "Sua equipe economiza 15 horas semanais ou devolvemos",
    },
    {
      icon: "💰",
      title: "ROI Positivo",
      description: "Lucro nos primeiros 30 dias ou 100% de volta",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Garantia Blindada de 30 Dias
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Seu risco é zero. Nosso compromisso é total.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              className="rounded-2xl border-2 border-purple-500 dark:border-purple-600 bg-white dark:bg-gray-800 p-8 text-center shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0 25px 70px rgba(107, 77, 168, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="mb-4 text-6xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {guarantee.icon}
              </motion.div>
              <h3 className="mb-3 text-2xl font-bold text-purple-700 dark:text-purple-400">
                {guarantee.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            <p>Implemente nosso sistema completo. Use por 30 dias.</p>
            
            <p className="text-sm">Sem perguntas. Sem enrolação. Sem letra miúda.</p>
            <motion.p
              className="mt-6 text-lg font-semibold text-purple-700 dark:text-purple-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Por quê podemos garantir isso? Porque já implementamos em +47 empresas e TODAS tiveram resultado.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
