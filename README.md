# ShirtVision

**ShirtVision** é um projeto fullstack desenvolvido em **Next.js**, que exibe camisetas com imagens, descrições e preços, permitindo que usuários autenticados adicionem novos produtos e recebam **opiniões geradas por IA** sobre os itens.

---

## Conceito do Projeto

A ideia é unir um catálogo visual simples de produtos com uma camada inteligente.  
Cada camiseta adicionada ao sistema pode receber uma **análise automatizada por IA**, oferecendo insights sobre estilo, apelo visual ou descrição — como se fosse uma “opinião virtual” antes de lançar um novo modelo.

O foco é demonstrar um fluxo completo de front e back usando **Next.js + Firebase**, com integração a um modelo de linguagem.

---

## Tecnologias Principais

| Categoria | Tecnologia |
|------------|-------------|
| **Frontend** | [Next.js 14+ (App Router)](https://nextjs.org/) |
| **UI** | [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/) |
| **Banco de Dados** | [Firebase Firestore](https://firebase.google.com/docs/firestore) |
| **Armazenamento de Imagens** | [Firebase Storage](https://firebase.google.com/docs/storage) |
| **Autenticação** | [Firebase Auth](https://firebase.google.com/docs/auth) |
| **Backend / API** | Rotas nativas do Next.js (`/app/api`) |
| **IA (opcional)** | OpenAI API ou outra solução configurável |
| **Deploy** | [Vercel](https://vercel.com/) |

---

## Funcionalidades Principais

- Exibição de produtos (camisetas) com imagem, nome e descrição  
- Upload de imagens para o Firebase Storage  
- Armazenamento e leitura de produtos no Firestore  
- Autenticação de usuários via Firebase Auth  
- Geração de opinião por IA sobre produtos (rota backend)  
- Deploy otimizado e integrado com variáveis seguras no Vercel  

---

## IA (Integração opcional)
A IA será usada para gerar uma **opinião curta e automática** sobre cada camiseta, baseada na descrição cadastrada.  
A tecnologia exata (ex: OpenAI, Gemini, Claude etc.) será **definida posteriormente** conforme o custo e a API disponível.

---

## Estrutura Base
