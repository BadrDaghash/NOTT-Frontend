// Demo product data for NOTT

export interface ProductVariant {
  id: string
  name: string
  images: string[]
  price: number
  salePrice?: number
  stock: number
  attributes: Record<string, string>
}

export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  image: string
  category: string
  categorySlug: string
  available: boolean
  featured: boolean
  variants: ProductVariant[]
}

export const categories = [
  {
    slug: 'duffle-bag',
    name: 'Duffle Bags',
    description: 'Handcrafted duffle bags for your everyday adventures',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
  },
  {
    slug: 'bottle-holder',
    name: 'Bottle Holders',
    description: 'Elegant crochet bottle holders for hydration in style',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=1000&fit=crop',
  },
  {
    slug: 'mat-holder',
    name: 'Mat Holders',
    description: 'Carry your yoga mat with handmade elegance',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop',
  },
  {
    slug: 'sets',
    name: 'Sets',
    description: 'Curated collections for the complete experience',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Luna Duffle',
    description: 'The Luna Duffle is our signature piece, meticulously handcrafted using premium cotton yarn. Each stitch tells a story of dedication and artisanal excellence. Perfect for weekend getaways or as a statement gym bag, the Luna combines functionality with timeless elegance. Features include a secure zip closure, interior pocket, and adjustable shoulder strap.',
    shortDescription: 'Signature handcrafted duffle with premium cotton yarn',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
    category: 'Duffle Bags',
    categorySlug: 'duffle-bag',
    available: true,
    featured: true,
    variants: [
      {
        id: '1-1',
        name: 'Natural Cream',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop',
        ],
        price: 2800,
        stock: 5,
        attributes: { color: 'Natural Cream', size: 'Medium' },
      },
      {
        id: '1-2',
        name: 'Midnight Black',
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
        ],
        price: 2800,
        salePrice: 2400,
        stock: 3,
        attributes: { color: 'Midnight Black', size: 'Medium' },
      },
      {
        id: '1-3',
        name: 'Sage Green',
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop',
        ],
        price: 3000,
        stock: 0,
        attributes: { color: 'Sage Green', size: 'Large' },
      },
    ],
  },
  {
    id: '2',
    name: 'Oasis Bottle Holder',
    description: 'Stay hydrated in style with the Oasis Bottle Holder. Designed to fit most standard water bottles, this holder features a beautiful woven pattern and a comfortable crossbody strap. The breathable crochet construction keeps your bottle secure while adding a touch of artisanal charm to your daily routine.',
    shortDescription: 'Elegant crossbody bottle holder with woven pattern',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=1000&fit=crop',
    category: 'Bottle Holders',
    categorySlug: 'bottle-holder',
    available: true,
    featured: true,
    variants: [
      {
        id: '2-1',
        name: 'Sandy Beige',
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=1000&fit=crop',
        ],
        price: 450,
        stock: 12,
        attributes: { color: 'Sandy Beige', fits: 'Up to 750ml' },
      },
      {
        id: '2-2',
        name: 'Ocean Blue',
        images: [
          'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=1000&fit=crop',
        ],
        price: 450,
        salePrice: 380,
        stock: 8,
        attributes: { color: 'Ocean Blue', fits: 'Up to 750ml' },
      },
    ],
  },
  {
    id: '3',
    name: 'Zen Mat Carrier',
    description: 'Elevate your yoga practice with the Zen Mat Carrier. This beautifully crafted carrier holds your yoga mat securely while making a sustainable style statement. The adjustable strap ensures comfort during transport, and the breathable design allows your mat to air out between sessions.',
    shortDescription: 'Sustainable yoga mat carrier with adjustable strap',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop',
    category: 'Mat Holders',
    categorySlug: 'mat-holder',
    available: true,
    featured: true,
    variants: [
      {
        id: '3-1',
        name: 'Pure White',
        images: [
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1000&fit=crop',
        ],
        price: 680,
        stock: 7,
        attributes: { color: 'Pure White', fits: 'Standard yoga mats' },
      },
      {
        id: '3-2',
        name: 'Terracotta',
        images: [
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1000&fit=crop',
        ],
        price: 680,
        stock: 4,
        attributes: { color: 'Terracotta', fits: 'Standard yoga mats' },
      },
    ],
  },
  {
    id: '4',
    name: 'Harmony Set',
    description: 'The complete wellness companion. Our Harmony Set includes the Oasis Bottle Holder and Zen Mat Carrier, perfectly coordinated for your active lifestyle. This curated bundle offers exceptional value while ensuring your yoga essentials travel in style.',
    shortDescription: 'Complete yoga set with bottle holder and mat carrier',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
    category: 'Sets',
    categorySlug: 'sets',
    available: true,
    featured: true,
    variants: [
      {
        id: '4-1',
        name: 'Natural Collection',
        images: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
        ],
        price: 1200,
        salePrice: 980,
        stock: 5,
        attributes: { color: 'Natural', includes: 'Bottle Holder + Mat Carrier' },
      },
    ],
  },
  {
    id: '5',
    name: 'Nova Weekender',
    description: 'Make a statement with the Nova Weekender. This oversized duffle offers ample space for extended trips while maintaining the artisanal quality NOTT is known for. Reinforced handles and a detachable shoulder strap provide versatile carrying options.',
    shortDescription: 'Oversized weekender bag for extended adventures',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop',
    category: 'Duffle Bags',
    categorySlug: 'duffle-bag',
    available: true,
    featured: true,
    variants: [
      {
        id: '5-1',
        name: 'Classic Tan',
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
        ],
        price: 3500,
        stock: 2,
        attributes: { color: 'Classic Tan', size: 'Large' },
      },
      {
        id: '5-2',
        name: 'Charcoal',
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
        ],
        price: 3500,
        stock: 4,
        attributes: { color: 'Charcoal', size: 'Large' },
      },
    ],
  },
  {
    id: '6',
    name: 'Petite Bottle Sling',
    description: 'Compact yet charming, the Petite Bottle Sling is perfect for smaller bottles and on-the-go hydration. The delicate crochet pattern showcases exceptional craftsmanship in a portable package.',
    shortDescription: 'Compact bottle sling for everyday carry',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=1000&fit=crop',
    category: 'Bottle Holders',
    categorySlug: 'bottle-holder',
    available: true,
    featured: true,
    variants: [
      {
        id: '6-1',
        name: 'Blush Pink',
        images: [
          'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=1000&fit=crop',
        ],
        price: 320,
        stock: 15,
        attributes: { color: 'Blush Pink', fits: 'Up to 500ml' },
      },
      {
        id: '6-2',
        name: 'Mint',
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=1000&fit=crop',
        ],
        price: 320,
        salePrice: 280,
        stock: 10,
        attributes: { color: 'Mint', fits: 'Up to 500ml' },
      },
    ],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured).slice(0, 6)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getAllVariants(): (ProductVariant & { product: Product })[] {
  return products.flatMap(product =>
    product.variants.map(variant => ({
      ...variant,
      product,
    }))
  )
}
