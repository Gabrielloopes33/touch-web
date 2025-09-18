# Migração de Google Sheets para PostgreSQL - Guia Completo

## 📋 Resumo da Migração

Este documento descreve a migração completa dos dados de métricas do Google Sheets para um banco PostgreSQL na VPS.

## 🚀 O que foi implementado

### 1. ✅ Dependências Instaladas
- `pg`: Driver PostgreSQL para Node.js
- `@types/pg`: Tipos TypeScript para PostgreSQL
- `tsx`: Para executar scripts TypeScript

### 2. ✅ Configuração do Banco
- Arquivo SQL para criar tabela: `scripts/create_metrics_table.sql`
- Variáveis de ambiente adicionadas no `.env.local`
- Biblioteca de conexão: `lib/database.ts`

### 3. ✅ Scripts de Migração
- Script de migração de dados: `scripts/migrate-data.ts`
- Comando npm adicionado: `npm run migrate-data`

### 4. ✅ APIs Atualizadas
Todas as rotas da API foram migradas para PostgreSQL:
- `/api/metrics` - API principal com paginação
- `/api/metrics/aggregated` - Dados agregados por cliente
- `/api/metrics/client` - Detalhes específicos do cliente
- `/api/metrics/campaigns` - Comparação de campanhas

## 🔧 Como configurar

### Passo 1: Configurar PostgreSQL na VPS
Execute o script SQL na sua VPS PostgreSQL:
```sql
-- Conecte no seu PostgreSQL e execute:
\i scripts/create_metrics_table.sql
```

### Passo 2: Configurar variáveis de ambiente
Edite o arquivo `.env.local` com as credenciais da sua VPS:
```env
POSTGRES_HOST=seu_host_vps
POSTGRES_PORT=5432
POSTGRES_DATABASE=seu_banco
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
```

### Passo 3: Migrar dados (opcional)
Se quiser migrar dados existentes do Google Sheets:
```bash
npm run migrate-data
```

### Passo 4: Testar a aplicação
```bash
npm run dev
```

Acesse `/metrics` e verifique se os dados estão sendo carregados.

## 📊 Estrutura da Tabela PostgreSQL

A tabela `metrics` contém os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| client_id | VARCHAR(255) | ID do cliente |
| campaign_id | VARCHAR(255) | ID da campanha |
| ad_id | VARCHAR(255) | ID do anúncio |
| reach | BIGINT | Alcance |
| impressions | BIGINT | Impressões |
| clicks | BIGINT | Cliques |
| spend | DECIMAL(10,2) | Gasto em reais |
| ctr_click | DECIMAL(5,2) | CTR do click (%) |
| cpc | DECIMAL(8,2) | CPC em reais |
| cvr | DECIMAL(5,2) | Taxa de conversão (%) |
| cpl | DECIMAL(8,2) | Custo por lead |
| frequency | DECIMAL(5,2) | Frequência média |
| roas | DECIMAL(8,2) | Return on Ad Spend |
| quality_score | INTEGER | Índice de qualidade (0-10) |
| date_recorded | DATE | Data do registro |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 🔄 Como adicionar novos dados

### Opção 1: Via API (recomendado)
Crie uma rota POST em `/api/metrics` para inserir novos dados.

### Opção 2: Via SQL direto
```sql
INSERT INTO metrics (
    client_id, campaign_id, ad_id, reach, impressions, 
    clicks, spend, ctr_click, cpc, date_recorded
) VALUES (
    'cliente1', 'campanha1', 'anuncio1', 1000, 5000, 
    250, 150.00, 5.0, 0.60, '2024-01-15'
);
```

### Opção 3: Via script de importação
Modifique o script `scripts/migrate-data.ts` para importar de outras fontes.

## 🛠️ Troubleshooting

### Erro de conexão PostgreSQL
1. Verifique se as credenciais estão corretas no `.env.local`
2. Verifique se o PostgreSQL está rodando na VPS
3. Verifique se o firewall permite conexões na porta 5432

### Dados não aparecem no dashboard
1. Verifique se a tabela tem dados: `SELECT COUNT(*) FROM metrics;`
2. Verifique os logs do console no navegador
3. Verifique os logs do servidor Next.js

### Performance lenta
1. Execute os comandos de índices do script SQL
2. Considere adicionar mais índices se necessário
3. Use paginação nas queries

## 🔒 Segurança

- As credenciais do banco estão no `.env.local` (não commitado)
- Use SSL em produção (configurado automaticamente)
- Considere criar um usuário específico para a aplicação
- Faça backup regular dos dados

## 📈 Próximos passos

1. **Automação**: Criar job para importar dados automaticamente
2. **Monitoramento**: Adicionar logs e métricas de performance
3. **Backup**: Configurar backup automático
4. **Cache**: Implementar cache Redis para queries frequentes
5. **API de inserção**: Criar endpoints para adicionar novos dados

## 🆘 Suporte

Se houver problemas:
1. Verifique os logs: `npm run dev` e observe o console
2. Teste a conexão com o banco: A API `/api/metrics/aggregated` deve retornar dados
3. Verifique se todos os arquivos foram criados corretamente
4. Execute o script de migração se necessário: `npm run migrate-data`

---

✅ **Migração concluída!** Seu sistema agora usa PostgreSQL ao invés do Google Sheets.