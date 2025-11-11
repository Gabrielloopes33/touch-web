"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const steps = [
    {
      number: "1",
      title: "Ele Vê Seu Anúncio e Clica",
      description: "Tráfego pago estratégico leva o cliente certo pra você",
    },
    {
      number: "2",
      title: "Recebe Resposta Instantânea no WhatsApp",
      description: "Bot responde em 10 segundos, 24/7, mesmo quando você dorme",
    },
    {
      number: "3",
      title: "Bot Qualifica e Tira Dúvidas",
      description: "Sistema inteligente faz perguntas, envia proposta, identifica comprador",
    },
    {
      number: "4",
      title: "Venda Fechada Ou Lead Quente",
      description: "Você só recebe quem está PRONTO pra comprar. Sua equipe só vende",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Como Funciona na Prática
            </h3>
            
            <motion.div
              className="group relative aspect-video overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <Image
                src="/images/1embraflex-chat.png"
                alt="Sistema de automação WhatsApp em ação"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Optional badge/label */}
              <div className="absolute bottom-4 left-4 right-4">
                <motion.div
                  className="rounded-lg bg-purple-600/90 px-4 py-2 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm font-semibold text-white">
                    ⚡ Atendimento automático 24/7 via WhatsApp
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-300">
                💡 Veja exatamente como transformamos cliques em vendas automáticas
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              É Assim Que Seu Cliente Compra de Você
            </h3>

            <div className="relative space-y-6">
              {/* Connecting line */}
              <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500 to-purple-300 dark:from-purple-600 dark:to-purple-800"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Number badge */}
                  <motion.div
                    className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-lg font-bold text-white shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex-1 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-5 shadow-md"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
