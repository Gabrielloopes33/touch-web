'use client';

import { useSearchParams } from 'next/navigation';
import ClientAnalysis from '../../../components/ClientAnalysis';
import Link from 'next/link';
import { Suspense } from 'react';

function ClientPageContent() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('id');

  if (!clientId) {
    return (
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
    );
  }

  return (
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
  );
}

export default function ClientPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando análise do cliente...</p>
        </div>
      </div>
    }>
      <ClientPageContent />
    </Suspense>
  );
}
