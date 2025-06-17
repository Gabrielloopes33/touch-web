// lib/n8n.ts
import { Buffer } from 'buffer';

type AgentAction = 'list' | 'create' | 'update' | 'delete';

/**
 * Chama o webhook do n8n e SEMPRE devolve uma `string`
 * (converte objetos ou números para string caso necessário).
 */
export async function callN8n(
  action: AgentAction,
  data: any = {},
): Promise<string> {
  /* --- monta Basic Auth --------------------------------------------------- */
  const basicAuth = Buffer.from(
    `${process.env.N8N_BASIC_USER}:${process.env.N8N_BASIC_PASS}`,
  ).toString('base64');

  /* --- faz a requisição --------------------------------------------------- */
  const res = await fetch(
    `${process.env.N8N_BASE_URL}${process.env.N8N_WEBHOOK_PATH}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ action, data }),
    },
  );

  if (!res.ok) {
    throw new Error(`n8n ${res.status} – ${res.statusText}`);
  }

  /* --- garante retorno string -------------------------------------------- */
  const json: any = await res.json();
  console.log('[n8n → Next] payload:', json); // debug

  if (typeof json === 'string') return json;
  if (typeof json === 'number' || typeof json === 'boolean') return String(json);

  // Se vier objeto, tenta extrair campo "output". Se não, serializa inteiro.
  if (json && typeof json === 'object') {
    if (typeof json.output === 'string') return json.output;
    return JSON.stringify(json);
  }

  return 'Unknown response from n8n';
}
