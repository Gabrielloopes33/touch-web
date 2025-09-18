/**
 * Script de teste da conexão PostgreSQL
 * Execute com: npm run test-db
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import db from '../lib/database';

async function testDatabase() {
  console.log('🧪 Testando conexão com PostgreSQL...\n');

  try {
    // 1. Testar conexão básica
    console.log('1️⃣ Testando conexão básica...');
    const isConnected = await db.testConnection();
    
    if (!isConnected) {
      throw new Error('Falha na conexão básica');
    }
    console.log('✅ Conexão básica funcionando!\n');

    // 2. Verificar se a tabela existe
    console.log('2️⃣ Verificando se a tabela metrics existe...');
    const tableCheck = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'metrics'
    `);
    
    if (tableCheck.rows.length === 0) {
      throw new Error('Tabela metrics não encontrada');
    }
    console.log('✅ Tabela metrics encontrada!\n');

    // 3. Contar registros
    console.log('3️⃣ Contando registros na tabela...');
    const countResult = await db.query('SELECT COUNT(*) as total FROM metrics');
    const totalRecords = countResult.rows[0].total;
    console.log(`📊 Total de registros: ${totalRecords}\n`);

    if (totalRecords > 0) {
      // 4. Mostrar amostra dos dados
      console.log('4️⃣ Mostrando amostra dos dados...');
      const sampleResult = await db.query('SELECT * FROM metrics LIMIT 3');
      console.log('📋 Primeiros 3 registros:');
      console.table(sampleResult.rows);

      // 5. Testar agregação (como na API)
      console.log('5️⃣ Testando agregação por cliente...');
      const aggregateResult = await db.query(`
        SELECT 
          client_id,
          COUNT(*) as records,
          SUM(spend) as total_spend,
          SUM(clicks) as total_clicks
        FROM metrics 
        GROUP BY client_id 
        ORDER BY total_spend DESC 
        LIMIT 3
      `);
      
      console.log('📈 Top 3 clientes por gasto:');
      console.table(aggregateResult.rows);
    }

    console.log('\n🎉 Todos os testes passaram! Sua migração está funcionando perfeitamente!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Acesse http://localhost:3000/metrics para ver o dashboard');
    console.log('2. Teste a API: http://localhost:3000/api/metrics/aggregated');
    console.log('3. Se quiser, execute: npm run migrate-data (para migrar do Google Sheets)');

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
    console.log('\n🔧 Possíveis soluções:');
    console.log('1. Verifique se as credenciais no .env.local estão corretas');
    console.log('2. Verifique se o PostgreSQL está rodando na VPS');
    console.log('3. Verifique se o firewall permite conexões na porta 5432');
    console.log('4. Execute o script SQL para criar a tabela se necessário');
  }
}

// Executar teste se arquivo for chamado diretamente
if (require.main === module) {
  testDatabase()
    .then(() => {
      console.log('\n✅ Teste finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Falha no teste:', error);
      process.exit(1);
    });
}

export default testDatabase;