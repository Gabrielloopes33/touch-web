import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET() {
  try {
    // Buscar dados agregados por campanha
    const query = `
      SELECT 
        client_id,
        campaign_id,
        campaign_name,
        SUM(reach) as reach,
        SUM(impressions) as impressions,
        SUM(clicks) as clicks,
        SUM(spend) as spend,
        COUNT(DISTINCT ad_id) as ads_count,
        CASE 
          WHEN SUM(impressions) > 0 THEN (SUM(clicks)::DECIMAL / SUM(impressions) * 100)
          ELSE 0 
        END as ctr,
        CASE 
          WHEN SUM(clicks) > 0 THEN (SUM(spend)::DECIMAL / SUM(clicks))
          ELSE 0 
        END as cpc
      FROM metricas_ads
      GROUP BY client_id, campaign_id, campaign_name
      ORDER BY spend DESC
    `;

    console.log('Executing campaigns query:', query);

    // Executar query
    const result = await db.query(query);

    // Processar resultados
    const campaigns = result.rows.map((row: any) => ({
      client_id: row.client_id,
      campaign_id: row.campaign_id,
      campaign_name: row.campaign_name || row.campaign_id,
      reach: parseInt(row.reach) || 0,
      impressions: parseInt(row.impressions) || 0,
      clicks: parseInt(row.clicks) || 0,
      spend: Math.round(parseFloat(row.spend) * 100) / 100 || 0,
      ads_count: parseInt(row.ads_count) || 0,
      ctr: Math.round(parseFloat(row.ctr) * 100) / 100 || 0,
      cpc: Math.round(parseFloat(row.cpc) * 100) / 100 || 0
    }));

    // Criar rankings por diferentes métricas
    const topBySpend = [...campaigns].slice(0, 10);
    const topByCTR = [...campaigns].sort((a: any, b: any) => b.ctr - a.ctr).slice(0, 10);
    const topByEfficiency = [...campaigns]
      .filter((c: any) => c.spend > 0 && c.clicks > 0)
      .sort((a: any, b: any) => (b.clicks / b.spend) - (a.clicks / a.spend))
      .slice(0, 10);

    // Calcular estatísticas gerais
    const uniqueClients = new Set(campaigns.map((c: any) => c.client_id)).size;
    const totalSpend = campaigns.reduce((sum: number, c: any) => sum + c.spend, 0);
    const avgSpend = campaigns.length > 0 ? totalSpend / campaigns.length : 0;
    const avgCTR = campaigns.length > 0 ? campaigns.reduce((sum: number, c: any) => sum + c.ctr, 0) / campaigns.length : 0;
    const avgCPC = campaigns.length > 0 ? campaigns.reduce((sum: number, c: any) => sum + c.cpc, 0) / campaigns.length : 0;

    return NextResponse.json({
      all_campaigns: campaigns,
      top_by_spend: topBySpend,
      top_by_ctr: topByCTR,
      top_by_efficiency: topByEfficiency,
      summary: {
        total_campaigns: campaigns.length,
        total_clients: uniqueClients,
        avg_spend: Math.round(avgSpend * 100) / 100,
        avg_ctr: Math.round(avgCTR * 100) / 100,
        avg_cpc: Math.round(avgCPC * 100) / 100,
        total_spend: Math.round(totalSpend * 100) / 100
      }
    });

  } catch (error) {
    console.error('Error fetching campaign comparison data from PostgreSQL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign comparison data', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
