// app/shop/page.tsx
"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ProductCard from "@/src/components/ProductCard";
import { mockProducts, categories, banners } from "@/src/data/mockProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopPage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | null
  >(null);

  // Filtrar produtos
  const filteredProducts = mockProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategory !== selectedSubcategory)
      return false;
    return true;
  });

  // Produtos em destaque (com desconto)
  const featuredProducts = mockProducts.filter(
    (p) => p.discount && p.discount > 30
  );

  // Lançamentos
  const newProducts = mockProducts.filter((p) => p.isNew);

  // Mais vendidos
  const bestSellers = mockProducts.filter((p) => p.isBestSeller);

  // Navegar entre banners
  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Carrossel de Banners */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="min-w-full h-full relative bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8">
                      {banner.subtitle}
                    </p>
                    <a
                      href={banner.link}
                      className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                      APROVEITAR AGORA
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles do carrossel */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Faixas de destaque */}
        <section className="bg-yellow-400 py-3">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center">
              <p className="font-bold text-sm md:text-base">
                🎉 FRETE GRÁTIS acima de R$ 279
              </p>
              <p className="font-bold text-sm md:text-base">
                💳 ATÉ 7X SEM JUROS
              </p>
              <p className="font-bold text-sm md:text-base">
                🎁 15% DE CASHBACK com Cartão da Loja
              </p>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              Compre por Categoria
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory(null);
                  }}
                  className={`p-6 rounded-lg border-2 transition ${
                    selectedCategory === category.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <h3 className="text-lg font-bold text-center">
                    {category.name}
                  </h3>
                </button>
              ))}
            </div>

            {/* Subcategorias */}
            {selectedCategory && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {categories
                  .find((c) => c.id === selectedCategory)
                  ?.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubcategory(sub.id)}
                      className={`px-4 py-2 rounded-full transition ${
                        selectedSubcategory === sub.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-12 bg-gradient-to-b from-red-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">🔥 DESTAQUES DA SEMANA</h2>
              <p className="text-gray-600">
                Descontos imperdíveis de até 45% OFF
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Lançamentos */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">✨ LANÇAMENTOS</h2>
              <p className="text-gray-600">Confira as novidades da coleção</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Mais Vendidos */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">⭐ MAIS VENDIDOS</h2>
              <p className="text-gray-600">
                Os queridinhos dos nossos clientes
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Todos os Produtos (filtrados) */}
        {(selectedCategory || selectedSubcategory) && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  {selectedSubcategory
                    ? categories
                        .find((c) => c.id === selectedCategory)
                        ?.subcategories.find((s) => s.id === selectedSubcategory)
                        ?.name
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Banner de vantagens */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-xl font-bold mb-2">FRETE GRÁTIS</h3>
                <p>Nas compras acima de R$ 279</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-xl font-bold mb-2">TROCA FÁCIL</h3>
                <p>Primeira troca grátis em até 30 dias</p>
              </div>
              <div>
                <div className="text-4xl mb-3">💳</div>
                <h3 className="text-xl font-bold mb-2">PARCELAMENTO</h3>
                <p>Até 7x sem juros no cartão</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
