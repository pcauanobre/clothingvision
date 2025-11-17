"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Coluna 1 */}
        <div>
          <h3 className="font-semibold mb-3">ClothingVision</h3>
          <p className="text-gray-300 text-sm">
            Estilo com Inteligência Artificial.
          </p>
        </div>

        {/* Coluna 2 */}
        <div>
          <h3 className="font-semibold mb-3">Links</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>
              <a href="/catalogo" className="hover:text-white">
                Catálogo
              </a>
            </li>
            <li>
              <a href="/home" className="hover:text-white">
                Home
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div>
          <h3 className="font-semibold mb-3">Contato</h3>
          <p className="text-gray-300 text-sm">
            contato@clothingvision.com
          </p>
        </div>

      </div>

      <div className="py-4 border-t border-gray-700 text-center text-gray-400 text-sm">
        © 2025 ClothingVision. Todos os direitos reservados.
      </div>
    </footer>
  );
}
