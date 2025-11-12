// app/reset-password/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/src/lib/firebase";

/**
 * Versão *apenas opener*:
 * - tenta redirecionar a aba que abriu (window.opener) e fecha a aba atual.
 * - se opener não existir / não permitir redirecionar, **mostra o formulário nesta aba**.
 *
 * IMPORTANTE: funciona somente quando
 * 1) a aba X está aberta na mesma origem (http://localhost:3000),
 * 2) o clique no e-mail abriu a aba Y e definiu window.opener (navegador padrão).
 * Caso contrário, não há como forçar o redirecionamento para a aba X.
 */

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "no-code"
  >("idle");

  useEffect(() => {
    if (!oobCode) {
      setStatus("no-code");
      return;
    }

    // SOMENTE OPENER: tenta redirecionar a aba que abriu essa (se existir e mesma origem).
    try {
      if (typeof window !== "undefined" && window.opener && !window.opener.closed) {
        const canonical = `${window.location.origin}/reset-password?oobCode=${encodeURIComponent(
          oobCode
        )}${email ? `&email=${encodeURIComponent(email)}` : ""}`;

        try {
          // Redireciona a aba opener para a URL canônica
          window.opener.location.href = canonical;
          // Fecha a aba atual (a que foi aberta pelo clique no e-mail)
          (window as any).close();
          return; // se fechar, nada mais a fazer
        } catch (err) {
          // Se falhar (cross-origin ou bloqueio), prossegue e renderiza o form aqui.
          console.warn("[Reset] opener redirect failed:", err);
        }
      }
    } catch (err) {
      console.warn("[Reset] opener check error:", err);
    }

    // Se não retornou (opener não existe ou não foi possível fechar), renderiza o form nesta aba.
  }, [oobCode, email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!oobCode) {
      setError("Código inválido. Solicite novamente a redefinição.");
      setStatus("no-code");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("As senhas não conferem.");
      return;
    }

    setStatus("loading");
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus("success");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      console.error("confirmPasswordReset error:", err);
      const code = err?.code || err?.message || String(err);
      if (String(code).includes("expired") || String(code).includes("expired-action-code") || String(code).includes("auth/expired-action-code")) {
        setError("O link expirou. Solicite um novo link de redefinição.");
      } else if (String(code).includes("invalid") || String(code).includes("invalid-action-code") || String(code).includes("auth/invalid-action-code")) {
        setError("Link inválido. Solicite um novo link de redefinição.");
      } else {
        setError("Erro ao redefinir a senha. Tente novamente.");
      }
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#7F00FF] mb-4">Redefinir senha</h1>

        {!oobCode || status === "no-code" ? (
          <div className="text-center text-sm text-red-600">
            Código de redefinição não encontrado. Solicite um novo link em sua conta.
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-center mb-4">
              {email ? `Redefina a senha para ${email}` : "Crie uma nova senha para sua conta."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                {password && password.length < 6 && <div className="text-xs text-red-600 mt-1">Senha muito curta — pelo menos 6 caracteres.</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirme a nova senha</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/40 bg-white"
                  placeholder="Repita a nova senha"
                  required
                />
                {confirm && password !== confirm && <div className="text-xs text-red-600 mt-1">As senhas não conferem.</div>}
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button type="submit" disabled={status === "loading"} style={{ backgroundColor: "#7F00FF" }} className="w-full text-white py-3 rounded-md font-semibold hover:brightness-95 transition">
                {status === "loading" ? "Salvando..." : "Salvar nova senha"}
              </button>
            </form>

            {status === "success" && <p className="text-green-600 text-center mt-4">Senha redefinida com sucesso! Redirecionando para o login...</p>}
            {status === "error" && <p className="text-red-600 text-center mt-4">Ocorreu um erro ao redefinir a senha.</p>}
          </>
        )}
      </div>
    </div>
  );
}
