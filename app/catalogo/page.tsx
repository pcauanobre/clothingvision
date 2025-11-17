// app/catalogo/page.tsx

import { itemService } from "@/services/itemService";
import ItemCard from "@/components/ItemCard";

export default async function CatalogoPage() {
  const items = await itemService.getAllItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Nosso Catálogo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore nossa coleção cuidadosamente selecionada. Cuidadosamente escolhida para você.
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhum item disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
