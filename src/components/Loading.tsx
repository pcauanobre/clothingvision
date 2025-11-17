// src/components/Loading.tsx

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="space-y-4 text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 text-sm">Carregando...</p>
      </div>
    </div>
  );
}
