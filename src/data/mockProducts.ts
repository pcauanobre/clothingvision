// src/data/mockProducts.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory: string;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const mockProducts: Product[] = [
  // Feminino - Blusas
  {
    id: "1",
    name: "Blusa Cropped Canelada",
    description: "Blusa cropped em tecido canelado, super confortável e moderna. Perfeita para looks casuais do dia a dia.",
    price: 49.90,
    originalPrice: 89.90,
    discount: 45,
    category: "feminino",
    subcategory: "blusas",
    images: [
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800",
    ],
    colors: ["Preto", "Branco", "Rosa", "Azul"],
    sizes: ["PP", "P", "M", "G", "GG"],
    rating: 4.5,
    reviews: 127,
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Camisa Social Manga Longa",
    description: "Camisa social em tecido leve e respirável. Ideal para o ambiente de trabalho com muito estilo.",
    price: 89.90,
    originalPrice: 129.90,
    discount: 31,
    category: "feminino",
    subcategory: "blusas",
    images: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800",
    ],
    colors: ["Branco", "Azul Claro", "Rosa Claro"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Regata Básica Alça Fina",
    description: "Regata básica essencial no guarda-roupa. Tecido macio e modelagem que valoriza o corpo.",
    price: 29.90,
    category: "feminino",
    subcategory: "blusas",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    ],
    colors: ["Preto", "Branco", "Verde", "Vermelho", "Amarelo"],
    sizes: ["PP", "P", "M", "G"],
    rating: 4.3,
    reviews: 234,
    inStock: true,
  },

  // Feminino - Calças
  {
    id: "4",
    name: "Calça Jeans Skinny",
    description: "Calça jeans skinny com modelagem que alonga a silhueta. Tecido com elastano para maior conforto.",
    price: 139.90,
    originalPrice: 199.90,
    discount: 30,
    category: "feminino",
    subcategory: "calcas",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    ],
    colors: ["Azul Escuro", "Azul Claro", "Preto"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Calça Wide Leg Linho",
    description: "Calça pantalona em linho com caimento impecável. Super confortável e elegante.",
    price: 159.90,
    originalPrice: 219.90,
    discount: 27,
    category: "feminino",
    subcategory: "calcas",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
    ],
    colors: ["Bege", "Branco", "Preto", "Verde"],
    sizes: ["36", "38", "40", "42"],
    rating: 4.8,
    reviews: 92,
    inStock: true,
    isNew: true,
  },

  // Feminino - Vestidos
  {
    id: "6",
    name: "Vestido Midi Floral",
    description: "Vestido midi com estampa floral romântica. Alças finas e tecido leve para dias quentes.",
    price: 129.90,
    originalPrice: 189.90,
    discount: 32,
    category: "feminino",
    subcategory: "vestidos",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    ],
    colors: ["Floral Rosa", "Floral Azul", "Floral Verde"],
    sizes: ["PP", "P", "M", "G", "GG"],
    rating: 4.9,
    reviews: 203,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Vestido Longo Básico",
    description: "Vestido longo com decote em V. Essencial para o verão, super versátil e confortável.",
    price: 99.90,
    category: "feminino",
    subcategory: "vestidos",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    ],
    colors: ["Preto", "Vermelho", "Verde Musgo", "Mostarda"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.4,
    reviews: 178,
    inStock: true,
  },

  // Masculino - Camisetas
  {
    id: "8",
    name: "Camiseta Básica Gola Redonda",
    description: "Camiseta básica em algodão 100%. Essencial no guarda-roupa masculino.",
    price: 39.90,
    category: "masculino",
    subcategory: "camisetas",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    ],
    colors: ["Preto", "Branco", "Cinza", "Azul Marinho", "Verde"],
    sizes: ["P", "M", "G", "GG", "XGG"],
    rating: 4.6,
    reviews: 445,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "9",
    name: "Camiseta Estampada Geométrica",
    description: "Camiseta com estampa geométrica moderna. Tecido confortável e design exclusivo.",
    price: 59.90,
    originalPrice: 89.90,
    discount: 33,
    category: "masculino",
    subcategory: "camisetas",
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800",
    ],
    colors: ["Preto", "Branco", "Azul"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.5,
    reviews: 98,
    inStock: true,
    isNew: true,
  },

  // Masculino - Calças
  {
    id: "10",
    name: "Calça Jeans Slim Fit",
    description: "Calça jeans slim com lavagem escura. Modelagem moderna e confortável.",
    price: 149.90,
    originalPrice: 219.90,
    discount: 32,
    category: "masculino",
    subcategory: "calcas",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
    ],
    colors: ["Azul Escuro", "Preto", "Azul Médio"],
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.7,
    reviews: 267,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "11",
    name: "Bermuda Sarja Casual",
    description: "Bermuda em sarja com bolsos laterais. Ideal para o dia a dia e passeios casuais.",
    price: 89.90,
    originalPrice: 129.90,
    discount: 31,
    category: "masculino",
    subcategory: "calcas",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
    ],
    colors: ["Bege", "Verde Militar", "Azul Marinho", "Preto"],
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.4,
    reviews: 134,
    inStock: true,
  },

  // Masculino - Camisas
  {
    id: "12",
    name: "Camisa Social Slim",
    description: "Camisa social slim em tecido antirrugas. Perfeita para o trabalho e eventos formais.",
    price: 119.90,
    originalPrice: 179.90,
    discount: 33,
    category: "masculino",
    subcategory: "camisas",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    ],
    colors: ["Branco", "Azul Claro", "Rosa Claro", "Cinza"],
    sizes: ["P", "M", "G", "GG", "XGG"],
    rating: 4.8,
    reviews: 189,
    inStock: true,
    isBestSeller: true,
  },

  // Infantil
  {
    id: "13",
    name: "Conjunto Infantil Moletom",
    description: "Conjunto de moletom infantil com estampa divertida. Confortável e quentinho.",
    price: 79.90,
    originalPrice: 119.90,
    discount: 33,
    category: "infantil",
    subcategory: "conjuntos",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
    ],
    colors: ["Azul", "Rosa", "Cinza", "Verde"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isNew: true,
  },
  {
    id: "14",
    name: "Vestido Infantil Estampado",
    description: "Vestido infantil com estampa colorida e alças. Super fofo e confortável.",
    price: 59.90,
    originalPrice: 89.90,
    discount: 33,
    category: "infantil",
    subcategory: "vestidos",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800",
    ],
    colors: ["Rosa", "Azul", "Amarelo", "Lilás"],
    sizes: ["2", "4", "6", "8", "10"],
    rating: 4.7,
    reviews: 93,
    inStock: true,
  },
  {
    id: "15",
    name: "Calça Jeans Infantil",
    description: "Calça jeans infantil com ajuste na cintura. Resistente e confortável para brincar.",
    price: 69.90,
    category: "infantil",
    subcategory: "calcas",
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
    ],
    colors: ["Azul Claro", "Azul Escuro"],
    sizes: ["2", "4", "6", "8", "10", "12", "14"],
    rating: 4.5,
    reviews: 112,
    inStock: true,
  },
];

