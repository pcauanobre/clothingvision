"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name || !form.email || !form.password) {
      setError("Nome, email e senha são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(
        form.name,
        form.email,
        form.password,
        form.phone,
        Number(form.age || 0),
        form.isAdmin
      );
      router.push("/home");
    } catch (err: any) {
      setError("Erro ao registrar usuário.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-[#7F00FF] flex items-center justify-center text-white font-bold">
              CV
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">ClothingVision</div>
              <p className="text-xs text-gray-600">Crie sua conta</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="p-8 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Criar conta
            </h1>

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Nome completo"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
              />

              <input
                name="password"
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Telefone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
              />

              <input
                name="age"
                type="number"
                placeholder="Idade"
                value={form.age}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                name="isAdmin"
                type="checkbox"
                checked={form.isAdmin}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Registrar como administrador (apenas demo)
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#7F00FF" }}
              className="w-full text-white py-3 rounded-md font-semibold hover:brightness-95 transition"
            >
              {loading ? "Registrando..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Já tem conta?{" "}
              <a href="/login" className="text-[#7F00FF] font-medium">
                Entrar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
