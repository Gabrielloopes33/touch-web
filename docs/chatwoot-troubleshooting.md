# Diagnóstico Chatwoot - Checklist de Verificação

## 🔍 **Problemas Possíveis e Soluções**

### 1. **Verificar URL e Token**
- ✅ **Base URL**: `https://woot.agenciatouch.com.br`
- ✅ **Token**: `CaEujnfHo4wx9znuFwP51LEJ`

**Como testar:**
1. Acesse: `https://woot.agenciatouch.com.br/packs/js/sdk.js`
2. Deve retornar um arquivo JavaScript (não erro 404)

### 2. **Verificar no Console do Navegador**
Abra o DevTools (F12) e procure por:
- ✅ Logs de sucesso: "Chatwoot script carregado com sucesso"
- ❌ Erros de rede: "Failed to load resource"
- ❌ Erros de CORS: "Access-Control-Allow-Origin"

### 3. **Verificar Configuração no Painel Chatwoot**
No painel admin do Chatwoot:
- ✅ Website token correto
- ✅ Domínio autorizado (localhost, seu domínio)
- ✅ Widget habilitado
- ✅ Pelo menos um agente online

### 4. **Testar com Script Direto**
Cole no console do navegador:
```javascript
// Verificar se existe
console.log('$chatwoot:', window.$chatwoot);
console.log('chatwootSDK:', window.chatwootSDK);

// Tentar abrir manualmente
if (window.$chatwoot) {
  window.$chatwoot.toggle('open');
}
```

### 5. **Implementação Alternativa (HTML Puro)**
Se continuar com problemas, teste com HTML puro:

```html
<!-- Cole no final do body ou no head -->
<script>
  (function(d,t) {
    var BASE_URL="https://woot.agenciatouch.com.br";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      console.log('Script carregado!');
      window.chatwootSDK.run({
        websiteToken: 'CaEujnfHo4wx9znuFwP51LEJ',
        baseUrl: BASE_URL
      });
      
      // Testar após 3 segundos
      setTimeout(() => {
        console.log('$chatwoot disponível:', !!window.$chatwoot);
        if (window.$chatwoot) {
          window.$chatwoot.toggle('open');
        }
      }, 3000);
    }
  })(document,"script");
</script>
```

### 6. **Configurações Específicas**
Verifique se no painel Chatwoot:
- **Inbox Settings** → **Widget** → **Enabled**
- **Website URL** inclui seu domínio
- **Pre-chat form** não está bloqueando
- **Business hours** está configurado corretamente

### 7. **Problemas Comuns**

#### A) **CORS/Domínio**
- Adicione `localhost:3000` e seu domínio nas configurações
- Verifique se HTTPS está configurado corretamente

#### B) **Token Inválido**
- Regenere o token no painel
- Verifique se não há espaços ou caracteres especiais

#### C) **Agentes Offline**
- Pelo menos um agente deve estar online
- Verifique status no painel admin

#### D) **Cache do Navegador**
- Limpe cache e cookies
- Teste em aba anônima
- Teste em navegador diferente

### 8. **Debug Avançado**

Use o componente de debug que criei para monitorar:
```tsx
<ChatwootDebug />
```

Ele mostra em tempo real:
- Status do carregamento
- Logs de tentativas
- Botão de teste manual

### 9. **Teste Rápido**

1. **Abra a página `/crm`**
2. **Abra DevTools (F12)**
3. **Vá para Console**
4. **Procure pelos logs**:
   - "Carregando Chatwoot..."
   - "Script do Chatwoot carregado"
   - "Inicializando Chatwoot SDK..."
   - "✅ Chatwoot inicializado e pronto!"

5. **Se aparecer erro**, me mande o log exato

### 10. **Contato de Emergência**
Se nada funcionar, configure um fallback:
- WhatsApp direto
- Formulário de contato
- Email direto

**Próximo passo:** Execute os testes acima e me informe qual erro específico aparece no console!
