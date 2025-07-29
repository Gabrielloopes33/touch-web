'use client';

import { useState, useEffect } from 'react';

// Hook personalizado para buscar os dados do cliente da API
export function useClientData(clientId: string, startDate?: string, endDate?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Construir URL com parâmetros de data se fornecidos
        let url = `/api/metrics/client?client_id=${encodeURIComponent(clientId)}`;
        
        if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
        if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
        
        // Chamada à API
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar dados: ${response.status} ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId, startDate, endDate]);

  return { data, loading, error };
}

// Hook personalizado para formatar valores numéricos
export function useFormatter() {
  return {
    formatNumber: (value: number): string => {
      return new Intl.NumberFormat('pt-BR').format(value);
    },
    
    formatCurrency: (value: number): string => {
      return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL'
      }).format(value);
    },
    
    formatPercentage: (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value / 100);
    }
  };
}
