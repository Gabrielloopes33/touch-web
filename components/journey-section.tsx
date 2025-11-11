"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section className="bg-white dark:bg-gray-900" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
              Do Clique À Venda em 3-8 Minutos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Veja como transformamos cada clique em uma oportunidade real de venda
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - background */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2"></div>
            {/* Vertical line - animated */}
            <motion.div 
              className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 md:left-1/2"
              style={{ height: lineHeight }}
            ></motion.div>

            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <motion.div 
                className="relative flex items-start md:items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div className="ml-8 md:ml-0 md:w-5/12">
                  <motion.div 
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg md:ml-auto"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      1. Cliente vê seu anúncio
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Anúncio estratégico + público certo = alta qualidade de clique
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                className="relative flex items-start md:items-center"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 md:order-2">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                    whileHover={{ scale: 1.2, rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div className="ml-8 md:ml-0 md:w-5/12 md:order-1">
                  <motion.div 
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg"
                    whileHover={{ scale: 1.05, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      2. Clica e vai direto ao WhatsApp
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Deep link direto (sem intermediários)
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                className="relative flex items-start md:items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
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
                  </motion.div>
                </div>
                <div className="ml-8 md:ml-0 md:w-5/12">
                  <motion.div 
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg md:ml-auto"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      3. Resposta instantânea (Bot)
                    </h3>
                    <p className="mb-2 text-gray-600 dark:text-gray-400">
                      "Oi! Tudo bem? Somos a [Marca]. Como posso ajudar?"
                    </p>
                    <span className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                      ⚡ 10 segundos de resposta
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                className="relative flex items-start md:items-center"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 md:order-2">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                    whileHover={{ scale: 1.2, rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
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
                  </motion.div>
                </div>
                <div className="ml-8 md:ml-0 md:w-5/12 md:order-1">
                  <motion.div 
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg"
                    whileHover={{ scale: 1.05, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      4. Bot qualifica e tira dúvidas
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>✓ Faz 5-7 perguntas automáticas</li>
                      <li>✓ Identifica se é realmente um comprador</li>
                      <li>✓ Envia proposta/catálogo/condições</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                className="relative flex items-start md:items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div className="ml-8 md:ml-0 md:w-5/12">
                  <motion.div 
                    className="rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 shadow-lg md:ml-auto"
                    whileHover={{ scale: 1.05, x: 10, boxShadow: "0 20px 60px rgba(107, 77, 168, 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      5. Lead quente vai para sua equipe
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>✓ Se pronto: sua equipe fecha</li>
                      <li>✓ Se dúvida: bot encaminha humano</li>
                      <li>✓ Se futuro: entra em follow-up automático</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Results */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="rounded-2xl border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 dark:from-purple-900/20 dark:via-purple-800/20 dark:to-purple-900/20 p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Resultado Visual
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  className="rounded-xl bg-gray-100 dark:bg-gray-800 p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ">ANTES</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-300">100 leads → 8 vendas</p>
                  <p className="text-xl text-gray-600 dark:text-gray-400">(8%)</p>
                </motion.div>
                <motion.div 
                  className="rounded-xl bg-purple-100 dark:bg-purple-900/30 p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-2 text-sm font-semibold text-purple-700 dark:text-purple-400">DEPOIS</p>
                  <motion.p 
                    className="text-3xl font-bold text-purple-800 dark:text-purple-300"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    100 leads → 34 vendas
                  </motion.p>
                  <p className="text-xl text-purple-600 dark:text-purple-400">(34%)</p>
                  <p className="mt-2 text-sm text-purple-700 dark:text-purple-400">+ 50 leads quentes prontos pra equipe</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
