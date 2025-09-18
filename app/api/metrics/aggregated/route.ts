import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET(request: Request) {
  try {
    // Extrair parâmetros de data da URL
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Construir query SQL com filtros de data
    let query = `
      SELECT 
        client_id,
        SUM(reach) as total_reach,
        SUM(impressions) as total_impressions,
        SUM(clicks) as total_clicks,
        SUM(spend) as total_spend,
        COUNT(DISTINCT campaign_id) as campaigns,
        COUNT(DISTINCT ad_id) as ads,
        CASE 
          WHEN SUM(impressions) > 0 THEN (SUM(clicks)::DECIMAL / SUM(impressions) * 100)
          ELSE 0 
        END as avg_ctr,
        CASE 
          WHEN SUM(clicks) > 0 THEN (SUM(spend)::DECIMAL / SUM(clicks))
          ELSE 0 
        END as avg_cpc
      FROM metricas_ads
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    // Adicionar filtros de data se fornecidos
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

    query += `
      GROUP BY client_id
      ORDER BY total_spend DESC
    `;

    console.log('Executing query:', query);
    console.log('With params:', params);

    // Executar query
    const result = await db.query(query, params);

    // Processar resultados
    const finalData = result.rows.map((row: any) => ({
      client_id: row.client_id,
      total_reach: parseInt(row.total_reach) || 0,
      total_impressions: parseInt(row.total_impressions) || 0,
      total_clicks: parseInt(row.total_clicks) || 0,
      total_spend: parseFloat(row.total_spend) || 0,
      campaigns: parseInt(row.campaigns) || 0,
      ads: parseInt(row.ads) || 0,
      avg_ctr: Math.round(parseFloat(row.avg_ctr) * 100) / 100 || 0,
      avg_cpc: Math.round(parseFloat(row.avg_cpc) * 100) / 100 || 0,
    }));

    console.log(`Returning ${finalData.length} records`);
    return NextResponse.json(finalData);

  } catch (error) {
    console.error('Error fetching aggregated data from PostgreSQL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch aggregated data', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
