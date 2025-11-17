"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user]);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
              ClothingVision
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Estilo com inteligência: descubra peças únicas e receba a opinião de uma IA sobre estilo.
            </p>

            <div className="flex justify-center items-center mt-12">
              <Link
                href="/catalogo"
                className="px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Explorar Catálogo
              </Link>
            </div>
          </div>
        </div>

        {/* DECORATIONS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nosso Catálogo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore nossa coleção cuidadosamente selecionada e receba opiniões personalizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* feature 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Visualização Detalhada</h3>
              <p className="text-gray-600">
                Veja cada peça em alta qualidade com descrições completas.
              </p>
            </div>

            {/* feature 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Opinião por IA</h3>
              <p className="text-gray-600">
                Receba sugestões de estilo personalizadas.
              </p>
            </div>

            {/* feature 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Design Moderno</h3>
              <p className="text-gray-600">
                Interface limpa e intuitiva para melhor experiência.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
