// src/services/aiService.ts

import { AIOpinionRequest, AIOpinionResponse } from "@/models/ItemModel";

export const aiService = {
  /**
   * Solicita opinião da IA sobre um item
   */
  async getItemOpinion(request: AIOpinionRequest): Promise<AIOpinionResponse> {
    try {
      const response = await fetch("/api/ai/opinion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: request.itemName,
          itemDescription: request.itemDescription,
          category: "roupa", // Pode expandir futuramente com categoria real do item
        }),
      });

      if (!response.ok) {
        console.error(`Erro ao obter opinião da IA: ${response.statusText}`);
        // Fallback para mock se API falhar
        return getMockOpinion(request);
      }

      const data: AIOpinionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao consultar IA:", error);
      // Fallback para mock se houver erro de rede
      return getMockOpinion(request);
    }
  },
};

/**
 * Resposta mockada da IA para fallback
 */
function getMockOpinion(request: AIOpinionRequest): AIOpinionResponse {
  const opinions = [
    `O ${request.itemName} é uma peça versátil e atemporal. Seu design minimalista permite combinações infinitas, desde looks casuais até composições mais elaboradas. Recomendo usar com jeans escuro e tênis brancos para um visual clean e moderno.`,
    
    `Essa peça é perfeita para quem busca conforto sem abrir mão do estilo. A ${request.itemName} pode ser usada em diversas ocasiões - trabalho, encontros casuais ou passeios. Combine com peças neutras para valorizar ainda mais seu design.`,
    
    `Excelente escolha! O ${request.itemName} está super em alta e combina com o estilo streetwear contemporâneo. Sugiro usar com peças oversized para um look despojado, ou com itens mais ajustados para equilibrar a composição.`,
    
    `Essa peça é um investimento certeiro no seu guarda-roupa. O ${request.itemName} tem qualidade aparente e um design que não sai de moda. Funciona bem em camadas para climas mais frios ou sozinho em dias mais quentes.`,
  ];

  const randomOpinion = opinions[Math.floor(Math.random() * opinions.length)];

  return {
    success: true,
    opinion: randomOpinion,
  };
}

