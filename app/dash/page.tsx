'use client';
import React from 'react';
import SpendChart from '@/components/charts/spend-chart';

export default function Dashboard() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Painel de Métricas</h1>
          </div>

          {/* Gráfico de Investimento */}
          <div className="max-w-4xl mx-auto">
            <SpendChart />
          </div>

        </div>
      </div>
    </section>
  );
}