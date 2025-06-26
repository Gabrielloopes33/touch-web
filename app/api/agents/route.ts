// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/* ----------------------------------------------------------------– GET */
export async function GET(req: NextRequest) {
  // Permite buscar histórico de um agente: /api/agents?agent=engenheiro&user_id=xxx
  const { searchParams } = new URL(req.url!);
  const agent = searchParams.get('agent');
  const user_id = searchParams.get('user_id');
  if (agent && user_id) {
    // Busca o último histórico desse agente para o usuário
    const { data, error } = await supabase
      .from('conversas')
      .select('messages')
      .eq('agent', agent)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ messages: data?.[0]?.messages || [] }, { status: 200 });
  }
  return NextResponse.json({ reply: 'API de agentes ativa.' }, { status: 200 });
}

/* ----------------------------------------------------------------– POST */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agent, user_id } = body;

    // Só chama a OpenAI se o agente for "produtor-site"
    if (agent === "produtor-site") {
      // Subagentes: UX, Copywriter, Dev Front-end
      const prompts = [
        {
          name: "UX Designer",
          prompt: `Você é um especialista em UX/UI para landing pages. Gere uma estrutura completa de seções e um wireframe textual detalhado para uma landing page, considerando o briefing abaixo. Seja objetivo e prático.`
        },
        {
          name: "Copywriter",
          prompt: `Você é um copywriter especialista em conversão para landing pages. Gere o copywriting completo e estratégico para cada seção da landing page, considerando o briefing abaixo. Use técnicas de persuasão e clareza.`
        },
        {
          name: "Dev Front-end",
          prompt: `Você é um desenvolvedor front-end especialista em Next.js, TailwindCSS e shadcn/ui. Sugira os melhores componentes, bibliotecas, arquitetura técnica e microinterações para implementar a landing page do briefing abaixo.`
        }
      ];

      const results = [];
      for (const sub of prompts) {
        const systemPrompt = {
          role: "system",
          content: `${sub.prompt}\n\nBriefing:\n${messages.map((m: any) => m.content).join("\n")}`
        };
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [systemPrompt],
          }),
        });
        const data = await openaiRes.json();
        results.push({
          agent: sub.name,
          reply: data.choices?.[0]?.message?.content || `Erro na resposta do agente ${sub.name}`
        });
      }

      // Após obter as respostas dos subagentes, compilar tudo com um quarto agente (Compilador)
      const compiledPrompt = {
        role: "system",
        content: `Você é um especialista em síntese e compilação de informações para projetos de landing page. Receberá abaixo as respostas de três especialistas (UX Designer, Copywriter e Dev Front-end) sobre o mesmo briefing. Sua tarefa é compilar, organizar e apresentar uma resposta única, clara e estruturada, integrando as melhores ideias de cada especialista para entregar um plano de landing page completo, coeso e pronto para implementação.\n\nRespostas dos especialistas:\n${results.map(r => `---\n${r.agent}:\n${r.reply}`).join("\n\n")}`
      };
      const openaiResCompiled = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [compiledPrompt],
        }),
      });
      const dataCompiled = await openaiResCompiled.json();
      const reply = dataCompiled.choices?.[0]?.message?.content || "Erro ao compilar as respostas dos agentes.";
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    // Adicionado o tratamento para o agente "produtor-conteudo"
    if (agent === "produtor-conteudo") {
      // Define um sessionId, taskId e callId fixos por agente para manter o histórico agrupado
      const sessionId = `session-${agent}`;
      const taskId = `task-${agent}`;
      const callId = `call-${agent}`;
      const evoRes = await fetch("https://plane-evo-ai-api.mk9fkk.easypanel.host/api/v1/a2a/113d0943-f29e-485d-bcdf-6a8106447f00", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "ecbcde49-8edc-4709-9f5d-c5d2279ade41"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "message/send",
          params: {
            message: {
              role: "user",
              parts: [
                {
                  type: "text",
                  text: messages.map((m: any) => m.content).join("\n")
                }
              ]
            },
            sessionId,
            id: taskId
          },
          id: callId
        })
      });
      const text = await evoRes.text();
      console.log("EvoAI response:", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        return NextResponse.json({ reply: `[Erro EvoAI]: ${text}` }, { status: 500 });
      }
      // Extrai a resposta do formato correto
      let reply = "Erro na resposta do EvoAI.";
      // Tenta extrair a resposta do local mais comum
      if (data?.result?.status?.message?.parts?.[0]?.text) {
        reply = data.result.status.message.parts[0].text;
      } else if (data?.result?.artifacts?.[0]?.parts?.[0]?.text) {
        // Alternativa: resposta pode vir em artifacts
        reply = data.result.artifacts[0].parts[0].text;
      } else if (data?.error?.message) {
        reply = `[EvoAI Error]: ${data.error.message}`;
      } else if (data?.result?.status?.message?.parts) {
        // Se vier um array de partes, junta tudo
        reply = data.result.status.message.parts.map((p:any) => p.text).join('\n');
      }
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }
    if (agent === "engenheiro") {
      const systemPrompt = {
        role: "system",
        content: `Você é um engenheiro civil especialista em planejamento, execução e otimização de obras residenciais, comerciais e industriais.\n\nSua tarefa é, a partir do briefing abaixo, gerar:\n- Análise técnica do projeto\n- Sugestões de soluções construtivas e materiais\n- Cronograma físico-financeiro resumido\n- Dicas para redução de custos e aumento de eficiência\n- Recomendações de normas técnicas e segurança\n- Checklist de etapas essenciais da obra\n- Riscos e pontos de atenção\n\nUtilize o briefing abaixo como base para entregar um plano de obra claro, seguro e eficiente.\n\n---\n\n[Briefing do usuário:]\n${messages.map((m: any) => m.content).join("\n")}\n\n---\n\nResponda de forma técnica, prática e didática.`
      };
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemPrompt],
        }),
      });
      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta do Engenheiro.";
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    if (agent === "arquiteto") {
      const systemPrompt = {
        role: "system",
        content: `Você é um arquiteto especialista em projetos residenciais, comerciais e institucionais, com foco em estética, funcionalidade e viabilidade.\n\nSua tarefa é, a partir do briefing abaixo, gerar:\n- Estudo preliminar do projeto arquitetônico\n- Sugestões de layout, volumetria e setorização\n- Recomendações de materiais, acabamentos e paleta de cores\n- Dicas de iluminação, ventilação e conforto ambiental\n- Ideias para integração de ambientes e aproveitamento de espaço\n- Referências visuais e inspirações\n- Checklist de documentação e etapas do projeto\n\nUtilize o briefing abaixo como base para entregar um conceito arquitetônico criativo, funcional e alinhado às necessidades do usuário.\n\n---\n\n[Briefing do usuário:]\n${messages.map((m: any) => m.content).join("\n")}\n\n---\n\nResponda de forma criativa, detalhada e acessível.`
      };
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemPrompt],
        }),
      });
      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta do Arquiteto.";
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    if (agent === "orcamentos") {
      const systemPrompt = {
        role: "system",
        content: `Você é um especialista em orçamentos de obras e projetos, com experiência em estimativas de custos, composição de preços e análise de viabilidade financeira.\n\nSua tarefa é, a partir do briefing abaixo, gerar:\n- Estimativa detalhada de custos (materiais, mão de obra, equipamentos, taxas)\n- Sugestão de composição de preços por etapa ou serviço\n- Dicas para redução de custos e negociação com fornecedores\n- Recomendações de ferramentas e métodos para controle orçamentário\n- Checklist de documentos e informações necessárias para um orçamento preciso\n- Pontos de atenção para evitar surpresas financeiras\n\nUtilize o briefing abaixo como base para entregar um orçamento claro, realista e alinhado ao objetivo do projeto.\n\n---\n\n[Briefing do usuário:]\n${messages.map((m: any) => m.content).join("\n")}\n\n---\n\nResponda de forma detalhada, prática e transparente.`
      };
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemPrompt],
        }),
      });
      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta do Orçamentos.";
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    if (agent === "planejamento-obra") {
      const systemPrompt = {
        role: "system",
        content: `Você é um especialista em planejamento de obras, com experiência em cronogramas, gestão de recursos e acompanhamento de projetos.\n\nSua tarefa é, a partir do briefing abaixo, gerar:\n- Cronograma físico-financeiro resumido (principais etapas e prazos)\n- Sugestão de sequenciamento de atividades e alocação de recursos\n- Dicas para evitar atrasos e otimizar o fluxo de trabalho\n- Recomendações de ferramentas para acompanhamento e controle do projeto\n- Checklist de marcos importantes e entregáveis\n- Pontos críticos e riscos a serem monitorados\n\nUtilize o briefing abaixo como base para entregar um planejamento eficiente, realista e fácil de acompanhar.\n\n---\n\n[Briefing do usuário:]\n${messages.map((m: any) => m.content).join("\n")}\n\n---\n\nResponda de forma organizada, objetiva e orientada a resultados.`
      };
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemPrompt],
        }),
      });
      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta do Planejamento de Obra.";
      const newMessages = [...messages, { role: "assistant", content: reply }];
      await supabase.from('conversas').insert([
        {
          agent,
          messages: newMessages,
          user_id
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    // fallback: resposta simulada para outros agentes
    return NextResponse.json({ reply: "Esta é uma resposta simulada do agente." }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/agents] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}