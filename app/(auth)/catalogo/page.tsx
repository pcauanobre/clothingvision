"use client";

import { useEffect, useState } from "react";
import { itemService } from "@/src/services/itemService";
import ItemCard from "@/src/components/ItemCard";
import Loading from "@/src/components/Loading";

export default function CatalogoPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await itemService.getAllItems();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Catálogo</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Nenhum item encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
