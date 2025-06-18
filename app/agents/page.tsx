'use client';

// Este componente Sidebar agora pode ser importado em qualquer página.
// Exemplo de uso em app/agents/page.tsx:
// import Sidebar from '../../components/agents/sidebar';
// ...
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/agents/sidebar';
import Agents from '../../components/agents/agents';

export default function AgentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center bg-base-200">
        <Agents />
      </main>
    </div>
  );
}
