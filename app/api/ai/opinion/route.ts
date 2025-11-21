// app/api/ai/opinion/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemName, itemDescription, category } = body;

    // Cria o prompt para a IA
    const prompt = `Analise este item de moda e forneça uma opinião profissional e útil:

Item: ${itemName}
${itemDescription ? `Descrição: ${itemDescription}` : ''}
${category ? `Categoria: ${category}` : ''}

Forneça uma análise estruturada seguindo este formato:

**Sobre a peça:**
[1-2 frases sobre o estilo e versatilidade]

**Combinações sugeridas:**
[3-4 sugestões específicas de peças para combinar, sendo prático]

**Ocasiões ideais:**
[Onde e quando usar esta peça]

Use uma linguagem elegante mas acessível. Seja objetivo e útil. Máximo 8-10 linhas.`;

    // Chama a API do Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Você é um consultor de moda profissional que oferece análises sofisticadas e práticas. Suas respostas são elegantes, objetivas e cheias de informações úteis sobre styling e combinações."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Modelo rápido e versátil do Groq
      temperature: 0.7,
      max_tokens: 400,
    });

    const opinion = chatCompletion.choices[0]?.message?.content || "Desculpe, não consegui gerar uma opinião no momento.";

    return NextResponse.json({
      success: true,
      opinion,
    });
  } catch (error: any) {
    console.error("Erro na API do Groq:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro ao processar sua solicitação",
      },
      { status: 500 }
    );
  }
}
