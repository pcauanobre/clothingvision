"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
  const { login, sendPasswordReset } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // forgot password modal
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, pass, remember);
      router.push("/home");
    } catch (err: any) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
    }
  }

  async function handleSendForgot() {
    setForgotMessage(null);
    setForgotLoading(true);
    try {
      await sendPasswordReset(forgotEmail);
      setForgotMessage("Link de redefinição enviado — verifique seu email.");
    } catch (err: any) {
      console.error(err);
      setForgotMessage("Erro ao enviar o email. Verifique o endereço e tente novamente.");
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-[#7F00FF] flex items-center justify-center text-white font-bold">
                CV
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">ClothingVision</div>
                <p className="text-xs text-gray-600">Por favor, informe seus dados</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <h1 className="text-2xl font-bold text-gray-900 text-center">Bem-vindo de volta</h1>

              {error && <div className="text-sm text-red-600 text-center">{error}</div>}

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Endereço de email"
                  className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Lembrar por 30 dias
                </label>

                <button
                  type="button"
                  onClick={() => { setForgotEmail(email); setForgotMessage(null); setShowForgot(true); }}
                  className="text-sm text-[#7F00FF] hover:underline"
                >
                  Esqueci a senha
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#7F00FF" }}
                className="w-full text-white py-3 rounded-md font-semibold hover:brightness-95 transition"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Não tem conta? <a href="/register" className="text-[#7F00FF] font-medium">Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Redefinição */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowForgot(false)}
          />

          {/* card */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 z-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Redefinir senha</h2>
            <p className="text-sm text-gray-600 mb-4">
              Digite seu e-mail e enviaremos um link para redefinir a senha.
            </p>

            <input
              type="email"
              placeholder="Seu email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40"
            />

            {forgotMessage && (
              <div className="mb-3 text-sm text-gray-800">{forgotMessage}</div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleSendForgot}
                disabled={forgotLoading}
                className="flex-1 bg-[#7F00FF] text-white py-2 rounded-md disabled:opacity-60"
              >
                {forgotLoading ? "Enviando..." : "Enviar link"}
              </button>

              <button
                onClick={() => setShowForgot(false)}
                className="flex-0 px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
