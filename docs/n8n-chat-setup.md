# Fluxo N8N para Chat com IA - Instruções de Configuração

## Como configurar o fluxo no N8N:

### 1. Webhook Node (Trigger)
- **Método HTTP**: POST
- **Path**: `/webhook/chat`
- **Authentication**: Basic Auth
- **Response Mode**: Respond to Webhook

### 2. Function Node (Processamento)
```javascript
// Extrair dados da requisição
const { message, conversationId, timestamp } = $input.all()[0].json.body;

// Log para debug
console.log('Mensagem recebida:', message);
console.log('ID da conversa:', conversationId);

// Preparar contexto para a IA
const context = {
  userMessage: message,
  conversationId: conversationId,
  timestamp: timestamp,
  context: "Você é um assistente de CRM especializado em ajudar potenciais clientes. Seja amigável, profissional e sempre tente direcionar para uma demonstração ou teste grátis. Responda em português brasileiro."
};

return [{ json: context }];
```

### 3. HTTP Request Node (IA)
**Para OpenAI:**
- **URL**: `https://api.openai.com/v1/chat/completions`
- **Method**: POST
- **Headers**: 
  - `Authorization`: `Bearer YOUR_OPENAI_API_KEY`
  - `Content-Type`: `application/json`
- **Body**:
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "{{ $node['Function'].json.context }}"
    },
    {
      "role": "user", 
      "content": "{{ $node['Function'].json.userMessage }}"
    }
  ],
  "max_tokens": 300,
  "temperature": 0.7
}
```

**Para Groq (alternativa gratuita):**
- **URL**: `https://api.groq.com/openai/v1/chat/completions`
- **Headers**:
  - `Authorization`: `Bearer YOUR_GROQ_API_KEY`
  - `Content-Type`: `application/json`
- **Body**: (mesmo formato do OpenAI)

### 4. Function Node (Resposta)
```javascript
// Extrair resposta da IA
const aiResponse = $input.all()[0].json;
let responseMessage = "Desculpe, não consegui processar sua mensagem.";

if (aiResponse.choices && aiResponse.choices.length > 0) {
  responseMessage = aiResponse.choices[0].message.content;
}

// Preparar resposta final
const response = {
  response: responseMessage,
  conversationId: $node['Function'].json.conversationId,
  timestamp: new Date().toISOString(),
  success: true
};

return [{ json: response }];
```

### 5. Respond to Webhook Node
- **Response Body**: `{{ $json }}`
- **Response Code**: 200

## Variáveis de Ambiente necessárias:

```env
# No seu .env.local
N8N_CHAT_WEBHOOK_URL=https://seu-n8n.com/webhook/chat
N8N_BASE_URL=https://seu-n8n.com
N8N_BASIC_USER=seu_usuario
N8N_BASIC_PASS=sua_senha

# API Keys (escolha uma)
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
```

## Exemplo de Prompts para diferentes cenários:

### Prompt Geral:
```
Você é um assistente especializado em CRM da empresa. Seu objetivo é:
1. Responder dúvidas sobre funcionalidades
2. Explicar benefícios do sistema
3. Direcionar para demonstração ou teste grátis
4. Ser sempre amigável e profissional
5. Usar português brasileiro

Se perguntarem sobre preços, mencione que temos planos a partir de R$ 97/mês.
Se quiserem testar, ofereça o teste grátis de 14 dias.
```

### Para Qualificação de Leads:
```
Além de responder as dúvidas, tente descobrir:
- Tamanho da empresa
- Quantos funcionários
- Qual sistema usam hoje
- Principal dor relacionada a vendas/agendamentos

Use essas informações para personalizar suas respostas.
```

## Testando o Chat:

1. Configure o fluxo no N8N
2. Atualize as variáveis de ambiente
3. Acesse a página /crm
4. Clique no botão de chat flutuante
5. Teste com perguntas como:
   - "Como funciona o CRM?"
   - "Qual o preço?"
   - "Posso testar grátis?"

O chat salvará automaticamente o histórico da conversa e manterá o contexto durante a sessão.
