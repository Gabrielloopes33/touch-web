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
      const systemPrompt = {
        role: "system",
        content: `Você é um especialista em criação de Landing Pages altamente otimizadas para conversão.

Seu trabalho é gerar:
- Estrutura completa de seções para a landing page
- Wireframe textual para cada seção
- Copywriting completo e estratégico para toda a página
- Sugestões de paleta de cores, tipografia e estilo visual
- Indicação de componentes ideais do shadcn/ui
- Sugestões de bibliotecas extras úteis para UI/UX
- Recomendações de animações ou microinterações
- Arquitetura técnica ideal com Next.js + TailwindCSS

Utilize os dados abaixo como briefing completo para gerar a melhor landing possível, focando em performance, clareza, persuasão e escalabilidade:

---

**1. Objetivo principal da Landing Page**  
[Insira aqui o objetivo principal: capturar leads, apresentar produto, validar ideia, vender SaaS, etc.]

**2. Público-Alvo**  
[Descreva o público-alvo: ex: startups, PMEs, grandes empresas, nicho específico, etc.]  
[Nível de conhecimento técnico: baixo, médio, alto]

**3. Problema que o produto resolve**  
[Explique o problema que o produto resolve e a dor que o usuário sente atualmente]

**4. Solução**  
[Explique como o produto resolve o problema e quais os diferenciais competitivos]

**5. Proposta de Valor**  
[Escreva a proposta única de valor em poucas frases: ex: "automatizamos X", "reduzimos custo em Y%", etc.]

**6. Concorrentes ou referências**  
[Liste concorrentes com links]  
[Inclua referências visuais de páginas que você admira: ex: linear.app, raftt.io]

**7. Estilo visual desejado**  
[Ex: moderno, minimalista, dark, brutalista, enterprise, friendly, etc.]  
[Preferência de cores: claras, escuras, neon, etc.]  
[Tipografia preferida (caso tenha)]

**8. Funcionalidades técnicas desejadas**  
[ ] Multipage  
[ ] Single Page (SPA)  
[ ] SSR/SSG (para SEO)  
[Integrações desejadas: ex: CMS, Google Analytics, Hotjar, CRM, etc.]

**9. Tecnologias confirmadas**  
✅ Next.js  
✅ TailwindCSS  
✅ shadcn/ui  
[Outras libs confirmadas: ex: framer-motion, radix-ui, zustand, formik, etc.]

**10. Outros elementos importantes**  
[Conteúdos prontos: logo, imagens, ilustrações, textos]  
[Limitação de prazo ou orçamento?]

---

Com base nessas informações, gere a landing page completa seguindo as melhores práticas de UX, copywriting e engenharia de front-end. Priorize clareza, ação e impacto visual.`
      };

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemPrompt, ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          }))],
        }),
      });

      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Erro na resposta da OpenAI";
      return NextResponse.json({ reply }, { status: 200 });
    }

    // fallback: resposta simulada para outros agentes
    return NextResponse.json({ reply: "Esta é uma resposta simulada do agente." }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/agents] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