export const categories = [
  {
    id: "feminino",
    name: "Feminino",
    subcategories: [
      { id: "blusas", name: "Blusas" },
      { id: "calcas", name: "Calças" },
      { id: "vestidos", name: "Vestidos" },
      { id: "saias", name: "Saias" },
      { id: "jaquetas", name: "Jaquetas" },
      { id: "lingerie", name: "Lingerie" },
      { id: "sapatos", name: "Sapatos" },
      { id: "acessorios", name: "Acessórios" },
    ],
  },
  {
    id: "masculino",
    name: "Masculino",
    subcategories: [
      { id: "camisetas", name: "Camisetas" },
      { id: "camisas", name: "Camisas" },
      { id: "calcas", name: "Calças" },
      { id: "bermudas", name: "Bermudas" },
      { id: "jaquetas", name: "Jaquetas" },
      { id: "sapatos", name: "Sapatos" },
      { id: "acessorios", name: "Acessórios" },
    ],
  },
  {
    id: "infantil",
    name: "Infantil",
    subcategories: [
      { id: "meninas", name: "Meninas" },
      { id: "meninos", name: "Meninos" },
      { id: "bebes", name: "Bebês" },
      { id: "conjuntos", name: "Conjuntos" },
      { id: "calcados", name: "Calçados" },
    ],
  },
  {
    id: "esportes",
    name: "Esportes",
    subcategories: [
      { id: "roupas", name: "Roupas Esportivas" },
      { id: "calcados", name: "Calçados Esportivos" },
      { id: "acessorios", name: "Acessórios" },
    ],
  },
];

export const banners = [
  {
    id: 1,
    title: "AQUECE BLACK FRIDAY",
    subtitle: "4 peças = 30% OFF ou 2 peças = 15% OFF",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
    link: "/shop?promo=blackfriday",
  },
  {
    id: 2,
    title: "NOVA COLEÇÃO VERÃO",
    subtitle: "Looks frescos e modernos para a estação",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
    link: "/shop?category=feminino",
  },
  {
    id: 3,
    title: "FRETE GRÁTIS",
    subtitle: "Acima de R$ 279 para todo o Brasil",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200",
    link: "/shop",
  },
  {
    id: 4,
    title: "ATÉ 7X SEM JUROS",
    subtitle: "Em compras acima de R$ 100",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    link: "/shop",
  },
];
