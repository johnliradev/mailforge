import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const {
      sender,
      recipient,
      subject,
      intention,
      tone,
      context,
      language,
      responseLength,
      hasAttachment,
    } = await req.json();

    let lengthText = "";
    switch (responseLength) {
      case "short":
        lengthText = "Responda de forma breve.";
        break;
      case "medium":
        lengthText = "Responda com um nível médio de detalhe.";
        break;
      case "long":
        lengthText = "Forneça uma resposta completa e detalhada.";
        break;
    }

    const prompt = `
        Você é um assistente de escrita de e-mails. Escreva um e-mail no idioma "${language}" com as seguintes características:
        - Remetente: ${sender ? sender : ""}
        - Destinatário: ${recipient}
        - Assunto: ${subject}
        - Intenção: ${intention}
        - Tom: ${tone}
        - Contexto: ${context}

        ${hasAttachment ? "- Mencione que um documento está anexado." : ""}
        O e-mail deve ser claro, bem estruturado e adequado ao tom e contexto especificados. Comece diretamente com uma saudação apropriada.
        ${lengthText}
        `;

    const maxTokens =
      responseLength === "short"
        ? 200
        : responseLength === "medium"
          ? 400
          : 800;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    });
    const email =
      completion.choices[0]?.message?.content || "Erro ao gerar e-mail.";

    return NextResponse.json({ email });
  } catch (error) {
    return NextResponse.json(
      { email: "Erro ao gerar o e-mail." },
      { status: 500 },
    );
  }
}
