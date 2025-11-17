// src/services/aiService.ts

import { AIOpinionRequest, AIOpinionResponse } from "@/models/ItemModel";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const aiService = {
  /**
   * Solicita opinião da IA sobre um item
   */
  async getItemOpinion(request: AIOpinionRequest): Promise<AIOpinionResponse> {
    // Por enquanto, retorna opinião mockada
    // Quando tiver backend com IA, descomente o código abaixo:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/ai/opinion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Erro ao obter opinião da IA: ${response.statusText}`);
      }

      const data: AIOpinionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao consultar IA:", error);
      return getMockOpinion(request);
    }
    */
    
    // Simula delay da IA para parecer real
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Retorna opinião mockada para desenvolvimento
    return getMockOpinion(request);
  },
};

/**
 * Resposta mockada da IA para desenvolvimento
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
