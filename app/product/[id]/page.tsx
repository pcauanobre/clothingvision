// app/product/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ProductCard from "@/src/components/ProductCard";
import { mockProducts } from "@/src/data/mockProducts";
import {
  Heart,
  Truck,
  RotateCcw,
  CreditCard,
  Star,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = mockProducts.find((p) => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  // Produtos relacionados (mesma categoria)
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <a href="/shop" className="hover:text-blue-600">
              Início
            </a>
            <span className="mx-2">/</span>
            <a
              href={`/shop?category=${product.category}`}
              className="hover:text-blue-600 capitalize"
            >
              {product.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Produto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Galeria de Imagens */}
            <div>
              {/* Imagem principal */}
              <div className="relative aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navegação de imagens */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Badge de desconto */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    -{product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                        index === currentImageIndex
                          ? "border-blue-600"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div>
              {/* Categoria e nome */}
              <p className="text-sm text-gray-500 uppercase mb-2">
                {product.category} - {product.subcategory}
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Avaliação */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              {/* Preço */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                {product.originalPrice && (
                  <p className="text-lg text-gray-400 line-through mb-1">
                    De: R$ {product.originalPrice.toFixed(2)}
                  </p>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.discount && (
                    <span className="text-lg text-green-600 font-semibold">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">
                  ou 7x de R$ {(product.price / 7).toFixed(2)} sem juros
                </p>
                <p className="text-sm text-blue-600 font-medium mt-1">
                  15% de cashback com Cartão da Loja
                </p>
              </div>

              {/* Cores */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Cor: <span className="font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanhos */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">
                    Tamanho: {selectedSize && <span className="font-bold">{selectedSize}</span>}
                  </label>
                  <button className="text-sm text-blue-600 hover:underline">
                    Guia de tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantidade */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Quantidade
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 mb-6">
                <button
                  disabled={!selectedSize}
                  className={`flex-1 py-4 rounded-lg font-bold text-lg transition ${
                    selectedSize
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  ADICIONAR AO CARRINHO
                </button>
                <button className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Vantagens */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">
                    Frete grátis acima de R$ 279
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">
                    Primeira troca grátis em até 30 dias
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">
                    Até 7x sem juros no cartão
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">
                    Compra 100% segura e protegida
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Descrição do Produto</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Categoria:</span>{" "}
                  {product.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Cores disponíveis:</span>{" "}
                  {product.colors.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tamanhos:</span>{" "}
                  {product.sizes.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Você Também Pode Gostar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
