// src/components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/src/data/mockProducts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        {/* Badge de desconto */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            -{product.discount}%
          </div>
        )}

        {/* Badge de novo */}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            NOVO
          </div>
        )}

        {/* Badge de mais vendido */}
        {product.isBestSeller && !product.isNew && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            BEST SELLER
          </div>
        )}

        {/* Botão de favoritar */}
        <button
          className="absolute top-2 right-2 z-20 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50"
          onClick={(e) => {
            e.preventDefault();
            // Adicionar à lista de desejos
          }}
        >
          <Heart className="w-5 h-5 text-gray-700 hover:text-red-500" />
        </button>

        {/* Imagem do produto */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Imagem hover - segunda foto */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </div>

        {/* Informações do produto */}
        <div className="p-4">
          {/* Categoria */}
          <p className="text-xs text-gray-500 uppercase mb-1">
            {product.category}
          </p>

          {/* Nome do produto */}
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>

          {/* Avaliação */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Cores disponíveis */}
          <div className="flex gap-1 mb-3">
            {product.colors.slice(0, 5).map((color: string, index: number) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor:
                    color.toLowerCase() === "preto"
                      ? "#000"
                      : color.toLowerCase() === "branco"
                      ? "#fff"
                      : color.toLowerCase() === "azul"
                      ? "#1e40af"
                      : color.toLowerCase() === "vermelho"
                      ? "#dc2626"
                      : color.toLowerCase() === "verde"
                      ? "#16a34a"
                      : color.toLowerCase() === "rosa"
                      ? "#ec4899"
                      : color.toLowerCase() === "amarelo"
                      ? "#eab308"
                      : color.toLowerCase() === "cinza"
                      ? "#6b7280"
                      : "#9ca3af",
                }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-500">
                +{product.colors.length - 5}
              </span>
            )}
          </div>

          {/* Preço */}
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          {/* Parcelamento */}
          <p className="text-xs text-gray-500 mt-1">
            ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
          </p>
        </div>
      </Link>

      {/* Botão de compra rápida */}
      <button
        className="absolute bottom-4 left-4 right-4 bg-blue-600 text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700 font-medium"
        onClick={(e) => {
          e.preventDefault();
          // Adicionar ao carrinho
        }}
      >
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}
