"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const benefits = [
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "RESPOSTA INSTANTÂNEA",
      badge: "🟢 10 SEGUNDOS",
      description: "Seus leads são atendidos 24/7, mesmo feriado, mesmo 3h da manhã. Zero perda por demora.",
      metric: "Reduz abandono de lead em 60%",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "MAIS VENDAS",
      badge: "📈 +127%",
      description: "Clientes Touch aumentam conversão em média 127% em 30 dias (dados reais).",
      metric: "Combinação de tráfego qualificado + atendimento rápido + follow-up automático",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "ECONOMIA DE TEMPO",
      badge: "⏱️ -20h/SEMANA",
      description: "Sua equipe economiza até 20 horas semanais com respostas automáticas para FAQ.",
      metric: "Foco total em vendas complexas de alto valor",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "CUSTO REDUZIDO",
      badge: "💰 -70% vs Concorrentes",
      description: "Automações customizadas por até 70% menos que ferramentas prontas (que ainda são genéricas).",
      metric: "Nossa expertise em n8n = você paga por resultado, não por ferramenta cara",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "CONTROLE TOTAL",
      badge: "📊 DASHBOARD 360°",
      description: "Veja em tempo real: leads gerados, conversas, conversões, ROI, tendências.",
      metric: "Decisões baseadas em dados, não em achismo",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: "INTEGRAÇÃO COMPLETA",
      badge: "🔗 SEU SISTEMA",
      description: "Conectamos com seu CRM, planilhas, e-commerce, ou qualquer ferramenta que você usa.",
      metric: "Zero trabalho manual. Dados fluem automaticamente",
      color: "purple",
    },
  ];

  const colorClasses = {
    purple: {
      bg: "from-purple-500 to-purple-700",
      border: "border-purple-200 dark:border-purple-800",
      badgeBg: "bg-purple-100 dark:bg-purple-900/30",
      badgeText: "text-purple-700 dark:text-purple-300",
      metricBg: "bg-purple-50 dark:bg-purple-900/20",
      metricText: "text-purple-700 dark:text-purple-300",
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
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
              Benefícios Concretos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Resultados reais que impactam diretamente seu faturamento
            </p>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const colors = colorClasses[benefit.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={index}
                  className={`group relative rounded-2xl border ${colors.border} bg-white dark:bg-gray-800 p-6 shadow-lg`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 25px 70px rgba(107, 77, 168, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <motion.div 
                      className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${colors.bg} text-white shadow-lg`}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {benefit.icon}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-center text-lg font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  {/* Badge */}
                  <div className="mb-4 flex justify-center">
                    <motion.span 
                      className={`inline-block rounded-full ${colors.badgeBg} px-4 py-1 text-sm font-bold ${colors.badgeText}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {benefit.badge}
                    </motion.span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>

                  {/* Metric */}
                  <motion.div 
                    className={`rounded-lg ${colors.metricBg} p-3`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className={`text-center text-xs font-medium ${colors.metricText}`}>
                      {benefit.metric}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
