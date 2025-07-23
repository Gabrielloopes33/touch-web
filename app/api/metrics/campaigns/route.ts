import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
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

    // 5. Aggregate data by campaigns across all clients
    const campaignData = data.reduce((acc: any, row: any) => {
      const campaignKey = `${row.client_id}_${row.campaign_id}`;
      
      if (!acc[campaignKey]) {
        acc[campaignKey] = {
          client_id: row.client_id,
          campaign_id: row.campaign_id,
          campaign_name: row.campaign_name,
          reach: 0,
          impressions: 0,
          clicks: 0,
          spend: 0,
          ads: new Set()
        };
      }

      // Convert strings to numbers
      const reach = parseFloat(row.reach) || 0;
      const impressions = parseFloat(row.impressions) || 0;
      const clicks = parseFloat(row.clicks) || 0;
      const spend = parseFloat(row.spend) || 0;

      acc[campaignKey].reach += reach;
      acc[campaignKey].impressions += impressions;
      acc[campaignKey].clicks += clicks;
      acc[campaignKey].spend += spend;
      acc[campaignKey].ads.add(row.ad_id);

      return acc;
    }, {});

    // 6. Calculate metrics for each campaign
    const campaigns = Object.values(campaignData).map((campaign: any) => {
      campaign.ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100) : 0;
      campaign.cpc = campaign.clicks > 0 ? (campaign.spend / campaign.clicks) : 0;
      campaign.ads_count = campaign.ads.size;
      
      // Remove the Set
      delete campaign.ads;
      
      // Round numbers
      campaign.reach = Math.round(campaign.reach);
      campaign.impressions = Math.round(campaign.impressions);
      campaign.clicks = Math.round(campaign.clicks);
      campaign.spend = Math.round(campaign.spend * 100) / 100;
      campaign.ctr = Math.round(campaign.ctr * 100) / 100;
      campaign.cpc = Math.round(campaign.cpc * 100) / 100;
      
      return campaign;
    });

    // 7. Sort by spend (descending)
    campaigns.sort((a: any, b: any) => b.spend - a.spend);

    // 8. Get top performers by different metrics
    const topBySpend = [...campaigns].slice(0, 10);
    const topByCTR = [...campaigns].sort((a: any, b: any) => b.ctr - a.ctr).slice(0, 10);
    const topByROAS = [...campaigns]
      .filter((c: any) => c.spend > 0)
      .sort((a: any, b: any) => (b.clicks / b.spend) - (a.clicks / a.spend))
      .slice(0, 10);

    return NextResponse.json({
      all_campaigns: campaigns,
      top_by_spend: topBySpend,
      top_by_ctr: topByCTR,
      top_by_efficiency: topByROAS,
      summary: {
        total_campaigns: campaigns.length,
        total_clients: new Set(campaigns.map((c: any) => c.client_id)).size,
        avg_spend: Math.round((campaigns.reduce((sum: number, c: any) => sum + c.spend, 0) / campaigns.length) * 100) / 100,
        avg_ctr: Math.round((campaigns.reduce((sum: number, c: any) => sum + c.ctr, 0) / campaigns.length) * 100) / 100,
        avg_cpc: Math.round((campaigns.reduce((sum: number, c: any) => sum + c.cpc, 0) / campaigns.length) * 100) / 100
      }
    });

  } catch (error) {
    console.error('Error fetching campaign comparison data:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign comparison data' }, { status: 500 });
  }
}
