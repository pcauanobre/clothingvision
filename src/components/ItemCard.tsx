// src/components/ItemCard.tsx
"use client";

import Link from "next/link";
import { Item } from "@/models/ItemModel";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Use <img> em vez de next/image para evitar erro com hosts remotos não configurados */}
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.price && (
          <p className="text-2xl font-bold text-gray-900">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </p>
        )}

        <Link
          href={`/item/${item.id}`}
          className="block w-full py-3 bg-gray-900 text-white text-center rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Ver Mais
        </Link>
      </div>
    </div>
  );
}
