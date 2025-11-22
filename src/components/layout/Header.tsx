// src/components/layout/Header.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateProductModal from "@/components/CreateProductModal";

export default function Header() {
  const { user, logout, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-bold text-gray-900">
          ClothingVision
        </Link>

        {/* Usuário + logout (lado a lado) */}
        <div className="flex items-center gap-4">
          {!loading && isAdmin && (
            <button
              onClick={() => setOpenCreate(true)}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
            >
              Criar Produto
            </button>
          )}

          {user ? (
            <>
              <span className="text-gray-700 text-sm">
                Logado como: <strong>{user.email}</strong>
              </span>

              <button
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 bg-gray-900 text-white text-sm rounded-md">
              Entrar
            </Link>
          )}
        </div>
      </div>

      {openCreate && <CreateProductModal isOpen={openCreate} onClose={() => setOpenCreate(false)} />}
    </header>
  );
}
