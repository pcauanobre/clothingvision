// app/item/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { itemService } from "@/services/itemService";
import { Item } from "@/models/ItemModel";
import AIOpinionModal from "@/components/AIOpinionModal";
import Loading from "@/components/Loading";

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const id = params.id as string;
        const fetchedItem = await itemService.getItemById(id);
        
        if (!fetchedItem) {
          router.push("/catalogo");
          return;
        }
        
        setItem(fetchedItem);
      } catch (error) {
        console.error("Erro ao carregar item:", error);
        router.push("/catalogo");
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Loading />
      </div>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Catálogo
          </Link>
        </div>
      </div>

      {/* Item Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px] bg-gray-100">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Category Badge */}
                <span className="inline-block px-4 py-2 bg-gray-100 text-sm font-medium text-gray-900 rounded-full">
                  {item.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {item.name}
                </h1>

                {/* Price */}
                {item.price && (
                  <p className="text-3xl font-bold text-gray-900">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>
                )}

                {/* Description */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">Sobre o Produto</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* AI Button */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Pedir Opinião para IA
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Receba sugestões de estilo e combinações personalizadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Opinion Modal */}
      <AIOpinionModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
