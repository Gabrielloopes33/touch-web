/**
 * Script para testar a tabela metricas_ads existente
 * Execute com: npm run test-metricas
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import db from '../lib/database';

async function testMetricasAds() {
  console.log('🎯 Testando tabela metricas_ads...\n');

  try {
    // 1. Testar conexão
    console.log('1️⃣ Testando conexão...');
    const isConnected = await db.testConnection();
    if (!isConnected) {
      throw new Error('Falha na conexão');
    }
    console.log('✅ Conexão OK!\n');

    // 2. Verificar se a tabela metricas_ads existe
    console.log('2️⃣ Verificando tabela metricas_ads...');
    const tableCheck = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'metricas_ads'
    `);
    
    if (tableCheck.rows.length === 0) {
      throw new Error('Tabela metricas_ads não encontrada');
    }
    console.log('✅ Tabela metricas_ads encontrada!\n');

    // 3. Listar colunas da tabela
    console.log('3️⃣ Listando colunas da tabela...');
    const columnsResult = await db.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'metricas_ads'
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Colunas da tabela metricas_ads:');
    console.table(columnsResult.rows);

    // 4. Contar registros
    console.log('4️⃣ Contando registros...');
    const countResult = await db.query('SELECT COUNT(*) as total FROM metricas_ads');
    const totalRecords = countResult.rows[0].total;
    console.log(`📊 Total de registros: ${totalRecords}\n`);

    if (totalRecords > 0) {
      // 5. Mostrar amostra dos dados
      console.log('5️⃣ Mostrando amostra dos dados...');
      const sampleResult = await db.query('SELECT * FROM metricas_ads LIMIT 3');
      console.log('📋 Primeiros 3 registros:');
      console.table(sampleResult.rows);

      // 6. Verificar quais colunas existem para mapear corretamente
      console.log('6️⃣ Verificando estrutura dos dados...');
      if (sampleResult.rows.length > 0) {
        const firstRow = sampleResult.rows[0];
        console.log('🔍 Colunas disponíveis nos dados:');
        Object.keys(firstRow).forEach((key, index) => {
          console.log(`   ${index + 1}. ${key} = ${firstRow[key]}`);
        });
      }

      // 7. Testar agrupamento por cliente se a coluna existir
      console.log('\n7️⃣ Testando agrupamento por cliente...');
      const clientColumns = columnsResult.rows.map(r => r.column_name);
      const clientIdColumn = clientColumns.find(col => 
        col.includes('client') || col.includes('cliente')
      );
      
      if (clientIdColumn) {
        console.log(`   Usando coluna: ${clientIdColumn}`);
        const aggregateResult = await db.query(`
          SELECT 
            ${clientIdColumn},
            COUNT(*) as records,
            SUM(CASE WHEN spend IS NOT NULL THEN spend ELSE 0 END) as total_spend
          FROM metricas_ads 
          GROUP BY ${clientIdColumn}
          ORDER BY total_spend DESC 
          LIMIT 3
        `);
        
        console.log('📈 Top 3 clientes:');
        console.table(aggregateResult.rows);
      } else {
        console.log('   ⚠️ Coluna de cliente não encontrada automaticamente');
      }
    }

    console.log('\n🎉 Teste da tabela metricas_ads concluído com sucesso!');
    console.log('\n📝 Agora vou atualizar as APIs para usar "metricas_ads" ao invés de "metrics"');

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
  }
}

// Executar teste se arquivo for chamado diretamente
if (require.main === module) {
  testMetricasAds()
    .then(() => {
      console.log('\n✅ Teste finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Falha no teste:', error);
      process.exit(1);
    });
}

export default testMetricasAds;