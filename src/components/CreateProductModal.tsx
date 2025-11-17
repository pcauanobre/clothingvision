// src/components/CreateProductModal.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageFile, createItem } from "@/services/productService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function fmtPrice(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function CreateProductModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sizesInput, setSizesInput] = useState(""); // ex: PP,P,M,G
  const [stockInput, setStockInput] = useState(""); // ex: 5,10,8,2
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
      // se tem arquivo e não tem uma imageUrl final (ex: escolheu arquivo local e não subiu), faz upload automático aqui
      let finalImage = imageUrl;
      if (file && (!imageUrl || imageUrl.startsWith("blob:"))) {
        finalImage = await uploadImageFile(file);
        setImageUrl(finalImage);
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
        // aceita vírgula ou ponto
        payload.price = Number(String(price).replace(",", "."));
      }

      // createItem retorna o id (ajuste se seu service retornar outro formato)
      const id = await createItem(payload);
      onClose();
      router.push(`/item/${id}`);
    } catch (err: any) {
      console.error("create product error:", err);
      setError("Erro ao salvar produto. Veja o console.");
    } finally {
      setSaving(false);
    }
  }

  function randomizeAll() {
    setError(null);

    const nameOptions = [
      "Camiseta Urbana",
      "Jaqueta Street",
      "Tênis Minimal",
      "Moletom Cozy",
      "Boné Classic",
      "Calça Cargo Pro",
      "Vestido Flow",
      "Camisa Social Slim",
    ];

    const descOptions = [
      "Peça com caimento moderno e tecido de alta qualidade.",
      "Design pensado para o dia a dia com conforto superior.",
      "A peça combina estilo e funcionalidade para qualquer ocasião.",
      "Acabamento premium e corte contemporâneo.",
      "Versátil, combina com looks casuais e arrumados.",
    ];

    const categoryOptions = ["Camisetas", "Jaquetas", "Calçados", "Moletons", "Acessórios", "Calças", "Vestidos"];

    const images = [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    ];

    const sizesSets = [
      ["PP", "P", "M", "G", "XG"],
      ["P", "M", "G"],
      ["único"],
      ["38", "39", "40", "41", "42"],
    ];

    // pick random helpers
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const rndName = pick(nameOptions);
    const rndDesc = pick(descOptions);
    const rndCategory = pick(categoryOptions);
    const rndImage = pick(images);

    // price random between 29.9 and 499.9
    const rndPrice = Math.round((29.9 + Math.random() * (499.9 - 29.9)) * 100) / 100;

    const sizes = pick(sizesSets);
    const stock = sizes.map((s) => Math.floor(1 + Math.random() * 30));

    setName(rndName);
    setDescription(rndDesc);
    setCategory(rndCategory);
    setPrice(fmtPrice(rndPrice));
    setImageUrl(rndImage);
    setFile(null); // random image is from url, not local file
    setSizesInput(sizes.join(","));
    setStockInput(stock.join(","));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-auto max-h-[92vh]">
        {/* header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-semibold">Criar Produto</h3>

            {/* Randomizar no topo */}
            <button
              type="button"
              onClick={randomizeAll}
              className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium"
            >
              Randomizar
            </button>
          </div>

          {/* X button maior e com traço mais grosso */}
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

                {/* Escolher arquivo (abre seletor) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  Escolher...
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">Ou envie um arquivo — o upload será feito automaticamente ao salvar (se aplicável).</p>

              {/* preview maior embaixo do input */}
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
                    // mostra preview local temporário
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

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setCategory("");
                  setPrice("");
                  setImageUrl("");
                  setFile(null);
                  setSizesInput("");
                  setStockInput("");
                  setError(null);
                }}
                className="px-4 py-2 border rounded-md"
              >
                Limpar
              </button>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="px-5 py-2 bg-gray-900 text-white rounded-md">
                {saving ? "Salvando..." : "Salvar Produto"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
