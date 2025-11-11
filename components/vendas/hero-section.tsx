"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  onCtaClickAction: () => void;
}

export default function HeroSection({ onCtaClickAction }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient para quando não houver vídeo */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900"></div>
        
        {/* Video placeholder - você pode adicionar um vídeo real aqui */}
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-purple-900/40"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-4 text-center"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-block rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-300 backdrop-blur-sm">
              ⚡ OFERTA EXCLUSIVA - APENAS 3 VAGAS
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aumente Suas Vendas
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              em 30 Dias
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mb-8 text-xl text-white/95 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          {/*  Ou devolvemos <span className="font-bold text-orange-400">100%</span> do seu investimento*/}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={onCtaClickAction}
              className="btn w-full bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-4 text-lg font-bold text-white shadow-2xl sm:w-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(255, 107, 53, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 40px rgba(255, 107, 53, 0.3)",
                  "0 15px 50px rgba(255, 107, 53, 0.5)",
                  "0 10px 40px rgba(255, 107, 53, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              QUERO COMEÇAR AGORA
            </motion.button>

            <motion.a
              href="https://api.whatsapp.com/send?phone=5531997153646&text=Quero%20saber%20mais%20sobre%20o%20pacote%20Growth!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
              whileHover={{ scale: 1.05 }}
            >
              ou fale no WhatsApp →
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Implementação em 7 dias
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Garantia 30 dias
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Sem compromisso
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/60">Role para baixo</span>
          <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
