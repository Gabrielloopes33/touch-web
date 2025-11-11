"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <section className="bg-white dark:bg-gray-900" ref={sectionRef}>
      <motion.div 
        className="mx-auto max-w-6xl px-4 sm:px-6"
        style={{ opacity }}
      >
        <div className="py-12 md:py-20">
          {/* Section header */}
          <motion.div 
            className="mx-auto max-w-3xl pb-12 text-center md:pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl mb-4">
              Você Está Deixando Dinheiro Na Mesa
            </h2>
          </motion.div>

          {/* 3 Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 - Demora */}
            <motion.div
              className="relative rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-6 shadow-lg"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 60px rgba(107, 77, 168, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <svg
                    className="h-8 w-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900 dark:text-white">
                Seu Lead Clica às 22h
                <br />
                Você Só Vê Amanhã
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Enquanto você dorme, seus leads estão acordados procurando soluções.
              </p>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  <span className="font-bold">Resultado:</span> Ele compra do concorrente que responde mais rápido.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Perda de Leads */}
            <motion.div
              className="relative rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-6 shadow-lg"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 60px rgba(107, 77, 168, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <svg
                    className="h-8 w-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900 dark:text-white">
                100 Cliques = 8 Vendas
                <br />
                92% dos Interessados Somem
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                A maioria dos seus investimentos em tráfego está indo pelo ralo.
              </p>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  <span className="font-bold">Resultado:</span> R$ 1.380 em anúncios por venda (quando deveria ser R$ 150).
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Equipe Sobrecarregada */}
            <motion.div
              className="relative rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-6 shadow-lg"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 60px rgba(107, 77, 168, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <svg
                    className="h-8 w-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900 dark:text-white">
                FAQ Repetitivo + Respostas Ruins
                <br />
                Equipe Não Foca em Vendas
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Seu time gasta horas respondendo as mesmas perguntas básicas.
              </p>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  <span className="font-bold">Resultado:</span> Produtividade cai, qualidade cai, vendas caem.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Closing text */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              A matemática é simples: seu concorrente está respondendo{" "}
              <span className="text-purple-600 dark:text-purple-400">AGORA</span> enquanto você está vendo isso.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
