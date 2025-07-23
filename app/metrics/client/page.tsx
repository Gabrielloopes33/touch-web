'use client';

import { useSearchParams } from 'next/navigation';
import ClientAnalysis from '../../../components/ClientAnalysis';
import AuthGuard from '../../../components/AuthGuard';
import Link from 'next/link';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('id');

  if (!clientId) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Cliente não especificado</h1>
            <Link 
              href="/metrics" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div>
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <Link 
            href="/metrics" 
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
        <ClientAnalysis clientId={clientId} />
      </div>
    </AuthGuard>
  );
}
