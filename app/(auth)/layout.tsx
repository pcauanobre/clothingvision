import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/src/context/AuthContext";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
