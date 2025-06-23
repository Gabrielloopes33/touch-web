// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/* ----------------------------------------------------------------– GET */
export async function GET() {
  return NextResponse.json({ reply: 'API de agentes ativa.' }, { status: 200 });
}

/* ----------------------------------------------------------------– POST */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agent } = body;

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
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
        }
      ]);
      return NextResponse.json({ reply }, { status: 200 });
    }

    // Adicionado o tratamento para o agente "produtor-conteudo"
    if (agent === "produtor-conteudo") {
      const systemPrompt = {
        role: "system",
        content: `Você é um especialista em produção de conteúdo digital para web, com foco em copywriting, SEO, storytelling e engajamento.\n\nSua tarefa é, a partir do briefing abaixo, gerar:\n- Estrutura de tópicos e seções para o conteúdo\n- Copywriting persuasivo e criativo para cada seção\n- Sugestões de títulos, subtítulos e CTAs\n- Recomendações de palavras-chave para SEO\n- Dicas de storytelling e tom de voz\n- Sugestões de imagens, ilustrações ou recursos visuais\n- Checklist de boas práticas para publicação\n\nUtilize o briefing abaixo como base para entregar um conteúdo completo, otimizado e pronto para publicação.\n\n---\n\n[Briefing do usuário:]\n${messages.map((m: any) => m.content).join("\n")}\n\n---\n\nResponda de forma clara, organizada e com foco em resultados.`
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
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta do Produtor de Conteúdo.";
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
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
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
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
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
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
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
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
      await supabase.from('conversas').insert([
        {
          agent,      // nome do agente (ex: 'engenheiro')
          messages    // array de mensagens do chat
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