// app/(auth)/item/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { itemService } from "@/src/services/itemService";
import Loading from "@/src/components/Loading";
import AIOpinionModal from "@/src/components/AIOpinionModal";
import { Item } from "@/models/ItemModel";

export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("ID do item não informado.");
      setLoading(false);
      return;
    }

    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await itemService.getItemById(id);
        if (!data) {
          setError("Item não encontrado.");
          setItem(null);
        } else if (mounted) {
          setItem(data);
        }
      } catch (err) {
        console.error("Erro ao buscar item:", err);
        setError("Erro ao carregar item. Veja o console.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/catalogo")}
            className="px-4 py-2 bg-gray-900 text-white rounded-md"
          >
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }
  if (!item) return null;

  function fmtPrice(n?: number) {
    if (n == null) return null;
    return n.toFixed(2).replace(".", ",");
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: imagem */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-50">
            {item.imageUrl ? (
              // img em vez de next/image para suportar temporárias (objectURL) e remote URLs sem problema
              <img src={item.imageUrl} alt={item.name} className="w-full h-[640px] object-cover" />
            ) : (
              <div className="w-full h-[420px] flex items-center justify-center bg-gray-100 text-gray-400">
                Sem imagem
              </div>
            )}
          </div>

          {/* meta info abaixo da imagem */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs text-gray-500">Categoria</div>
              <div className="font-medium text-gray-900">{item.category || "—"}</div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs text-gray-500">Criado em</div>
              <div className="font-medium text-gray-900">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Right: infos */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{item.name}</h1>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>

          {item.price != null && (
            <div>
              <div className="text-sm text-gray-500">Preço</div>
              <div className="text-3xl font-bold text-gray-900 mt-1">R$ {fmtPrice(item.price)}</div>
            </div>
          )}

          {/* tamanhos */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <div className="text-sm text-gray-500">Tamanhos disponíveis</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.sizes.map((s) => (
                  <span key={s} className="px-3 py-1 border rounded-full text-sm text-gray-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* estoque por tamanho */}
          {item.stock && item.stock.length > 0 && (
            <div>
              <div className="text-sm text-gray-500">Estoque por tamanho</div>
              <div className="mt-3 bg-white border rounded-xl p-4">
                <div className="grid grid-cols-3 gap-3 text-sm text-gray-700">
                  <div className="font-semibold">Tamanho</div>
                  <div className="font-semibold">Quantidade</div>
                  <div className="font-semibold text-right">Status</div>
                </div>

                <div className="mt-3 space-y-2">
                  {item.stock.map((s) => (
                    <div key={s.size} className="grid grid-cols-3 gap-3 items-center text-sm">
                      <div>{s.size}</div>
                      <div>{s.qty}</div>
                      <div className="text-right">
                        {s.qty > 10 ? (
                          <span className="text-green-600 font-medium">Em estoque</span>
                        ) : s.qty > 0 ? (
                          <span className="text-yellow-600 font-medium">Pouco</span>
                        ) : (
                          <span className="text-red-600 font-medium">Esgotado</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ações */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiOpen(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Pedir Opinião da IA
            </button>

            <button
              onClick={() => router.push("/catalogo")}
              className="px-4 py-2 text-gray-700 underline"
            >
              Voltar ao Catálogo
            </button>
          </div>
        </div>
      </div>

      {/* IA modal */}
      <AIOpinionModal item={item} isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
