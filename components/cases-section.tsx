"use client";

import React from "react";
import Image from "next/image";

export default function CasesSection() {
  const cases = [
    {
      name: "Maria Silva",
      role: "Loja Feminina",
      image: "/images/avatar-01.jpg",
      before: "23 vendas/mês",
      after: "71 vendas/mês",
      growth: "+209%",
      testimonial:
        "Em 45 dias os números explodiram. O WhatsApp responde na hora, meus clientes estão mais felizes, e minha equipe só fala com gente pronta pra comprar. Melhor investimento que fiz.",
      secondaryMetric: "Tempo médio até compra: 4 horas → 23 minutos",
      color: "purple",
    },
    {
      name: "Dr. João",
      role: "Clínica Centro",
      image: "/images/avatar-02.jpg",
      before: "60% de desistência em agendamento",
      after: "91% confirmação com presença",
      growth: "+65% em faturamento",
      testimonial:
        "Antes perdia a maioria dos agendamentos. Hoje o bot confirma, envia lembrete 24h antes, e a taxa de comparecimento subiu drasticamente. Mais ainda: o bot vende produtos upsell durante o atendimento automatizado.",
      secondaryMetric: "Economizou 18h/semana + equipe 40% mais produtiva",
      color: "blue",
    },
    {
      name: "Pedro",
      role: "Distribuidora MG",
      image: "/images/avatar-03.jpg",
      before: "~150 pedidos manuais/mês",
      after: "+220 pedidos automatizados/mês",
      growth: "+47% em volume + 0% de erros",
      testimonial:
        "Clientes fazem pedidos repetitivos direto pelo bot. Não tem mais erro de digitação, não tem confusão de quantidade, tudo automático. Sistema se pagou na primeira semana.",
      secondaryMetric: "Ticket médio subiu 43% + operação 100% sem erros",
      color: "green",
    },
  ];

  const colorClasses = {
    purple: {
      border: "border-purple-300 dark:border-purple-700",
      bg: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      badge: "bg-purple-600 dark:bg-purple-700",
      accent: "text-purple-600 dark:text-purple-400",
    },
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      bg: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      badge: "bg-blue-600 dark:bg-blue-700",
      accent: "text-blue-600 dark:text-blue-400",
    },
    green: {
      border: "border-green-300 dark:border-green-700",
      bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      badge: "bg-green-600 dark:bg-green-700",
      accent: "text-green-600 dark:text-green-400",
    },
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Cases de Sucesso
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Resultados reais de clientes que transformaram seus negócios com a Touch
            </p>
          </div>

          {/* Cases */}
          <div className="space-y-8">
            {cases.map((caseItem, index) => {
              const colors = colorClasses[caseItem.color as keyof typeof colorClasses];
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-6 shadow-xl transition-all hover:shadow-2xl md:p-8`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Left - Profile & Numbers */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                      <div className="mb-4">
                        <Image
                          className="rounded-full border-4 border-white shadow-lg"
                          src={caseItem.image}
                          width={80}
                          height={80}
                          alt={caseItem.name}
                        />
                      </div>
                      <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                        {caseItem.name}
                      </h3>
                      <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {caseItem.role}
                      </p>

                      {/* Numbers */}
                      <div className="w-full space-y-3">
                        <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-3">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">ANTES</p>
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {caseItem.before}
                          </p>
                        </div>
                        <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-3">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">DEPOIS</p>
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {caseItem.after}
                          </p>
                        </div>
                        <div className={`rounded-lg ${colors.badge} p-3 text-center`}>
                          <p className="text-xs font-semibold text-white/90">CRESCIMENTO</p>
                          <p className="text-2xl font-bold text-white">{caseItem.growth}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right - Testimonial */}
                    <div className="md:col-span-2">
                      <div className="relative">
                        {/* Quote icon */}
                        <svg
                          className="absolute -left-2 -top-2 h-8 w-8 text-gray-300 dark:text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>

                        {/* Testimonial text */}
                        <blockquote className="relative pl-6">
                          <p className="mb-4 text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                            {caseItem.testimonial}
                          </p>
                        </blockquote>

                        {/* Secondary metric */}
                        <div className="mt-6 rounded-xl border-l-4 border-gray-400 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 p-4">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span className={`${colors.accent} font-bold`}>Métrica adicional:</span>{" "}
                            {caseItem.secondaryMetric}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA after cases */}
          <div className="mt-12 text-center" data-aos="fade-up">
            <p className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
              Quer resultados como esses no seu negócio?
            </p>
            <a
              className="btn group inline-flex items-center bg-gradient-to-t from-purple-600 to-purple-500 px-8 py-3 text-white shadow-lg hover:shadow-xl"
              href="https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20e%20quero%20saber%20mais%20sobre%20os%20casos%20de%20sucesso!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative inline-flex items-center">
                Agendar Diagnóstico Gratuito
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
