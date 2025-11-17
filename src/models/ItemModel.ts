// src/models/ItemModel.ts

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price?: number;
  createdAt?: string;
}

export interface AIOpinion {
  itemId: string;
  opinion: string;
  timestamp: string;
}

export interface ItemsResponse {
  items: Item[];
  total: number;
}

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
