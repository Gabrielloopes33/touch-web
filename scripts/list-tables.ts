/**
 * Script para listar todas as tabelas disponíveis no PostgreSQL
 * Execute com: npm run list-tables
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import db from '../lib/database';

async function listTables() {
  console.log('📋 Listando todas as tabelas do PostgreSQL...\n');

  try {
    // 1. Testar conexão
    console.log('1️⃣ Testando conexão...');
    const isConnected = await db.testConnection();
    if (!isConnected) {
      throw new Error('Falha na conexão');
    }
    console.log('✅ Conexão OK!\n');

    // 2. Listar todos os schemas
    console.log('2️⃣ Listando schemas disponíveis...');
    const schemasResult = await db.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `);
    
    console.log('📂 Schemas encontrados:');
    console.table(schemasResult.rows);

    // 3. Listar todas as tabelas em todos os schemas
    console.log('3️⃣ Listando todas as tabelas...');
    const tablesResult = await db.query(`
      SELECT 
        table_schema,
        table_name,
        table_type
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY table_schema, table_name
    `);
    
    console.log('📊 Tabelas encontradas:');
    console.table(tablesResult.rows);

    // 4. Procurar especificamente por 'metrics'
    console.log('4️⃣ Procurando tabelas que contenham "metrics"...');
    const metricsResult = await db.query(`
      SELECT 
        table_schema,
        table_name,
        table_type
      FROM information_schema.tables 
      WHERE LOWER(table_name) LIKE '%metrics%'
      ORDER BY table_schema, table_name
    `);
    
    if (metricsResult.rows.length > 0) {
      console.log('🎯 Tabelas relacionadas a "metrics":');
      console.table(metricsResult.rows);
    } else {
      console.log('❌ Nenhuma tabela com "metrics" encontrada');
    }

    // 5. Listar colunas de qualquer tabela que possa ser a metrics
    if (metricsResult.rows.length > 0) {
      const firstMetricsTable = metricsResult.rows[0];
      console.log(`\n5️⃣ Listando colunas da tabela ${firstMetricsTable.table_schema}.${firstMetricsTable.table_name}...`);
      
      const columnsResult = await db.query(`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns 
        WHERE table_schema = $1 AND table_name = $2
        ORDER BY ordinal_position
      `, [firstMetricsTable.table_schema, firstMetricsTable.table_name]);
      
      console.log('📋 Colunas da tabela:');
      console.table(columnsResult.rows);
    }

  } catch (error) {
    console.error('\n❌ Erro ao listar tabelas:', error);
  }
}

// Executar listagem se arquivo for chamado diretamente
if (require.main === module) {
  listTables()
    .then(() => {
      console.log('\n✅ Listagem finalizada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Falha na listagem:', error);
      process.exit(1);
    });
}

export default listTables;