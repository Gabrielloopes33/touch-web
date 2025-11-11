"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeadFormModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function LeadFormModal({ isOpen, onCloseAction }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    company: "",
    revenue: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de envio real
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      onCloseAction();
      setIsSubmitted(false);
      setFormData({ name: "", whatsapp: "", company: "", revenue: "", consent: false });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseAction}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onCloseAction}
              className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    Seu Diagnóstico Começa Aqui
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Preencha para agendar sua análise gratuita (sem compromisso)
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome completo"
                      className="w-full rounded-lg border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(XX) XXXXX-XXXX"
                      className="w-full rounded-lg border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                      Empresa
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nome da sua empresa"
                      className="w-full rounded-lg border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>

                  {/* Faturamento */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                      Faturamento Mensal Aprox.
                    </label>
                    <select
                      required
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full rounded-lg border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    >
                      <option value="">Selecione...</option>
                      <option value="0-10k">Até R$ 10 mil</option>
                      <option value="10-50k">R$ 10 a 50 mil</option>
                      <option value="50-200k">R$ 50 a 200 mil</option>
                      <option value="200-500k">R$ 200 a 500 mil</option>
                      <option value="500k+">Acima de R$ 500 mil</option>
                    </select>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-600/20"
                    />
                    <label htmlFor="consent" className="text-xs text-gray-600 dark:text-gray-400">
                      Quero receber atualizações por WhatsApp e email
                    </label>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 py-4 font-bold text-white shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    AGENDAR DIAGNÓSTICO GRATUITO
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                className="py-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="mb-6 text-6xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  ✅
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Ótimo!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Você será contatado em até 2 horas
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
