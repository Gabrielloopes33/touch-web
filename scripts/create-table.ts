/**
 * Script para criar automaticamente a tabela metrics no PostgreSQL
 * Execute com: npm run create-table
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import db from '../lib/database';
import fs from 'fs';
import path from 'path';

async function createTable() {
  console.log('🏗️ Criando tabela metrics no PostgreSQL...\n');

  try {
    // 1. Verificar conexão
    console.log('1️⃣ Verificando conexão...');
    const isConnected = await db.testConnection();
    if (!isConnected) {
      throw new Error('Falha na conexão');
    }
    console.log('✅ Conexão OK!\n');

    // 2. Ler arquivo SQL
    console.log('2️⃣ Lendo script SQL...');
    const sqlFilePath = path.join(__dirname, 'create_metrics_table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('✅ Script SQL carregado!\n');

    // 3. Executar script SQL
    console.log('3️⃣ Executando script SQL...');
    
    // Dividir o SQL em comandos separados (por ponto e vírgula)
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i];
      if (command.length > 0) {
        console.log(`   Executando comando ${i + 1}/${sqlCommands.length}...`);
        await db.query(command);
      }
    }

    console.log('✅ Tabela criada com sucesso!\n');

    // 4. Verificar se a tabela foi criada
    console.log('4️⃣ Verificando tabela criada...');
    const tableCheck = await db.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'metrics' 
      ORDER BY ordinal_position
    `);

    console.log('📋 Colunas da tabela metrics:');
    console.table(tableCheck.rows);

    console.log('\n🎉 Tabela metrics criada com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Execute: npm run test-db (para testar novamente)');
    console.log('2. Execute: npm run migrate-data (para migrar dados do Google Sheets)');
    console.log('3. Execute: npm run dev (para testar o dashboard)');

  } catch (error) {
    console.error('\n❌ Erro ao criar tabela:', error);
    console.log('\n🔧 Possíveis soluções:');
    console.log('1. Verifique se você tem permissões para criar tabelas');
    console.log('2. Execute o SQL manualmente na VPS se necessário');
    console.log('3. Verifique se o arquivo scripts/create_metrics_table.sql existe');
  }
}

// Executar criação se arquivo for chamado diretamente
if (require.main === module) {
  createTable()
    .then(() => {
      console.log('\n✅ Processo finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Falha na criação:', error);
      process.exit(1);
    });
}

export default createTable;