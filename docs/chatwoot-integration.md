# Integração Chatwoot - Documentação

## ✅ Implementação Completa

A integração do Chatwoot foi implementada com sucesso na página CRM! Aqui está o que foi configurado:

### 🔧 **Componentes Criados:**

1. **`chatwoot-widget.tsx`** - Widget principal que carrega o script do Chatwoot
2. **`lib/chatwoot.ts`** - Utilitários para controlar o chat programaticamente
3. **Integração no Hero** - Botão "Ver Demo" abre o chat automaticamente

### 🎯 **Configuração Atual:**

- **Base URL**: `https://woot.agenciatouch.com.br`
- **Website Token**: `CaEujnfHo4wx9znuFwP51LEJ`
- **Carregamento**: Assíncrono e diferido para não impactar performance

### 💡 **Como Usar em Outros Componentes:**

```tsx
import { chatwootUtils } from '../../lib/chatwoot';

// Em qualquer botão ou ação
const handleOpenChat = () => {
  chatwootUtils.open();
};

// Para definir informações do usuário (leads qualificados)
const setUserInfo = () => {
  chatwootUtils.setUser({
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "+5511999999999"
  });
};

// Para adicionar contexto de vendas
const setLeadContext = () => {
  chatwootUtils.setCustomAttributes({
    plan_interest: "Professional",
    company_size: "50-100",
    current_crm: "Nenhum",
    lead_source: "Website CRM"
  });
};
```

### 🎨 **Exemplos de CTAs que Podem Abrir o Chat:**

```tsx
// Botão de contato
<button onClick={chatwootUtils.open}>
  Falar com Especialista
</button>

// CTA de demonstração
<button onClick={() => {
  chatwootUtils.setCustomAttributes({ interest: "demo" });
  chatwootUtils.open();
}}>
  Agendar Demonstração
</button>

// Suporte técnico
<button onClick={() => {
  chatwootUtils.setCustomAttributes({ type: "support" });
  chatwootUtils.open();
}}>
  Preciso de Ajuda
</button>
```

### 📱 **Funcionalidades Disponíveis:**

- ✅ **Chat em tempo real** com sua equipe
- ✅ **Histórico de conversas** persistido
- ✅ **Notificações** para novos agentes
- ✅ **Upload de arquivos** (imagens, documentos)
- ✅ **Emojis e reações**
- ✅ **Informações do usuário** automáticas
- ✅ **Atributos customizados** para contexto de vendas
- ✅ **Mobile responsivo**

### 🚀 **Fluxo de Vendas Otimizado:**

1. **Usuário clica em "Ver Demo"** → Chat abre automaticamente
2. **Agente recebe contexto** → Sabe que é interesse em demo
3. **Qualificação** → Coleta informações do lead
4. **Agendamento** → Marca demonstração diretamente no chat
5. **Follow-up** → Histórico completo da conversa

### 🔒 **Segurança e Privacidade:**

- ✅ **LGPD Compliant** - Dados tratados conforme regulamentação
- ✅ **Criptografia** - Mensagens criptografadas em trânsito
- ✅ **Controle de dados** - Usuário pode solicitar exclusão
- ✅ **Acesso controlado** - Apenas agentes autorizados

### 📊 **Métricas e Analytics:**

O Chatwoot oferece dashboard completo com:
- Tempo médio de resposta
- Satisfação do cliente
- Volume de conversas
- Taxa de resolução
- Conversões de chat para vendas

### 🎯 **Próximos Passos Recomendados:**

1. **Configurar agentes** no painel do Chatwoot
2. **Criar respostas prontas** para dúvidas comuns
3. **Configurar chatbot** para atendimento 24/7
4. **Integrar com CRM** para tracking de leads
5. **Treinar equipe** para conversão via chat

### 🛠 **Customizações Futuras:**

```tsx
// Tema personalizado
chatwootUtils.setCustomAttributes({
  theme: "dark",
  position: "left",
  show_on_pages: ["/crm", "/pricing"],
  auto_open_delay: 5000
});

// Triggers automáticos
useEffect(() => {
  const timer = setTimeout(() => {
    if (!localStorage.getItem('chat_shown')) {
      chatwootUtils.open();
      localStorage.setItem('chat_shown', 'true');
    }
  }, 30000); // Abre após 30s na primeira visita

  return () => clearTimeout(timer);
}, []);
```

O sistema está pronto para uso e pode ser facilmente expandido conforme suas necessidades de vendas!
