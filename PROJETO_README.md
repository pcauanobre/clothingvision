# ClothingVision 👔✨

Plataforma moderna de visualização de roupas com análise de estilo por IA.

## 🎯 Sobre o Projeto

ClothingVision é uma aplicação web que permite aos usuários explorar um catálogo de roupas e acessórios, visualizar detalhes dos produtos e receber opiniões personalizadas de uma IA sobre estilo, combinações e uso.

### Funcionalidades Principais

- **Landing Page Moderna**: Design minimalista e atraente
- **Catálogo de Produtos**: Grid responsivo com cards de itens
- **Detalhes do Item**: Visualização completa com imagens em alta qualidade
- **Opinião da IA**: Chat interativo para análise de estilo personalizada
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com Server Components
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização moderna e responsiva
- **Firebase** - Backend e autenticação (configurado)

## 📁 Estrutura do Projeto

```
clothingvision/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── catalogo/
│   │   └── page.tsx            # Página do catálogo
│   ├── item/
│   │   └── [id]/
│   │       └── page.tsx        # Página de detalhes do item
│   ├── layout.tsx              # Layout principal
│   └── globals.css             # Estilos globais
├── src/
│   ├── components/
│   │   ├── ItemCard.tsx        # Card de item do catálogo
│   │   ├── AIOpinionModal.tsx  # Modal de opinião da IA
│   │   └── Loading.tsx         # Componente de loading
│   ├── models/
│   │   └── ItemModel.ts        # Interfaces TypeScript
│   └── services/
│       ├── itemService.ts      # Serviço de API para itens
│       └── aiService.ts        # Serviço de IA
└── .env.local                  # Variáveis de ambiente
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório (ou use o existente)

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - O arquivo `.env.local` já está configurado
   - Altere `NEXT_PUBLIC_API_URL` quando tiver um backend real

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:3000
```

## 🔌 Integração com Backend

O projeto está preparado para consumir uma API REST. Configure a URL da API no arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://seu-backend.com/api
```

### Endpoints Esperados

#### GET /items
Retorna lista de todos os itens
```json
{
  "items": [
    {
      "id": "1",
      "name": "Camiseta Básica",
      "description": "Descrição do produto",
      "imageUrl": "https://...",
      "category": "Camisetas",
      "price": 79.90,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

#### GET /items/{id}
Retorna um item específico
```json
{
  "id": "1",
  "name": "Camiseta Básica",
  "description": "Descrição do produto",
  "imageUrl": "https://...",
  "category": "Camisetas",
  "price": 79.90,
  "createdAt": "2025-01-01T00:00:00Z"
}
```

#### POST /ai/opinion
Solicita opinião da IA sobre um item
```json
// Request
{
  "itemId": "1",
  "imageUrl": "https://...",
  "itemName": "Camiseta Básica",
  "itemDescription": "Descrição do produto"
}

// Response
{
  "success": true,
  "opinion": "Esta peça é versátil e atemporal..."
}
```

## 🎨 Fluxo do Usuário

1. **Landing Page**: Usuário chega na página inicial
2. **Explorar Catálogo**: Clica em "Explorar Catálogo"
3. **Ver Itens**: Visualiza os cards dos produtos
4. **Ver Detalhes**: Clica em "Ver Mais" em um produto
5. **Solicitar Opinião**: Clica em "Pedir Opinião para IA"
6. **Receber Análise**: IA responde com sugestões de estilo

## 📱 Design

- **Minimalista**: Muito espaço em branco, tipografia grande
- **Moderno**: Cards com cantos arredondados, hover suaves
- **Responsivo**: Funciona em todos os dispositivos
- **Acessível**: Foco visível, contraste adequado

## 🔄 Modo de Desenvolvimento

Enquanto não houver backend, o projeto usa dados mockados:
- `itemService.ts` retorna 6 itens de exemplo
- `aiService.ts` retorna opiniões aleatórias

Quando o backend estiver pronto, basta configurar a URL e os serviços consumirão a API real automaticamente.

## 🧪 Build de Produção

```bash
npm run build
npm start
```

## 📝 Próximos Passos

- [ ] Criar backend com API REST
- [ ] Integrar com serviço de IA real (OpenAI, Gemini, etc)
- [ ] Adicionar filtros no catálogo (categoria, preço)
- [ ] Implementar busca de produtos
- [ ] Adicionar paginação no catálogo
- [ ] Otimizar imagens
- [ ] Implementar analytics

## 🤝 Contribuindo

Este projeto foi criado para visualização de produtos e interação com IA. Sinta-se livre para expandir conforme necessário.

---

**ClothingVision** - Estilo com Inteligência ✨
