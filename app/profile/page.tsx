// app/profile/page.tsx
"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dados mockados do usuário
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    cpf: "000.000.000-00",
    phone: "(11) 99999-9999",
  };

  const recentOrders = [
    {
      id: "#12345",
      date: "15/11/2024",
      status: "Em trânsito",
      total: 189.8,
      items: 2,
    },
    {
      id: "#12344",
      date: "10/11/2024",
      status: "Entregue",
      total: 349.9,
      items: 3,
    },
    {
      id: "#12343",
      date: "05/11/2024",
      status: "Entregue",
      total: 129.9,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Menu lateral */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "overview"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" />
                      <span>Visão Geral</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "orders"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5" />
                      <span>Meus Pedidos</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "wishlist"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      <span>Lista de Desejos</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "addresses"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>Endereços</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("cards")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "cards"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <span>Cartões</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === "settings"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5" />
                      <span>Configurações</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-3">
              {/* Visão Geral */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Cards de estatísticas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <Package className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-gray-600">Pedidos Realizados</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <Heart className="w-8 h-8 text-red-500 mb-2" />
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-gray-600">Itens Favoritos</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <CreditCard className="w-8 h-8 text-green-600 mb-2" />
                      <p className="text-2xl font-bold">R$ 245</p>
                      <p className="text-gray-600">Cashback Disponível</p>
                    </div>
                  </div>

                  {/* Pedidos recentes */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Pedidos Recentes</h2>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Ver todos
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
                        >
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {order.date} · {order.items} item(s)
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              R$ {order.total.toFixed(2)}
                            </p>
                            <p
                              className={`text-sm ${
                                order.status === "Entregue"
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informações da conta */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Informações da Conta
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Nome</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">E-mail</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CPF</p>
                        <p className="font-medium">{user.cpf}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Editar informações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Meus Pedidos */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">Meus Pedidos</h2>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-lg font-bold">{order.id}</p>
                            <p className="text-sm text-gray-600">
                              Pedido realizado em {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              R$ {order.total.toFixed(2)}
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm ${
                                order.status === "Entregue"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                            Ver Detalhes
                          </button>
                          {order.status === "Entregue" && (
                            <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                              Comprar Novamente
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lista de Desejos */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">Lista de Desejos</h2>
                  <p className="text-gray-600 text-center py-12">
                    Sua lista de desejos está vazia. Adicione produtos que você
                    gostou!
                  </p>
                </div>
              )}

              {/* Endereços */}
              {activeTab === "addresses" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Meus Endereços</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Adicionar Endereço
                    </button>
                  </div>
                  <p className="text-gray-600 text-center py-12">
                    Nenhum endereço cadastrado
                  </p>
                </div>
              )}

              {/* Cartões */}
              {activeTab === "cards" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Meus Cartões</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Adicionar Cartão
                    </button>
                  </div>
                  <p className="text-gray-600 text-center py-12">
                    Nenhum cartão cadastrado
                  </p>
                </div>
              )}

              {/* Configurações */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">Configurações</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Alterar Senha
                      </label>
                      <input
                        type="password"
                        placeholder="Nova senha"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                      <input
                        type="password"
                        placeholder="Confirmar nova senha"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                    >
                      Salvar Alterações
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
