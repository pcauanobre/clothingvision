// src/components/Footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Atendimento */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Formas de Pagamento
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Dúvidas Frequentes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Institucional
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Nossas Lojas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Programa de Afiliados
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Sustentabilidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Cartão da Loja */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Cartão da Loja
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Solicite seu Cartão
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Vantagens
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Fatura Digital
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  2ª Via de Fatura
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais e Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Acompanhe a ClothingVision
            </h3>
            <div className="flex gap-4 mb-6">
              <Link
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">
                Receba nossas novidades
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Métodos de pagamento */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-white font-semibold mb-4">
            Formas de Pagamento
          </h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              "Visa",
              "Mastercard",
              "Elo",
              "Amex",
              "Pix",
              "Boleto",
              "Cartão da Loja",
            ].map((payment) => (
              <div
                key={payment}
                className="bg-white px-4 py-2 rounded text-gray-900 text-sm font-medium"
              >
                {payment}
              </div>
            ))}
          </div>

          <h4 className="text-white font-semibold mb-4">Segurança</h4>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white px-4 py-2 rounded text-gray-900 text-sm font-medium">
              SSL Secure
            </div>
            <div className="bg-white px-4 py-2 rounded text-gray-900 text-sm font-medium">
              Site Seguro
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2024 ClothingVision - Todos os direitos reservados</p>
          <p className="mt-2">
            CNPJ: 00.000.000/0001-00 | Endereço: Rua Exemplo, 123 - São Paulo,
            SP
          </p>
        </div>
      </div>
    </footer>
  );
}
