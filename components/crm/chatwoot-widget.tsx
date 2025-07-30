'use client';

import { useEffect } from 'react';
import { chatwootUtils } from '../../lib/chatwoot';

export default function ChatwootWidget() {
  useEffect(() => {
    // Verificar se já foi carregado
    if (window.chatwootSDK || window.$chatwoot) {
      console.log('Chatwoot já carregado');
      return;
    }

    console.log('Carregando Chatwoot...');
    
    // Carregar o script do Chatwoot
    const script = document.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = 'https://woot.agenciatouch.com.br/packs/js/sdk.js';
    
    script.onload = () => {
      console.log('Script do Chatwoot carregado');
      
      if (window.chatwootSDK) {
        console.log('Inicializando Chatwoot SDK...');
        window.chatwootSDK.run({
          websiteToken: 'CaEujnfHo4wx9znuFwP51LEJ',
          baseUrl: 'https://woot.agenciatouch.com.br'
        });
        
        // Verificar se foi inicializado após um delay
        setTimeout(() => {
          if (window.$chatwoot) {
            console.log('Chatwoot inicializado com sucesso!');
          } else {
            console.error('Chatwoot não foi inicializado corretamente');
          }
        }, 2000);
      } else {
        console.error('chatwootSDK não encontrado após carregamento do script');
      }
    };

    script.onerror = (error) => {
      console.error('Erro ao carregar script do Chatwoot:', error);
    };

    document.head.appendChild(script);

    // Cleanup function para remover o script quando o componente desmontar
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // O widget do Chatwoot se renderiza automaticamente
}
