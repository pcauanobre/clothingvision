// src/services/itemService.ts

import { Item, ItemsResponse } from "@/models/ItemModel";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const itemService = {
  /**
   * Busca todos os itens do catálogo
   */
  async getAllItems(): Promise<Item[]> {
    // Por enquanto, retorna dados mockados
    // Quando tiver backend, descomente o código abaixo:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar itens: ${response.statusText}`);
      }

      const data: ItemsResponse = await response.json();
      return data.items;
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      return getMockItems();
    }
    */
    
    // Retorna dados mockados para desenvolvimento
    return getMockItems();
  },

  /**
   * Busca um item específico por ID
   */
  async getItemById(id: string): Promise<Item | null> {
    // Por enquanto, retorna dados mockados
    // Quando tiver backend, descomente o código abaixo:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Erro ao buscar item: ${response.statusText}`);
      }

      const item: Item = await response.json();
      return item;
    } catch (error) {
      console.error(`Erro ao buscar item ${id}:`, error);
      const mockItems = getMockItems();
      return mockItems.find((item) => item.id === id) || null;
    }
    */
    
    // Retorna mock para desenvolvimento
    const mockItems = getMockItems();
    return mockItems.find((item) => item.id === id) || null;
  },
};

/**
 * Dados mockados para desenvolvimento
 */
function getMockItems(): Item[] {
  return [
    {
      id: "1",
      name: "Camiseta Básica Preta",
      description: "Camiseta 100% algodão com corte moderno e confortável. Perfeita para o dia a dia.",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      category: "Camisetas",
      price: 79.90,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Tênis Casual Branco",
      description: "Tênis versátil em couro sintético, ideal para looks casuais e elegantes.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      category: "Calçados",
      price: 299.90,
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Boné Streetwear",
      description: "Boné ajustável com design urbano e moderno. Proteção e estilo em um só produto.",
      imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      category: "Acessórios",
      price: 89.90,
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Jaqueta Jeans",
      description: "Jaqueta jeans clássica com lavagem moderna. Essencial para qualquer guarda-roupa.",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      category: "Jaquetas",
      price: 249.90,
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Calça Cargo",
      description: "Calça cargo com múltiplos bolsos e tecido resistente. Conforto e funcionalidade.",
      imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      category: "Calças",
      price: 189.90,
      createdAt: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Moletom Oversized",
      description: "Moletom com modelagem ampla e tecido premium. Conforto máximo para dias frios.",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      category: "Moletons",
      price: 169.90,
      createdAt: new Date().toISOString(),
    },
  ];
}
