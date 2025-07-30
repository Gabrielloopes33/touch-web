'use client';

// Utilitários para controlar o Chatwoot em qualquer lugar da aplicação

declare global {
  interface Window {
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
      toggle: (state?: 'open' | 'close') => void;
    };
    $chatwoot: {
      toggle: (state?: 'open' | 'close') => void;
      popoutChatWindow: () => void;
      setUser: (user: any) => void;
      setCustomAttributes: (attributes: any) => void;
    };
  }
}

export const chatwootUtils = {
  // Abrir o chat
  open: () => {
    if (typeof window !== 'undefined') {
      if (window.$chatwoot) {
        window.$chatwoot.toggle('open');
      } else if (window.chatwootSDK) {
        window.chatwootSDK.toggle('open');
      }
    }
  },

  // Fechar o chat
  close: () => {
    if (typeof window !== 'undefined') {
      if (window.$chatwoot) {
        window.$chatwoot.toggle('close');
      } else if (window.chatwootSDK) {
        window.chatwootSDK.toggle('close');
      }
    }
  },

  // Alternar o chat (abrir se fechado, fechar se aberto)
  toggle: () => {
    if (typeof window !== 'undefined') {
      if (window.$chatwoot) {
        window.$chatwoot.toggle();
      } else if (window.chatwootSDK) {
        window.chatwootSDK.toggle();
      }
    }
  },

  // Definir informações do usuário (útil para leads qualificados)
  setUser: (user: {
    identifier?: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar_url?: string;
  }) => {
    if (typeof window !== 'undefined' && window.$chatwoot) {
      window.$chatwoot.setUser(user);
    }
  },

  // Definir atributos customizados (útil para contexto de vendas)
  setCustomAttributes: (attributes: {
    plan_interest?: string;
    company_size?: string;
    current_crm?: string;
    lead_source?: string;
    [key: string]: any;
  }) => {
    if (typeof window !== 'undefined' && window.$chatwoot) {
      window.$chatwoot.setCustomAttributes(attributes);
    }
  },

  // Verificar se o Chatwoot está carregado
  isLoaded: () => {
    if (typeof window !== 'undefined') {
      return !!(window.$chatwoot || window.chatwootSDK);
    }
    return false;
  }
};

// Hook para usar o Chatwoot em componentes React
export const useChatwoot = () => {
  return chatwootUtils;
};
