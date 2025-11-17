// src/components/AIOpinionModal.tsx
"use client";

import { useState } from "react";
import { aiService } from "@/services/aiService";
import { Item } from "@/models/ItemModel";

interface AIOpinionModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIOpinionModal({ item, isOpen, onClose }: AIOpinionModalProps) {
  const [opinion, setOpinion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const handleRequestOpinion = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getItemOpinion({
        itemId: item.id,
        imageUrl: item.imageUrl,
        itemName: item.name,
        itemDescription: item.description,
      });

      if (response.success) {
        setOpinion(response.opinion);
        setHasRequested(true);
      } else {
        setOpinion("Desculpe, não foi possível obter uma opinião no momento.");
      }
    } catch (error) {
      console.error("Erro ao solicitar opinião:", error);
      setOpinion("Erro ao conectar com o serviço de IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpinion("");
    setHasRequested(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Opinião da IA</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Item Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="space-y-4">
            {!hasRequested && !isLoading && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Clique no botão abaixo para receber uma análise de estilo personalizada sobre este item
                </p>
                <button
                  onClick={handleRequestOpinion}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Pedir Opinião para IA
                </button>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    </div>
                    <span className="text-sm text-gray-600">IA está pensando...</span>
                  </div>
                </div>
              </div>
            )}

            {opinion && (
              <>
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-gray-900 text-white rounded-3xl rounded-tr-sm p-4 max-w-[80%]">
                    <p className="text-sm">O que você acha sobre este item?</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-gray-800 leading-relaxed">{opinion}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
