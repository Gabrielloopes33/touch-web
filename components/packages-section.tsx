"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PackagesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
              Escolha Seu Plano
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Soluções personalizadas para cada etapa do seu negócio
            </p>
          </motion.div>

          {/* Packages grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Package 1 - Starter */}
            <motion.div
              className="relative rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Starter</h3>
              <p className="mb-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                Tráfego + Resposta Automática
              </p>

              {/* Price */}
              <div className="mb-6">
                <motion.span 
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  R$ 1.997
                </motion.span>
                <span className="text-gray-600 dark:text-gray-400">/mês</span>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">ou 12x R$ 199</p>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {[
                  "Gestão de Tráfego Pago (Meta Ads)",
                  "Automação WhatsApp Básica (FAQ, Horário, Qualificação Simples)",
                  "Dashboard com Métricas Principais",
                  "Suporte por Chat (48h resposta)"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      className="mr-2 h-6 w-6 flex-shrink-0 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Ideal for */}
              <div className="mb-6 rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">IDEAL PARA:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pequenas empresas, 50-200 atendimentos/mês, começando a escalar
                </p>
              </div>

              {/* CTA */}
              <motion.a
                className="btn block w-full bg-gray-900 text-center text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                href="https://api.whatsapp.com/send?phone=5531997153646&text=Quero%20saber%20mais%20sobre%20o%20plano%20Starter!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
              </motion.a>
            </motion.div>

            {/* Package 2 - Growth (POPULAR) */}
            <motion.div
              className="relative rounded-2xl border-2 border-purple-500 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-8 shadow-2xl"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -20,
                scale: 1.05,
                boxShadow: "0 30px 80px rgba(107, 77, 168, 0.5)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Popular badge */}
              <motion.div 
                className="absolute -top-5 left-1/2 -translate-x-1/2"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 text-sm font-bold text-white shadow-lg">
                  ⭐ MAIS POPULAR
                </span>
              </motion.div>

              <h3 className="mb-2 mt-4 text-2xl font-bold text-gray-900 dark:text-white">Growth</h3>
              <p className="mb-6 text-sm font-medium text-purple-700 dark:text-purple-400">
                Conversão Acelerada (RECOMENDADO)
              </p>

              {/* Price */}
              <div className="mb-6">
                <motion.span 
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  R$ 4.497
                </motion.span>
                <span className="text-gray-600 dark:text-gray-400">/mês</span>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">ou 12x R$ 449</p>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {[
                  "Tudo do Starter +",
                  "Tráfego Multicanal (Meta + Google Ads)",
                  "Automação Completa (Atendimento + Qualificação Avançada + Vendas)",
                  "Integração com CRM/Planilhas",
                  "Chatbot com IA Básica (respostas mais naturais)",
                  "Relatórios Semanais Automáticos",
                  "Reunião Mensal de Estratégia",
                  "Suporte Priority (24h resposta)"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      className="mr-2 h-6 w-6 flex-shrink-0 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Ideal for */}
              <div className="mb-6 rounded-lg bg-purple-100 dark:bg-purple-900/30 p-4">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-300">IDEAL PARA:</p>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  Empresas em crescimento, 200-1.000 atendimentos/mês, querem máquina completa
                </p>
                <p className="mt-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                  "Onde 80% dos nossos clientes estão"
                </p>
              </div>

              {/* CTA */}
              <motion.a
                className="btn block w-full bg-gradient-to-r from-purple-600 to-purple-800 text-center text-white shadow-lg hover:shadow-xl"
                href="https://api.whatsapp.com/send?phone=5531997153646&text=Quero%20escalar%20com%20o%20plano%20Growth!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Escalar com Growth
              </motion.a>
            </motion.div>

            {/* Package 3 - Enterprise */}
            <motion.div
              className="relative rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Enterprise</h3>
              <p className="mb-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                Máquina de Vendas Completa
              </p>

              {/* Price */}
              <div className="mb-6">
                <motion.span 
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  R$ 9.997
                </motion.span>
                <span className="text-gray-600 dark:text-gray-400">/mês+</span>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">ou sob consulta</p>
              </div>

              {/* Features - só as 10 primeiras visíveis */}
              <ul className="mb-8 space-y-3">
                {[
                  "Tudo do Growth +",
                  "IA Generativa para Atendimento (respostas 100% naturais)",
                  "Social Media Estratégica Integrada",
                  "Site / Landing Pages Profissionais",
                  "Produção de Audiovisual (anúncios, fotos, vídeos)",
                  "SEO + Analytics Avançado",
                  "Integrações Complexas (ERP, E-commerce, Múltiplos CRMs)",
                  "A/B Testing Contínuo",
                  "Consultoria Estratégica Semanal",
                  "Suporte VIP (resposta 6h)"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      className="mr-2 h-6 w-6 flex-shrink-0 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Ideal for */}
              <div className="mb-6 rounded-lg bg-purple-100 dark:bg-purple-900/30 p-4">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-300">IDEAL PARA:</p>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  Empresas consolidadas, 1.000+ atendimentos/mês, querem tudo sob 1 agência
                </p>
                <p className="mt-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                  "Parceiro digital completo"
                </p>
              </div>

              {/* CTA */}
              <motion.a
                className="btn block w-full bg-purple-600 text-center text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                href="https://api.whatsapp.com/send?phone=5531997153646&text=Quero%20falar%20com%20um%20especialista%20sobre%20o%20plano%20Enterprise!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Falar com Especialista
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
