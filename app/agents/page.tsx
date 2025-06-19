'use client';

// Este componente Sidebar agora pode ser importado em qualquer página.
// Exemplo de uso em app/agents/page.tsx:
// import Sidebar from '../../components/agents/sidebar';
// ...
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '../../components/agents/sidebar';
import Agents from '../../components/agents/agents';

export default function AgentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar retrátil no mobile */}
      <div className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed z-50 top-0 left-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}>
        <Sidebar />
      </aside>
      {/* Botão de menu hamburguer no mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-base-100 shadow md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menu"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-center bg-base-200 min-w-0">
        <Agents />
      </main>
    </div>
  );
}
