// src/models/ItemModel.ts
export interface SizeStock {
  size: string; // ex: "PP", "P", "M", "G", "XG"
  qty: number;  // quantidade em estoque
}

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;    // ex: "Camisetas", "Calçados"
  price?: number;      // em reais (ex: 79.9)
  sizes?: string[];    // lista de tamanhos disponíveis (ex: ["P","M","G"])
  stock?: SizeStock[]; // quantidade por tamanho
  createdAt?: string;  // ISO string
}

export interface ItemsResponse {
  items: Item[];
  total: number;
}

/* Tipos para integração com IA (já existentes) */
export interface AIOpinionRequest {
  itemId: string;
  imageUrl: string;
  itemName: string;
  itemDescription: string;
}
export interface AIOpinionResponse {
  opinion: string;
  success: boolean;
  error?: string;
}
