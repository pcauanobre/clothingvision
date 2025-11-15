// app/cart/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { mockProducts } from "@/src/data/mockProducts";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

// Mock de itens no carrinho
const mockCartItems = [
  {
    id: "1",
    product: mockProducts[0],
    quantity: 2,
    size: "M",
    color: "Preto",
  },
  {
    id: "2",
    product: mockProducts[3],
    quantity: 1,
    size: "40",
    color: "Azul Escuro",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [cupomCode, setCupomCode] = useState("");

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 279 ? 0 : 15.9;
  const discount = 0; // Desconto do cupom
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione produtos para continuar comprando
            </p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Continuar Comprando
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Meu Carrinho</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 mb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0"
                  >
                    {/* Imagem do produto */}
                    <Link
                      href={`/product/${item.product.id}`}
                      className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Informações do produto */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="block"
                      >
                        <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition">
                          {item.product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 mb-2">
                        Cor: {item.color} | Tamanho: {item.size}
                      </p>

                      {/* Preço e controles - Desktop */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            {item.product.originalPrice && (
                              <p className="text-sm text-gray-400 line-through">
                                R${" "}
                                {(
                                  item.product.originalPrice * item.quantity
                                ).toFixed(2)}
                              </p>
                            )}
                            <p className="text-xl font-bold">
                              R${" "}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition p-2"
                            title="Remover item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Preço e controles - Mobile */}
                      <div className="sm:hidden space-y-3 mt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition p-2"
                            title="Remover item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="text-right">
                          {item.product.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              R${" "}
                              {(
                                item.product.originalPrice * item.quantity
                              ).toFixed(2)}
                            </p>
                          )}
                          <p className="text-xl font-bold">
                            R$ {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cupom de desconto */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium mb-2">
                    Cupom de Desconto
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cupomCode}
                      onChange={(e) => setCupomCode(e.target.value)}
                      placeholder="Digite seu cupom"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>

              {/* Continuar comprando */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4 font-medium"
              >
                ← Continuar Comprando
              </Link>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} itens)</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">
                          GRÁTIS
                        </span>
                      ) : (
                        `R$ ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-xl font-bold mb-6 pt-6 border-t border-gray-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                {/* Parcelamento */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-900 font-medium">
                    Em até 7x de R$ {(total / 7).toFixed(2)} sem juros
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    ou 15% de cashback com Cartão da Loja
                  </p>
                </div>

                {subtotal < 279 && (
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-sm">
                    <p className="text-yellow-900 font-medium">
                      Faltam apenas R$ {(279 - subtotal).toFixed(2)} para
                      FRETE GRÁTIS! 🎉
                    </p>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg mb-3"
                >
                  Finalizar Compra
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </Link>

                <div className="text-center text-sm text-gray-600 space-y-1">
                  <p>✓ Compra 100% segura</p>
                  <p>✓ Primeira troca grátis</p>
                  <p>✓ Até 7x sem juros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
