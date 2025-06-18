// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';

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
      return NextResponse.json({ reply }, { status: 200 });
    }

    // fallback: resposta simulada para outros agentes
    return NextResponse.json({ reply: "Esta é uma resposta simulada do agente." }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/agents] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
