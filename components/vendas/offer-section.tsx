"use client";

import React from "react";
import { motion } from "framer-motion";

interface OfferSectionProps {
  onCtaClickAction: () => void;
}

export default function OfferSection({ onCtaClickAction }: OfferSectionProps) {
  const valueItems = [
    { text: "Auditoria Completa", price: "R$ 1.500" },
    { text: "Estratégia de Tráfego Personalizada", price: "R$ 1.500" },
    { text: "Automação WhatsApp Sob Medida", price: "R$ 3.000" },
    { text: "Integração com Seus Sistemas", price: "R$ 2.000" },
    { text: "Chatbot com IA Generativa", price: "R$ 2.500" },
    { text: "Dashboard em Tempo Real", price: "R$ 1.200" },
    { text: "Suporte Priority 30 Dias", price: "R$ 1.800" },
  ];

  const bonusItems = [
    { text: "3 Criativos Profissionais para Anúncios", value: "R$ 900" },
    { text: "Script Completo de Vendas para WhatsApp", value: "R$ 600" },
    { text: "Treinamento Equipe Online", value: "R$ 1.200" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 py-20">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚡ OFERTA EXCLUSIVA
          </motion.span>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            APENAS 3 VAGAS NESTE MÊS
          </h2>
          <p className="text-lg text-white/90">
            Veja exatamente o que você vai receber:
          </p>
        </motion.div>

        {/* Pricing comparison */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Total Value */}
          <motion.div
            className="rounded-2xl border-2 border-white/20 bg-white/10 p-8 backdrop-blur-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-bold text-white">VALOR TOTAL</h3>
            
            <div className="space-y-4">
              {valueItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">{item.text}</span>
                  </div>
                  <span className="text-sm text-white/70">({item.price})</span>
                </motion.div>
              ))}
            </div>

            <div className="my-6 h-px bg-white/30"></div>

            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-3xl font-bold text-yellow-400">
                VALOR TOTAL: R$ 13.500
              </p>
            </motion.div>
          </motion.div>

          {/* Right - You Pay */}
          <motion.div
            className="relative rounded-2xl border-2 border-orange-400 bg-gradient-to-br from-orange-500/90 to-orange-600/90 p-8 backdrop-blur-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Savings badge */}
            <motion.div
              className="absolute -top-4 right-6 rounded-full bg-yellow-400 px-6 py-2 text-sm font-bold text-purple-900 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ECONOMIA: 70%
            </motion.div>

            <h3 className="mb-8 text-2xl font-bold text-white">VOCÊ PAGA</h3>

            {/* Payment options */}
            <div className="space-y-4">
              <motion.div
                className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-2 text-sm font-semibold text-white">Parcelado em 12x</p>
                <p className="text-4xl font-bold text-yellow-400">R$ 447</p>
                <p className="mt-1 text-sm text-white/80">por mês (sem juros)</p>
              </motion.div>

              <motion.div
                className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-2 text-sm font-semibold text-white">À Vista</p>
                <p className="text-4xl font-bold text-yellow-400">R$ 4.970</p>
                <p className="mt-1 text-sm text-white/80">economia de R$ 368</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onCtaClickAction}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-bold text-purple-900 shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 215, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 40px rgba(255, 215, 0, 0.3)",
                  "0 15px 50px rgba(255, 215, 0, 0.5)",
                  "0 10px 40px rgba(255, 215, 0, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SIM, QUERO ESSE PACOTE
            </motion.button>
          </motion.div>
        </div>

        {/* Bonus section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-2xl font-bold text-yellow-400">
            + BÔNUS EXCLUSIVOS
          </h3>
          <div className="mx-auto max-w-2xl space-y-3">
            {bonusItems.map((bonus, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <span className="text-white">{bonus.text}</span>
                </div>
                <span className="text-sm text-white/70">(Valor: {bonus.value})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
