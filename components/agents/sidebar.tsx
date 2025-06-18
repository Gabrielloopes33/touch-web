'use client';

// Este componente Sidebar agora pode ser importado em qualquer página.
// Exemplo de uso em app/agents/page.tsx:
// import Sidebar from '../../components/agents/sidebar';
// ...
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agents',    label: 'Agentes'    },
  { href: '/projects',  label: 'Projetos'  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-base-100 flex flex-col shadow-lg z-10 py-20">
      <div className="p-4">
        <span className="text-2xl font-bold">Touch Agents</span>
      </div>

      <nav className="flex-1 flex flex-col gap-4 px-4">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base justify-start ${
                active ? 'btn-primary text-black' : 'btn-outline btn-primary bg-white hover:bg-black hover:text-white border-2 border-primary'
              }`}
              style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)' }}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 flex items-center gap-3">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
            <span>H</span>
          </div>
        </div>
        <span className="font-medium">Habio</span>
      </div>
    </aside>
  );
}
