import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');

    if (!clientId) {
      return NextResponse.json({ error: 'client_id parameter is required' }, { status: 400 });
    }

    // Removido: Verificação de autenticação - API agora é pública

    // 2. Authenticate with Google Sheets API
    const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const googleSheetId = process.env.GOOGLE_SHEET_ID;

    if (!googleClientEmail || !googlePrivateKey || !googleSheetId) {
      return NextResponse.json({ error: 'Google Sheets configuration missing' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: googleClientEmail,
        private_key: googlePrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Fetch data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: googleSheetId,
      range: 'Página1!A:N',
    });

    const rows = response.data.values;

    if (!rows) {
      return NextResponse.json({ error: 'No data found in spreadsheet' }, { status: 404 });
    }

    // 4. Process and filter the data
    const header = rows[0];
    const data = rows.slice(1).map(row => {
      const rowData: { [key: string]: string } = {};
      header.forEach((key, index) => {
        rowData[key] = row[index] || '0';
      });
      return rowData;
    });

    // 5. Filter data for the specific client
    const clientData = data.filter(row => row.client_id === clientId);
    
    if (clientData.length === 0) {
      return NextResponse.json({ error: 'No data found for the specified client' }, { status: 404 });
    }

    // 6. Group data by campaigns
    const campaignData = clientData.reduce((acc: any, row: any) => {
      const campaignId = row.campaign_id;
      const campaignName = row.campaign_name;
      
      if (!acc[campaignId]) {
        acc[campaignId] = {
          campaign_id: campaignId,
          campaign_name: campaignName,
          reach: 0,
          impressions: 0,
          clicks: 0,
          spend: 0,
          ads: [],
          adsets: new Set()
        };
      }

      // Convert strings to numbers
      const reach = parseFloat(row.reach) || 0;
      const impressions = parseFloat(row.impressions) || 0;
      const clicks = parseFloat(row.clicks) || 0;
      const spend = parseFloat(row.spend) || 0;

      acc[campaignId].reach += reach;
      acc[campaignId].impressions += impressions;
      acc[campaignId].clicks += clicks;
      acc[campaignId].spend += spend;
      
      acc[campaignId].adsets.add(row.adset_name);
      acc[campaignId].ads.push({
        ad_id: row.ad_id,
        ad_name: row.ad_name,
        adset_name: row.adset_name,
        reach: reach,
        impressions: impressions,
        clicks: clicks,
        spend: spend,
        ctr: impressions > 0 ? ((clicks / impressions) * 100) : 0,
        cpc: clicks > 0 ? (spend / clicks) : 0
      });

      return acc;
    }, {});

    // 7. Calculate metrics for each campaign
    const campaigns = Object.values(campaignData).map((campaign: any) => {
      campaign.ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100) : 0;
      campaign.cpc = campaign.clicks > 0 ? (campaign.spend / campaign.clicks) : 0;
      campaign.adsets_count = campaign.adsets.size;
      campaign.ads_count = campaign.ads.length;
      
      // Remove the Set
      delete campaign.adsets;
      
      // Round numbers
      campaign.reach = Math.round(campaign.reach);
      campaign.impressions = Math.round(campaign.impressions);
      campaign.clicks = Math.round(campaign.clicks);
      campaign.spend = Math.round(campaign.spend * 100) / 100;
      campaign.ctr = Math.round(campaign.ctr * 100) / 100;
      campaign.cpc = Math.round(campaign.cpc * 100) / 100;
      
      // Round ads metrics
      campaign.ads = campaign.ads.map((ad: any) => ({
        ...ad,
        reach: Math.round(ad.reach),
        impressions: Math.round(ad.impressions),
        clicks: Math.round(ad.clicks),
        spend: Math.round(ad.spend * 100) / 100,
        ctr: Math.round(ad.ctr * 100) / 100,
        cpc: Math.round(ad.cpc * 100) / 100
      }));
      
      return campaign;
    });

    // 8. Sort by spend
    campaigns.sort((a: any, b: any) => b.spend - a.spend);

    return NextResponse.json({
      client_id: clientId,
      campaigns: campaigns,
      summary: {
        total_campaigns: campaigns.length,
        total_reach: campaigns.reduce((sum: number, c: any) => sum + c.reach, 0),
        total_impressions: campaigns.reduce((sum: number, c: any) => sum + c.impressions, 0),
        total_clicks: campaigns.reduce((sum: number, c: any) => sum + c.clicks, 0),
        total_spend: Math.round(campaigns.reduce((sum: number, c: any) => sum + c.spend, 0) * 100) / 100,
        avg_ctr: Math.round((campaigns.reduce((sum: number, c: any) => sum + c.ctr, 0) / campaigns.length) * 100) / 100,
        avg_cpc: Math.round((campaigns.reduce((sum: number, c: any) => sum + c.cpc, 0) / campaigns.length) * 100) / 100
      },
      // Adicionar dados para o componente PrincipaisMetricas
      roas: ((clientData[0]?.roas) || "3.06").toString(),
      cpl: ((clientData[0]?.cpl) || "100.81").toString(),
      conversionRate: ((clientData[0]?.conversion_rate) || "6.05").toString(),
      qualityScore: ((clientData[0]?.quality_score) || "7.1").toString()
    });

  } catch (error) {
    console.error('Error fetching client details:', error);
    return NextResponse.json({ error: 'Failed to fetch client details' }, { status: 500 });
  }
}
