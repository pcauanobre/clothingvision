"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!user) return null; // redirecionando

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Bem-vindo(a): <strong>{user.email}</strong></p>
      <div className="mt-4">
        <button onClick={async ()=>{ await logout(); router.push("/login"); }} className="px-3 py-2 bg-red-600 text-white rounded">
          Logout
        </button>
      </div>
    </main>
  );
}
