"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FinalCtaSectionProps {
  onCtaClickAction: () => void;
}

export default function FinalCtaSection({ onCtaClickAction }: FinalCtaSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-20">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        style={{ scale }}
      >
        {/* Headline */}
        <motion.h2
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Sua Concorrência Está Se Movimentando{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Agora
          </span>
        </motion.h2>

        <motion.p
          className="mb-4 text-xl text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Enquanto você lê isso, seus concorrentes estão implementando automação.
        </motion.p>

        <motion.p
          className="mb-12 text-lg font-bold text-orange-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          A cada dia sem ela, você deixa na mesa 5-7 vendas que poderiam ser suas
        </motion.p>

        {/* Metrics */}
        <motion.div
          className="mb-12 grid gap-6 sm:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "⏰", label: "Implementação", value: "7 dias" },
            { icon: "📊", label: "Resultado esperado", value: "+30% conversão" },
            { icon: "🔒", label: "Risco", value: "0 (garantia 30 dias)" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="mb-2 text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {metric.icon}
              </motion.div>
              <p className="mb-1 text-sm font-semibold text-white/90">{metric.label}</p>
              <p className="text-lg font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={onCtaClickAction}
            className="mb-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-12 py-5 text-xl font-bold text-white shadow-2xl sm:w-auto"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(255, 107, 53, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 40px rgba(255, 107, 53, 0.4)",
                "0 15px 50px rgba(255, 107, 53, 0.6)",
                "0 10px 40px rgba(255, 107, 53, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            QUERO MEU DIAGNÓSTICO GRATUITO{" "}
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.p
            className="text-sm text-white/80"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Apenas 3 vagas este mês
          </motion.p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {["🔒 Dados protegidos com SSL", "⚡ Implementação em 7 dias", "🇧🇷 Atendimento 100% Brasil"].map((badge, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
