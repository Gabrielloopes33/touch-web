import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    // Configuração para o webhook do n8n
    const n8nUrl = process.env.N8N_CHAT_WEBHOOK_URL || process.env.N8N_BASE_URL + '/webhook/chat';
    const basicAuth = Buffer.from(
      `${process.env.N8N_BASIC_USER}:${process.env.N8N_BASIC_PASS}`
    ).toString('base64');

    // Dados para enviar ao n8n
    const payload = {
      message,
      conversationId: conversationId || `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'chat'
    };

    // Chama o n8n
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`N8N responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Retorna a resposta da IA
    return NextResponse.json({
      message: data.response || data.output || 'Desculpe, não consegui processar sua mensagem.',
      conversationId: data.conversationId || payload.conversationId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no chat:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.'
      },
      { status: 500 }
    );
  }
}
