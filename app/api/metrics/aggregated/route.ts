import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    // Extrair parâmetros de data da URL
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

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
    let data = rows.slice(1).map(row => {
      const rowData: { [key: string]: string } = {};
      header.forEach((key, index) => {
        rowData[key] = row[index] || '0';
      });
      return rowData;
    });

    // 5. Filter by date range if provided
    if (startDate || endDate) {
      data = data.filter(row => {
        // Assumindo que há uma coluna 'date' na planilha
        const rowDate = row.date || row.data || row.Date || row.Data;
        if (!rowDate) return true; // Se não há data, incluir o registro
        
        const recordDate = new Date(rowDate);
        if (isNaN(recordDate.getTime())) return true; // Se data inválida, incluir o registro
        
        let include = true;
        
        if (startDate) {
          const start = new Date(startDate);
          include = include && recordDate >= start;
        }
        
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // Incluir o dia inteiro
          include = include && recordDate <= end;
        }
        
        return include;
      });
    }

    // 6. Aggregate data by client and metrics
    const aggregatedData = data.reduce((acc: any, row: any) => {
      const clientId = row.client_id;
      
      if (!acc[clientId]) {
        acc[clientId] = {
          client_id: clientId,
          total_reach: 0,
          total_impressions: 0,
          total_clicks: 0,
          total_spend: 0,
          campaigns: 0,
          ads: 0,
          avg_ctr: 0,
          avg_cpc: 0,
          campaigns_list: new Set(),
          ads_list: new Set()
        };
      }

      // Convert strings to numbers, handling edge cases
      const reach = parseFloat(row.reach) || 0;
      const impressions = parseFloat(row.impressions) || 0;
      const clicks = parseFloat(row.clicks) || 0;
      const spend = parseFloat(row.spend) || 0;
      const ctr = parseFloat(row['ctr do click']?.replace(/\./g, '').replace(',', '.')) || 0;
      const cpc = parseFloat(row.cpc) || 0;

      acc[clientId].total_reach += reach;
      acc[clientId].total_impressions += impressions;
      acc[clientId].total_clicks += clicks;
      acc[clientId].total_spend += spend;
      
      acc[clientId].campaigns_list.add(row.campaign_id);
      acc[clientId].ads_list.add(row.ad_id);

      return acc;
    }, {});

    // 7. Calculate averages and convert Sets to counts
    const finalData = Object.values(aggregatedData).map((client: any) => {
      client.campaigns = client.campaigns_list.size;
      client.ads = client.ads_list.size;
      client.avg_ctr = client.total_impressions > 0 ? (client.total_clicks / client.total_impressions) * 100 : 0;
      client.avg_cpc = client.total_clicks > 0 ? client.total_spend / client.total_clicks : 0;
      
      // Remove the Sets
      delete client.campaigns_list;
      delete client.ads_list;
      
      // Round numbers to 2 decimal places
      client.total_reach = Math.round(client.total_reach);
      client.total_impressions = Math.round(client.total_impressions);
      client.total_clicks = Math.round(client.total_clicks);
      client.total_spend = Math.round(client.total_spend * 100) / 100;
      client.avg_ctr = Math.round(client.avg_ctr * 100) / 100;
      client.avg_cpc = Math.round(client.avg_cpc * 100) / 100;
      
      return client;
    });

    // 8. Sort by total spend (descending)
    finalData.sort((a: any, b: any) => b.total_spend - a.total_spend);

    return NextResponse.json(finalData);

  } catch (error) {
    console.error('Error fetching aggregated sheet data:', error);
    return NextResponse.json({ error: 'Failed to fetch aggregated sheet data' }, { status: 500 });
  }
}
