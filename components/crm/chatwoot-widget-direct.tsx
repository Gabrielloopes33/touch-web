'use client';

import { useEffect } from 'react';

export default function ChatwootWidgetDirect() {
  useEffect(() => {
    // Método direto de integração do Chatwoot
    (function(d: Document, t: string) {
      const BASE_URL = "https://woot.agenciatouch.com.br";
      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
      
      g.onload = function() {
        console.log('Chatwoot script carregado com sucesso');
        
        if ((window as any).chatwootSDK) {
          console.log('Inicializando Chatwoot...');
          (window as any).chatwootSDK.run({
            websiteToken: 'CaEujnfHo4wx9znuFwP51LEJ',
            baseUrl: BASE_URL
          });
          
          // Log para debug
          setTimeout(() => {
            if ((window as any).$chatwoot) {
              console.log('✅ Chatwoot inicializado e pronto!');
            } else {
              console.error('❌ Erro na inicialização do Chatwoot');
            }
          }, 3000);
        } else {
          console.error('❌ chatwootSDK não encontrado');
        }
      };
      
      g.onerror = function(error) {
        console.error('❌ Erro ao carregar Chatwoot:', error);
      };
      
    })(document, "script");
  }, []);

  return null;
}
