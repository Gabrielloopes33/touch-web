// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { callN8n } from '@/lib/n8n';

/* ----------------------------------------------------------------– GET */
export async function GET() {
  try {
    const reply = await callN8n('list');
    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/agents] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ----------------------------------------------------------------– POST */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reply = await callN8n('create', body);
    return NextResponse.json({ reply }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/agents] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
