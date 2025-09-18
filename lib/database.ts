// Carregar variáveis de ambiente do arquivo .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import { Pool, PoolClient } from 'pg';

// Debug das variáveis de ambiente
console.log('🔧 Configurações PostgreSQL:');
console.log('HOST:', process.env.POSTGRES_HOST);
console.log('PORT:', process.env.POSTGRES_PORT);
console.log('DATABASE:', process.env.POSTGRES_DATABASE);
console.log('USER:', process.env.POSTGRES_USER);
console.log('PASSWORD:', process.env.POSTGRES_PASSWORD ? '***DEFINIDA***' : 'NÃO DEFINIDA');

// Configuração do pool de conexões PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: false, // Desabilitar SSL para VPS que não suporta
  max: 20, // máximo de conexões no pool
  idleTimeoutMillis: 30000, // tempo limite para conexões inativas
  connectionTimeoutMillis: 10000, // tempo limite para conectar (aumentado)
});

/**
 * Executa uma query no banco PostgreSQL
 * @param text - SQL query
 * @param params - Parâmetros da query
 * @returns Resultado da query
 */
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const client = await pool.connect();
  
  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Executa múltiplas queries em uma transação
 * @param queries - Array de queries a serem executadas
 * @returns Resultados das queries
 */
export async function transaction(queries: Array<{ text: string; params?: any[] }>) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const results = [];
    for (const queryData of queries) {
      const result = await client.query(queryData.text, queryData.params);
      results.push(result);
    }
    
    await client.query('COMMIT');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Função para executar com um cliente específico (útil para transações complexas)
 * @param callback - Função que recebe o client e executa as operações
 * @returns Resultado da função callback
 */
export async function withClient<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  
  try {
    return await callback(client);
  } finally {
    client.release();
  }
}

/**
 * Testa a conexão com o banco
 * @returns true se a conexão foi bem-sucedida
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT NOW() as now');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Função para fechar o pool de conexões (útil para testes ou shutdown)
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

// Configuração para desenvolvimento/debug
if (process.env.NODE_ENV === 'development') {
  pool.on('connect', (client) => {
    console.log('New client connected to PostgreSQL');
  });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(-1);
  });
}

export default { query, transaction, withClient, testConnection, closePool };