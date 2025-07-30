'use client';

import { useEffect } from 'react';

export default function ChatwootSimple() {
  useEffect(() => {
    // Evitar carregamento duplo
    if ((window as any).chatwootInitialized) {
      console.log('Chatwoot já foi inicializado');
      return;
    }

    console.log('🚀 Inicializando Chatwoot...');

    // Marcar como inicializado para evitar duplicatas
    (window as any).chatwootInitialized = true;

    // Script direto como fornecido
    const script = `
      (function(d,t) {
        var BASE_URL="https://woot.agenciatouch.com.br";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          console.log('✅ Chatwoot SDK carregado');
          if (window.chatwootSDK) {
            window.chatwootSDK.run({
              websiteToken: 'FgrrbwaX1uct89YfJGw7asRR',
              baseUrl: BASE_URL
            });
            console.log('✅ Chatwoot inicializado');
            
            // Verificar se está funcionando após 3 segundos
            setTimeout(() => {
              if (window.$chatwoot) {
                console.log('✅ Chat widget pronto para uso!');
                // Adicionar evento global para debug
                window.openChatwoot = () => {
                  window.$chatwoot.toggle('open');
                };
              } else {
                console.error('❌ Widget não carregou corretamente');
              }
            }, 3000);
          } else {
            console.error('❌ chatwootSDK não encontrado');
          }
        };
        g.onerror = function(e) {
          console.error('❌ Erro ao carregar Chatwoot:', e);
        };
      })(document,"script");
    `;

    // Executar o script
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = script;
    document.head.appendChild(scriptElement);

    // Cleanup
    return () => {
      (window as any).chatwootInitialized = false;
    };
  }, []);

  return null;
}
