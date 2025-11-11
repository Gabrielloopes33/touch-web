"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          style={{ scale, opacity }}
        >
          {/* Glow */}
          <motion.div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-purple-500 blur-3xl" />
          </motion.div>
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none opacity-10"
              src="/images/stripes.svg"
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <motion.h2 
              className="mb-4 border-y text-3xl font-bold text-gray-200 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Sua Concorrência Está Se Movimentando Agora
            </motion.h2>
            <motion.p 
              className="mb-8 text-lg text-gray-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Enquanto você lê isso, seus concorrentes estão implementando automação.<br className="hidden md:block" />
              A cada dia sem ela, você deixa na mesa 5-7 vendas que poderiam ser suas.
            </motion.p>
            
            {/* Metrics */}
            <motion.div 
              className="mb-8 flex flex-wrap justify-center gap-6 text-sm md:text-base"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="mx-auto max-w-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                className="btn group mb-4 block w-full bg-gradient-to-t from-purple-600 to-purple-500 bg-[length:100%_100%] bg-[bottom] py-4 text-center text-lg font-bold text-white shadow-xl"
                href="https://api.whatsapp.com/send?phone=5531997153646&text=Quero%20meu%20diagn%C3%B3stico%20gratuito!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(107, 77, 168, 0.6)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 40px rgba(107, 77, 168, 0.4)",
                    "0 15px 50px rgba(107, 77, 168, 0.6)",
                    "0 10px 40px rgba(107, 77, 168, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="relative inline-flex items-center">
                  QUERO MEU DIAGNÓSTICO AGORA{" "}
                  <motion.span 
                    className="ml-2 tracking-normal text-purple-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
              <motion.p 
                className="text-center text-sm text-gray-400"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Apenas 3 vagas este mês
              </motion.p>
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-400 md:text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
