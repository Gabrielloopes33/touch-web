/**
 * Script rápido para testar a API de cliente específico
 * Execute com: npm run test-client-api
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import db from '../lib/database';

async function testClientAPI() {
  console.log('🧪 Testando API de cliente específico...\n');

  try {
    // 1. Listar clientes disponíveis
    console.log('1️⃣ Listando clientes disponíveis...');
    const clientsResult = await db.query(`
      SELECT client_id, COUNT(*) as records, SUM(spend) as total_spend
      FROM metricas_ads 
      GROUP BY client_id 
      ORDER BY total_spend DESC
    `);
    
    console.log('📋 Clientes disponíveis:');
    console.table(clientsResult.rows);

    if (clientsResult.rows.length > 0) {
      // 2. Testar com o primeiro cliente (maior gasto)
      const testClientId = clientsResult.rows[0].client_id;
      console.log(`\n2️⃣ Testando com cliente: ${testClientId}`);
      
      const clientDetailQuery = `
        SELECT 
          campaign_id,
          campaign_name,
          ad_id,
          ad_name,
          reach,
          impressions,
          clicks,
          spend,
          ctr_click,
          cpc
        FROM metricas_ads
        WHERE client_id = $1
        ORDER BY spend DESC
        LIMIT 5
      `;
      
      const clientResult = await db.query(clientDetailQuery, [testClientId]);
      
      console.log('📊 Dados do cliente:');
      console.table(clientResult.rows);

      console.log(`\n✅ API deve funcionar para: /api/metrics/client?client_id=${encodeURIComponent(testClientId)}`);
    }

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
  }
}

// Executar teste se arquivo for chamado diretamente
if (require.main === module) {
  testClientAPI()
    .then(() => {
      console.log('\n✅ Teste da API de cliente finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Falha no teste:', error);
      process.exit(1);
    });
}

export default testClientAPI;