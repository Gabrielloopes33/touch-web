import { NextResponse } from 'next/server';
import db from '../../../lib/database';

// API principal de métricas - retorna dados brutos do PostgreSQL

export async function GET(request: Request) {
  try {
    // Extrair parâmetros da URL
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1000');
    const offset = parseInt(searchParams.get('offset') || '0');
    const clientId = searchParams.get('client_id');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Construir query SQL
    let query = `
      SELECT 
        id,
        client_id,
        ad_account_id,
        campaign_name,
        campaign_id,
        adset_id,
        adset_name,
        ad_id,
        ad_name,
        reach,
        impressions,
        clicks,
        ctr_click,
        spend,
        cpc,
        cpm,
        date_start,
        date_stop,
        criado_em
      FROM metricas_ads
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    // Adicionar filtros conforme necessário
    if (clientId) {
      query += ` AND client_id = $${paramIndex}`;
      params.push(clientId);
      paramIndex++;
    }

    if (startDate) {
      query += ` AND date_start >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND date_stop <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    // Adicionar ordenação e paginação
    query += ` ORDER BY date_start DESC, spend DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    console.log('Executing metrics query:', query);
    console.log('With params:', params);

    // Executar query
    const result = await db.query(query, params);

    // Processar resultados
    const data = result.rows.map((row: any) => ({
      id: row.id,
      client_id: row.client_id,
      ad_account_id: row.ad_account_id,
      campaign_name: row.campaign_name,
      campaign_id: row.campaign_id,
      adset_id: row.adset_id,
      adset_name: row.adset_name,
      ad_id: row.ad_id,
      ad_name: row.ad_name,
      reach: parseInt(row.reach) || 0,
      impressions: parseInt(row.impressions) || 0,
      clicks: parseInt(row.clicks) || 0,
      ctr_click: parseFloat(row.ctr_click) || 0,
      spend: parseFloat(row.spend) || 0,
      cpc: parseFloat(row.cpc) || 0,
      cpm: parseFloat(row.cpm) || 0,
      date_start: row.date_start,
      date_stop: row.date_stop,
      criado_em: row.criado_em
    }));

    // Buscar total de registros para paginação
    let countQuery = 'SELECT COUNT(*) as total FROM metricas_ads WHERE 1=1';
    const countParams: any[] = [];
    let countParamIndex = 1;

    if (clientId) {
      countQuery += ` AND client_id = $${countParamIndex}`;
      countParams.push(clientId);
      countParamIndex++;
    }

    if (startDate) {
      countQuery += ` AND date_start >= $${countParamIndex}`;
      countParams.push(startDate);
      countParamIndex++;
    }

    if (endDate) {
      countQuery += ` AND date_stop <= $${countParamIndex}`;
      countParams.push(endDate);
    }

    const countResult = await db.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    return NextResponse.json({
      data,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching metrics data from PostgreSQL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics data', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}