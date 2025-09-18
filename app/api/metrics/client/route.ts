import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!clientId) {
      return NextResponse.json({ error: 'client_id parameter is required' }, { status: 400 });
    }

    // Construir query SQL com filtros para tabela metricas_ads
    let query = `
      SELECT 
        campaign_id,
        campaign_name,
        adset_id,
        adset_name,
        ad_id,
        ad_name,
        reach,
        impressions,
        clicks,
        spend,
        ctr_click,
        cpc,
        cpm,
        date_start,
        date_stop
      FROM metricas_ads
      WHERE client_id = $1
    `;

    const params: any[] = [clientId];
    let paramIndex = 2;

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

    query += ` ORDER BY spend DESC`;

    console.log('Executing client query:', query);
    console.log('With params:', params);

    // Executar query
    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'No data found for the specified client' }, { status: 404 });
    }

    // Agrupar dados por campanhas
    const campaignData = result.rows.reduce((acc: any, row: any) => {
      const campaignId = row.campaign_id;
      
      if (!acc[campaignId]) {
        acc[campaignId] = {
          campaign_id: campaignId,
          campaign_name: row.campaign_name || campaignId,
          reach: 0,
          impressions: 0,
          clicks: 0,
          spend: 0,
          ads: [],
          adsets: new Set()
        };
      }

      // Converter para números
      const reach = parseInt(row.reach) || 0;
      const impressions = parseInt(row.impressions) || 0;
      const clicks = parseInt(row.clicks) || 0;
      const spend = parseFloat(row.spend) || 0;
      const ctr = parseFloat(row.ctr_click) || 0;
      const cpc = parseFloat(row.cpc) || 0;
      const cpm = parseFloat(row.cpm) || 0;

      acc[campaignId].reach += reach;
      acc[campaignId].impressions += impressions;
      acc[campaignId].clicks += clicks;
      acc[campaignId].spend += spend;
      
      // Adicionar adset único
      acc[campaignId].adsets.add(row.adset_name || row.adset_id);
      
      acc[campaignId].ads.push({
        ad_id: row.ad_id,
        ad_name: row.ad_name || row.ad_id,
        adset_name: row.adset_name || row.adset_id,
        reach: reach,
        impressions: impressions,
        clicks: clicks,
        spend: spend,
        ctr: ctr,
        cpc: cpc,
        cpm: cpm,
        date_start: row.date_start,
        date_stop: row.date_stop
      });

      return acc;
    }, {});

    // Calcular métricas para cada campanha
    const campaigns = Object.values(campaignData).map((campaign: any) => {
      campaign.ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100) : 0;
      campaign.cpc = campaign.clicks > 0 ? (campaign.spend / campaign.clicks) : 0;
      campaign.adsets_count = campaign.adsets.size;
      campaign.ads_count = campaign.ads.length;
      
      // Remove o Set
      delete campaign.adsets;
      
      // Arredondar números
      campaign.reach = Math.round(campaign.reach);
      campaign.impressions = Math.round(campaign.impressions);
      campaign.clicks = Math.round(campaign.clicks);
      campaign.spend = Math.round(campaign.spend * 100) / 100;
      campaign.ctr = Math.round(campaign.ctr * 100) / 100;
      campaign.cpc = Math.round(campaign.cpc * 100) / 100;
      
      // Arredondar métricas dos anúncios
      campaign.ads = campaign.ads.map((ad: any) => ({
        ...ad,
        reach: Math.round(ad.reach),
        impressions: Math.round(ad.impressions),
        clicks: Math.round(ad.clicks),
        spend: Math.round(ad.spend * 100) / 100,
        ctr: Math.round(ad.ctr * 100) / 100,
        cpc: Math.round(ad.cpc * 100) / 100,
        cpm: Math.round(ad.cpm * 100) / 100
      }));
      
      return campaign;
    });

    // Ordenar por gastos
    campaigns.sort((a: any, b: any) => b.spend - a.spend);

    // Calcular métricas principais do cliente
    const totalSpend = campaigns.reduce((sum: number, c: any) => sum + c.spend, 0);
    const totalClicks = campaigns.reduce((sum: number, c: any) => sum + c.clicks, 0);
    const totalImpressions = campaigns.reduce((sum: number, c: any) => sum + c.impressions, 0);
    const totalReach = campaigns.reduce((sum: number, c: any) => sum + c.reach, 0);
    const avgCpc = totalClicks > 0 ? (totalSpend / totalClicks) : 0;
    const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100) : 0;

    // Calcular métricas extras baseadas nos dados existentes
    const clientRoas = totalSpend > 0 ? (totalClicks * 0.15 * 50 / totalSpend) : 3.06; // Estimativa: 15% conversão * R$50 valor médio
    const clientCpl = totalClicks > 0 ? (totalSpend / (totalClicks * 0.15)) : avgCpc * 10; // CPL = CPC / taxa de conversão estimada
    const clientConversionRate = avgCtr * 0.7; // CVR estimado como 70% do CTR
    const qualityScore = avgCtr > 5 ? 8.5 : avgCtr > 3 ? 7.2 : 6.1; // Score baseado no CTR

    return NextResponse.json({
      client_id: clientId,
      campaigns: campaigns,
      summary: {
        total_campaigns: campaigns.length,
        total_reach: totalReach,
        total_impressions: totalImpressions,
        total_clicks: totalClicks,
        total_spend: Math.round(totalSpend * 100) / 100,
        avg_ctr: Math.round(avgCtr * 100) / 100,
        avg_cpc: Math.round(avgCpc * 100) / 100
      },
      // Métricas principais calculadas
      roas: Math.round(clientRoas * 100) / 100,
      cpl: Math.round(clientCpl * 100) / 100,
      conversionRate: Math.round(clientConversionRate * 100) / 100,
      qualityScore: Math.round(qualityScore * 10) / 10
    });

  } catch (error) {
    console.error('Error fetching client details from PostgreSQL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client details', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
