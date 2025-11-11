"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StickyHeaderProps {
  onCtaClickAction: () => void;
}

export default function StickyHeader({ onCtaClickAction }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-[70px] items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-full.svg"
                  width={80}
                  height={24}
                  alt="Touch Logo"
                  priority
                  className="w-16 md:w-20"
                />
              </Link>

              {/* Center - Badge Desktop */}
              <div className="hidden md:block">
                <motion.span
                  className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📦 Pacote GROWTH
                </motion.span>
              </div>

              {/* Right - Badge + CTA */}
              <div className="flex items-center gap-3">
                <motion.span
                  className="hidden sm:inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡ 3 Vagas Restantes
                </motion.span>
                <motion.button
                  onClick={onCtaClickAction}
                  className="btn bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 text-sm font-bold text-white shadow-lg hover:shadow-xl sm:px-6 sm:py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GARANTIR VAGA
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
