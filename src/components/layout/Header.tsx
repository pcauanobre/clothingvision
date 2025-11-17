"use client";

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/home" className="text-2xl font-bold text-gray-900">
          ClothingVision
        </Link>

        {/* Usuário + logout (lado a lado) */}
        {user && (
          <div className="flex items-center gap-4">
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
          </div>
        )}
      </div>
    </header>
  );
}
