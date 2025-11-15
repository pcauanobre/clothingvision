// app/checkout/page.tsx
"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { CreditCard, MapPin, Truck, Lock } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  // Resumo do pedido (mock)
  const orderSummary = {
    items: 2,
    subtotal: 189.8,
    shipping: 0,
    total: 189.8,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          {/* Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-2 text-center">Entrega</span>
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-2 text-center">Pagamento</span>
              </div>
              <div className={`h-1 flex-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`} />
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-2 text-center">Confirmação</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              {/* Etapa 1: Endereço de Entrega */}
              {step === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">Endereço de Entrega</h2>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="João Silva"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CPF *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          CEP *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="00000-000"
                        />
                      </div>
                      <button
                        type="button"
                        className="self-end bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                      >
                        Buscar
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Apto, Bloco, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Centro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="São Paulo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Estado *
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Selecione</option>
                        <option>SP</option>
                        <option>RJ</option>
                        <option>MG</option>
                        <option>PR</option>
                        {/* Mais estados... */}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                    >
                      Continuar para Pagamento
                    </button>
                  </form>
                </div>
              )}

              {/* Etapa 2: Pagamento */}
              {step === 2 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">Forma de Pagamento</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Cartão de Crédito */}
                    <div className="border-2 border-blue-600 rounded-lg p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          defaultChecked
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium">Cartão de Crédito</p>
                          <p className="text-sm text-gray-600">
                            Até 7x sem juros
                          </p>
                        </div>
                      </label>

                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Número do cartão"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Nome no cartão"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Número de parcelas</option>
                          <option>1x de R$ 189,80 sem juros</option>
                          <option>2x de R$ 94,90 sem juros</option>
                          <option>3x de R$ 63,27 sem juros</option>
                          <option>7x de R$ 27,11 sem juros</option>
                        </select>
                      </div>
                    </div>

                    {/* Pix */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="payment" className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="font-medium">Pix</p>
                          <p className="text-sm text-gray-600">
                            Aprovação imediata
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Boleto */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="payment" className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="font-medium">Boleto Bancário</p>
                          <p className="text-sm text-gray-600">
                            Vencimento em 3 dias úteis
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                </div>
              )}

              {/* Etapa 3: Confirmação */}
              {step === 3 && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Pedido Confirmado!</h2>
                  <p className="text-gray-600 mb-2">
                    Número do pedido: <span className="font-bold">#12345</span>
                  </p>
                  <p className="text-gray-600 mb-8">
                    Enviamos um e-mail com os detalhes do seu pedido
                  </p>

                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <Truck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="font-medium mb-1">
                      Previsão de entrega: 5 a 7 dias úteis
                    </p>
                    <p className="text-sm text-gray-600">
                      Você pode acompanhar seu pedido na área "Meus Pedidos"
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="/profile/orders"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                    >
                      Acompanhar Pedido
                    </a>
                    <a
                      href="/shop"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Continuar Comprando
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({orderSummary.items} itens)</span>
                    <span>R$ {orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">GRÁTIS</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span>R$ {orderSummary.total.toFixed(2)}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Seus dados estão protegidos com criptografia SSL
                    </p>
                  </div>
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
