/**
 * Script para migrar dados do Google Sheets para PostgreSQL
 * Execute com: npm run migrate-data
 */

// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import { google } from 'googleapis';
import db from '../lib/database';

interface SheetRow {
  client_id: string;
  campaign_id: string;
  ad_id: string;
  reach: string;
  impressions: string;
  clicks: string;
  spend: string;
  'ctr do click': string;
  cpc: string;
  date?: string;
  [key: string]: string | undefined;
}

async function migrateData() {
  console.log('🚀 Iniciando migração de dados do Google Sheets para PostgreSQL...');

  try {
    // 1. Verificar conexão com PostgreSQL
    console.log('📡 Testando conexão com PostgreSQL...');
    const isConnected = await db.testConnection();
    if (!isConnected) {
      throw new Error('Falha ao conectar com PostgreSQL');
    }
    console.log('✅ Conexão PostgreSQL estabelecida');

    // 2. Conectar com Google Sheets
    console.log('📊 Conectando com Google Sheets...');
    const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const googleSheetId = process.env.GOOGLE_SHEET_ID;

    if (!googleClientEmail || !googlePrivateKey || !googleSheetId) {
      throw new Error('Configurações do Google Sheets não encontradas');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: googleClientEmail,
        private_key: googlePrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Buscar dados do Google Sheets
    console.log('📥 Buscando dados do Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: googleSheetId,
      range: 'Página1!A:N',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      throw new Error('Nenhum dado encontrado na planilha');
    }

    const header = rows[0];
    const dataRows = rows.slice(1);
    console.log(`📋 Encontrados ${dataRows.length} registros na planilha`);
    console.log(`📋 Colunas: ${header.join(', ')}`);

    // 4. Limpar tabela existente (opcional - remova se quiser manter dados)
    console.log('🧹 Limpando tabela existente...');
    await db.query('DELETE FROM metrics');
    console.log('✅ Tabela limpa');

    // 5. Preparar dados para inserção
    console.log('🔄 Processando dados...');
    const insertQuery = `
      INSERT INTO metrics (
        client_id, campaign_id, ad_id, reach, impressions, clicks, 
        spend, ctr_click, cpc, date_recorded
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
    `;

    let successCount = 0;
    let errorCount = 0;

    // 6. Inserir dados em lotes
    const batchSize = 100;
    for (let i = 0; i < dataRows.length; i += batchSize) {
      const batch = dataRows.slice(i, i + batchSize);
      
      console.log(`📤 Inserindo lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(dataRows.length / batchSize)} (${batch.length} registros)`);

      for (const row of batch) {
        try {
          const rowData: { [key: string]: string } = {};
          header.forEach((key, index) => {
            rowData[key] = row[index] || '0';
          });

          // Converter strings para números e tratar valores
          const reach = parseFloat(rowData.reach) || 0;
          const impressions = parseFloat(rowData.impressions) || 0;
          const clicks = parseFloat(rowData.clicks) || 0;
          const spend = parseFloat(rowData.spend) || 0;
          const ctrClick = parseFloat(rowData['ctr do click']?.replace(/\./g, '').replace(',', '.')) || 0;
          const cpc = parseFloat(rowData.cpc) || 0;
          
          // Data padrão se não houver data na planilha
          const dateRecorded = rowData.date || rowData.data || rowData.Date || rowData.Data || new Date().toISOString().split('T')[0];

          await db.query(insertQuery, [
            rowData.client_id || 'unknown',
            rowData.campaign_id || 'unknown',
            rowData.ad_id || 'unknown',
            reach,
            impressions,
            clicks,
            spend,
            ctrClick,
            cpc,
            dateRecorded
          ]);

          successCount++;
        } catch (error) {
          console.error(`❌ Erro ao inserir registro:`, error);
          errorCount++;
        }
      }
    }

    // 7. Relatório final
    console.log('\n📊 RELATÓRIO DE MIGRAÇÃO:');
    console.log(`✅ Registros inseridos com sucesso: ${successCount}`);
    console.log(`❌ Registros com erro: ${errorCount}`);
    console.log(`📋 Total processado: ${successCount + errorCount}`);

    // 8. Verificar dados inseridos
    const countResult = await db.query('SELECT COUNT(*) as total FROM metrics');
    console.log(`🗄️ Total de registros na tabela PostgreSQL: ${countResult.rows[0].total}`);

    // 9. Mostrar amostra dos dados
    const sampleResult = await db.query('SELECT * FROM metrics LIMIT 5');
    console.log('\n📋 Amostra dos dados migrados:');
    console.table(sampleResult.rows);

    console.log('\n🎉 Migração concluída com sucesso!');

  } catch (error) {
    console.error('💥 Erro durante a migração:', error);
    process.exit(1);
  }
}

// Executar migração se arquivo for chamado diretamente
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('✅ Processo de migração finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Falha na migração:', error);
      process.exit(1);
    });
}

export default migrateData;