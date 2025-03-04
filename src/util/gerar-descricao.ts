import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.API_KEY,
});

export const gerarDescricao = async (topicos: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente útil que pode gerar descrições baseadas em tópicos.",
        },
        {
          role: "user",
          content: `Gere uma descrição para os seguintes tópicos: ${topicos}`,
        },
      ],
      model: "deepseek-chat",
    });
    const descricao = response.choices[0]?.message?.content;
    if (!descricao) {
      throw new Error("Descrição não gerada pela IA");
    }
    return descricao;
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    throw new Error("Erro ao gerar descrição");
  }
};
