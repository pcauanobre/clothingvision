// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Banner de promoção */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>
          60 dias para pagar + 15% de cashback* com Cartões da loja |{" "}
          <span className="font-bold">APROVEITE</span>
        </p>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/shop" className="text-2xl font-bold text-gray-800">
            <span className="text-blue-600">Clothing</span>Vision
          </Link>

          {/* Barra de busca - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Ícones de ação */}
          <div className="flex items-center gap-6">
            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2 hover:text-blue-600 transition"
            >
              <User className="w-6 h-6" />
              <span className="text-sm">Minha Conta</span>
            </Link>

            <Link
              href="/profile/wishlist"
              className="hidden md:block hover:text-blue-600 transition relative"
            >
              <Heart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              href="/cart"
              className="hover:text-blue-600 transition relative"
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Menu mobile */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Barra de busca - Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navegação - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex items-center justify-center gap-8 py-4">
            <li>
              <Link
                href="/shop?category=feminino"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                FEMININO
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=masculino"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                MASCULINO
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=infantil"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                INFANTIL
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=esportes"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                ESPORTES
              </Link>
            </li>
            <li>
              <Link
                href="/shop?sale=true"
                className="text-red-600 hover:text-red-700 font-bold transition"
              >
                PROMOÇÕES
              </Link>
            </li>
            <li>
              <Link
                href="/shop?new=true"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                LANÇAMENTOS
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=feminino"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FEMININO
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=masculino"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  MASCULINO
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=infantil"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  INFANTIL
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=esportes"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ESPORTES
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?sale=true"
                  className="block text-red-600 hover:text-red-700 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PROMOÇÕES
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?new=true"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LANÇAMENTOS
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
