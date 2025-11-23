"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateItem, uploadImageFile } from "@/services/productService";
import { Item } from "@/models/ItemModel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  onSuccess?: (updatedItem: Item) => void;
};

function fmtPrice(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function EditProductModal({ isOpen, onClose, item, onSuccess }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState<string>(item.price ? fmtPrice(item.price) : "");
  const [imageUrl, setImageUrl] = useState(item.imageUrl || "");
  const [file, setFile] = useState<File | null>(null);
  const [sizesInput, setSizesInput] = useState(item.sizes?.join(",") || "");
  const [stockInput, setStockInput] = useState(item.stock?.map((s) => s.qty).join(",") || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  function parseSizesAndStock(): { sizes: string[]; stock: { size: string; qty: number }[] } {
    const sizes = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const qtys = stockInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((n) => Number(n));

    const stock = sizes.map((size, idx) => ({
      size,
      qty: Number.isFinite(qtys[idx]) ? qtys[idx] : 0,
    }));
    return { sizes, stock };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !description || !category) {
      setError("Nome, descrição e categoria são obrigatórios.");
      return;
    }

    setSaving(true);

    try {
      // se tem arquivo novo, faz upload
      let finalImage = imageUrl;
      if (file && (!imageUrl || imageUrl.startsWith("blob:"))) {
        finalImage = await uploadImageFile(file);
      }

      const { sizes, stock } = parseSizesAndStock();
      const payload: any = {
        name,
        description,
        category,
        imageUrl: finalImage || undefined,
        sizes,
        stock,
      };

      if (price) {
        payload.price = Number(String(price).replace(",", "."));
      }

      console.log("📝 Enviando update para Firestore...", { id: item.id, payload });
      await updateItem(item.id, payload);
      console.log("✅ Update concluído! Atualizando UI...");
      
      // Atualiza o estado do item no componente pai para refletir mudanças imediatamente
      if (onSuccess) {
        const updatedItem: Item = {
          ...item,
          ...payload,
        };
        console.log("🔄 Estado frontend atualizado:", updatedItem);
        onSuccess(updatedItem);
      }
      
      onClose();
    } catch (err: any) {
      console.error("update product error:", err);
      setError("Erro ao salvar produto. Veja o console.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-auto max-h-[92vh]">
        {/* header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Editar Produto</h3>

          {/* X button */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Ex: Camiseta Básica"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Ex: Camisetas"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                placeholder="Descrição curta do produto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="79,90 ou 79.90"
              />
            </div>

            {/* Imagem URL + escolher arquivo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Imagem (URL)</label>

              <div className="mt-2 flex gap-2 items-center">
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2"
                  placeholder="https://..."
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  Escolher...
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">Ou envie um arquivo — o upload será feito automaticamente ao salvar (se aplicável).</p>

              {/* preview */}
              <div className="mt-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="preview"
                    className="w-48 h-48 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-md border bg-gray-50 flex items-center justify-center text-sm text-gray-400">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  if (f) {
                    const tmp = URL.createObjectURL(f);
                    setImageUrl(tmp);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tamanhos (vírgula separado)</label>
            <input
              value={sizesInput}
              onChange={(e) => setSizesInput(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="PP,P,M,G,XG"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque por tamanho (vírgula, mesma ordem)</label>
            <input
              value={stockInput}
              onChange={(e) => setStockInput(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="5,12,20,8,2"
            />
            <p className="text-xs text-gray-500 mt-1">Se não informar, quantidade será 0.</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancelar
            </button>

            <button type="submit" disabled={saving} className="px-5 py-2 bg-gray-900 text-white rounded-md">
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
