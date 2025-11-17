"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { itemService } from "@/src/services/itemService";
import Loading from "@/src/components/Loading";
import AIOpinionModal from "@/src/components/AIOpinionModal";

export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await itemService.getItemById(id);
      if (!data) {
        return router.push("/catalogo");
      }
      setItem(data);
      setLoading(false);
    }

    if (id) load();
  }, [id, router]);

  if (loading) return <Loading />;
  if (!item) return null;

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">
      {/* Item Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>

          <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>

          {item.price && (
            <p className="text-3xl font-bold text-gray-900">
              R$ {item.price.toFixed(2).replace(".", ",")}
            </p>
          )}

          <button
            onClick={() => setAiOpen(true)}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Pedir Opinião da IA
          </button>

          <button
            onClick={() => router.push("/catalogo")}
            className="px-4 py-2 text-gray-700 underline text-sm"
          >
            Voltar ao Catálogo
          </button>
        </div>
      </div>

      {/* Modal da IA */}
      <AIOpinionModal item={item} isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
