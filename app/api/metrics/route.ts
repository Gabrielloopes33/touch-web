import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// This is the heart of our backend. It fetches data from Google Sheets
// and filters it for the currently logged-in user.

export async function GET() {
  try {
    // Removido: Verificação de autenticação - agora a API é pública

    // Removido: Verificação de autenticação - API agora é pública
    // A API retorna todos os dados disponíveis sem filtro por usuário
    
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
      range: 'Página1!A:N', // Adjust if your sheet name is different
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
        rowData[key] = row[index];
      });
      return rowData;
    });

    // This is where we'd filter by the logged-in user.
    // For now, we'll return all data for testing the chart.
    // const clientData = data.filter(row => row.ad_account_id === user_ad_account_id);
    
    // We will return all data for now to build the chart component.
    // Filtering will be the next step.
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 });
  }
}