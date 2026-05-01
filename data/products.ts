import { Product, Category, CurrencyConfig } from '@/types';

export const currencies: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, flag: '🇺🇸' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5, flag: '🇮🇳' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53, flag: '🇦🇺' },
];

export const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Men', slug: 'men', subcategories: [{ name: 'T-Shirts', slug: 't-shirts' }, { name: 'Shirts', slug: 'shirts' }, { name: 'Jeans', slug: 'jeans' }, { name: 'Jackets', slug: 'jackets' }, { name: 'Watches', slug: 'watches-men' }] },
  { name: 'Women', slug: 'women', subcategories: [{ name: 'Dresses', slug: 'dresses' }, { name: 'Tops', slug: 'tops' }, { name: 'Skirts', slug: 'skirts' }, { name: 'Watches', slug: 'watches-women' }, { name: 'Bags', slug: 'bags' }, { name: 'Jewelry', slug: 'jewelry' }, { name: 'Beauty', slug: 'beauty' }] },
  { name: 'Kids', slug: 'kids', subcategories: [{ name: 'Boys', slug: 'boys' }, { name: 'Girls', slug: 'girls' }, { name: 'Toys', slug: 'toys' }] },
  { name: 'Electronics', slug: 'electronics', subcategories: [{ name: 'Mobiles', slug: 'mobiles' }, { name: 'Laptops', slug: 'laptops' }, { name: 'TVs', slug: 'tvs' }, { name: 'Headphones', slug: 'headphones' }] },
  { name: 'Grocery', slug: 'grocery', subcategories: [{ name: 'Fruits', slug: 'fruits' }, { name: 'Dairy', slug: 'dairy' }, { name: 'Snacks', slug: 'snacks' }] },
  { name: 'Medicine', slug: 'medicine', subcategories: [{ name: 'Vitamins', slug: 'vitamins' }, { name: 'Skincare Meds', slug: 'skincare-meds' }] },
  { name: 'Beauty', slug: 'beauty', subcategories: [{ name: 'Skincare', slug: 'skincare' }, { name: 'Makeup', slug: 'makeup' }, { name: 'Haircare', slug: 'haircare' }, { name: 'Fragrances', slug: 'fragrances' }] },
  { name: 'Furniture', slug: 'furniture', subcategories: [{ name: 'Sofas', slug: 'sofas' }, { name: 'Tables', slug: 'tables' }, { name: 'Beds', slug: 'beds' }, { name: 'Storage', slug: 'storage' }] },
  { name: 'Sale', slug: 'sale' },
];

export const products: Product[] = [
  // ─── WOMEN ────────────────────────────────────────────────────────────────
  {
    id: 'w-001',
    title: 'Floral Print Wrap Dress',
    description: 'A beautiful wrap dress with delicate floral prints.',
    rating: 4.5,
    reviewCount: 234,
    variants: [
      {
        color: "Rose",
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 15,
            sku: "BS-WD-001-R-M",
            price: 49.99,
            originalPrice: 79.99,
            discount: 38,
          }
        ]
      },
      {
        color: "Ivory",
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 15,
            sku: "BS-WD-001-I-M",
            price: 49.99,
            originalPrice: 79.99,
            discount: 38,
          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'dresses',
    brand: 'Bloom Studio',
    tags: ['new-arrivals', 'trending'],
    sku: 'BS-WD-001',
    gtin: '0012345678901'
  },

  {
    id: 'w-002',
    title: 'Classic White Crop Top',
    description: 'Minimalist crop top made from premium cotton.',
    rating: 4.7,
    reviewCount: 512,
    variants: [
      {
        color: "White",
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600'
        ]
        ,
        sizes: [
          {
            size: "S",
            stock: 40,
            sku: "UC-WT-002-W-S",
            price: 24.99,
            originalPrice: 34.99,
            discount: 29,
          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 30,
            sku: "UC-WT-002-B-M",
            price: 24.99,
            originalPrice: 34.99,
            discount: 29,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'tops',
    brand: 'Urban Chic',
    tags: ['best-seller'],
    sku: 'UC-WT-002',
    gtin: '0012345678902'
  },

  {
    id: 'w-003',
    title: 'High Waist Skinny Jeans',
    description: 'Stretch denim skinny jeans with high waist fit.',
    rating: 4.3,
    reviewCount: 189,
    variants: [
      {
        color: "Indigo",
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 25,
            sku: "DC-WJ-003-I-M",
            price: 59.99,
            originalPrice: 89.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600'
        ],
        sizes: [
          {
            size: "L",
            stock: 20,
            sku: "DC-WJ-003-B-L",
            price: 59.99,
            originalPrice: 89.99,
            discount: 33,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'jeans',
    brand: 'Denim Co.',
    tags: ['best-seller'],
    sku: 'DC-WJ-003',
    gtin: '0012345678903'
  },

  {
    id: 'w-004',
    title: 'Oversized Cozy Hoodie',
    description: 'Ultra-soft oversized hoodie for winter.',
    rating: 4.8,
    reviewCount: 678,
    variants: [
      {
        color: "Blush",
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 50,
            sku: "CC-WH-004-B-M",
            price: 39.99,
            originalPrice: 54.99,
            discount: 27,

          }
        ]
      },
      {
        color: "Lavender",
        images: [
          'https://picsum.photos/seed/hoodie-cozy/600/800'
        ],
        sizes: [
          {
            size: "L",
            stock: 40,
            sku: "CC-WH-004-L-L",
            price: 39.99,
            originalPrice: 54.99,
            discount: 27,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'tops',
    brand: 'Comfy Club',
    tags: ['trending'],
    sku: 'CC-WH-004',
    gtin: '0012345678904'
  },

  {
    id: 'w-005',
    title: 'Pleated Midi Skirt',
    description: 'Elegant satin pleated skirt.',
    rating: 4.4,
    reviewCount: 145,
    variants: [
      {
        color: "Black",
        images: [
          'https://picsum.photos/seed/midi-skirt-w/600/800'
        ],
        sizes: [
          {
            size: "M",
            stock: 20,
            sku: "BS-WS-005-B-M",
            price: 44.99,
            originalPrice: 64.99,
            discount: 31,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'skirts',
    brand: 'Bloom Studio',
    tags: ['new-arrivals'],
    sku: 'BS-WS-005',
    gtin: '0012345678905'
  },

  {
    id: 'w-006',
    title: 'Lace Detail Party Dress',
    description: 'Elegant lace party dress.',
    rating: 4.6,
    reviewCount: 98,
    variants: [
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600'
        ],
        sizes: [
          {
            size: "S",
            stock: 10,
            sku: "GE-WD-006-B-S",
            price: 79.99,
            originalPrice: 129.99,
            discount: 38,

          }
        ]
      },
      {
        color: "Wine",
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 10,
            sku: "GE-WD-006-W-M",
            price: 79.99,
            originalPrice: 129.99,
            discount: 38,
          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'dresses',
    brand: 'Glamour Edit',
    tags: ['sale'],
    sku: 'GE-WD-006',
    gtin: '0012345678906'
  },
  // ─── WOMEN WATCHES ──────────────────────────────────────────────────────
  {
    id: 'ww-001',
    title: 'Rose Gold Minimalist Watch',
    description: 'Elegant rose gold timepiece with a slim profile and genuine leather strap.',
    rating: 4.7,
    reviewCount: 312,
    variants: [
      {
        color: "Rose Gold",
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
          'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 12,
            sku: "LL-WW-001-RG",
            price: 149.99,
            originalPrice: 199.99,
            discount: 25,

          }
        ]
      },
      {
        color: "Silver",
        images: [
          'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=600',
          'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 13,
            sku: "LL-WW-001-SLV",
            price: 149.99,
            originalPrice: 199.99,
            discount: 25,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'watches-women',
    brand: 'Luxe Lane',
    tags: ['new-arrivals', 'trending'],
    sku: 'LL-WW-001',
    gtin: '0012345679001',
    specifications: {
      'Case Material': 'Stainless Steel',
      'Strap': 'Genuine Leather',
      'Water Resistance': '30m',
      'Movement': 'Japanese Quartz'
    }
  },
  // ─── BEAUTY ──────────────────────────────────────────────────────────────
  {
    id: 'b-001',
    title: 'Hydrating Face Serum',
    description: 'Lightweight vitamin C brightening serum with hyaluronic acid.',
    rating: 4.8,
    reviewCount: 892,
    variants: [
      {
        color: "Default",
        images: [
          'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600',
          'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600'
        ],
        sizes: [
          {
            size: "30ml",
            stock: 250,
            sku: "GL-BS-001-30",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,

          },
          {
            size: "50ml",
            stock: 250,
            sku: "GL-BS-001-50",
            price: 49.99,
            originalPrice: 69.99,
            discount: 28,
          }
        ]
      }
    ],
    category: 'beauty',
    subCategory: 'skincare',
    brand: 'Glow Lab',
    tags: ['best-seller', 'trending'],
    sku: 'GL-BS-001',
    gtin: '0012345680001',
    specifications: {
      'Skin Type': 'All',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid',
      'Cruelty-Free': 'Yes'
    }
  },

  {
    id: 'b-002',
    title: 'Matte Liquid Lipstick Set',
    description: '6-shade matte liquid lipstick set with long-lasting formula.',
    rating: 4.5,
    reviewCount: 634,
    variants: [
      {
        color: "Red",
        images: [
          'https://images.unsplash.com/photo-1586495777744-4e6b8b1e7cfd?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 50,
            sku: "GS-BM-002-RED",
            price: 29.99,
            originalPrice: 44.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Nude",
        images: [
          'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 50,
            sku: "GS-BM-002-NUD",
            price: 29.99,
            originalPrice: 44.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Berry",
        images: [
          'https://images.unsplash.com/photo-1600180758890-6c3b8aef2d03?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 50,
            sku: "GS-BM-002-BRY",
            price: 29.99,
            originalPrice: 44.99,
            discount: 33,

          }
        ]
      }
    ],
    category: 'beauty',
    subCategory: 'makeup',
    brand: 'Glam Studio',
    tags: ['best-seller', 'sale'],
    sku: 'GS-BM-002',
    gtin: '0012345680002'
  },

  {
    id: 'b-003',
    title: 'Nourishing Hair Mask',
    description: 'Deep conditioning hair mask with argan oil and keratin.',
    rating: 4.6,
    reviewCount: 445,
    variants: [
      {
        color: "Default",
        images: [
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
          'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600'
        ],
        sizes: [
          {
            size: "200ml",
            stock: 100,
            sku: "GL-BH-003-200",
            price: 22.99,
            originalPrice: 32.99,
            discount: 30,

          },
          {
            size: "400ml",
            stock: 80,
            sku: "GL-BH-003-400",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,
          }
        ]
      }
    ],
    category: 'beauty',
    subCategory: 'haircare',
    brand: 'Glow Lab',
    tags: ['best-seller'],
    sku: 'GL-BH-003',
    gtin: '0012345680003'
  },
  // ─── MEN ─────────────────────────────────────────────────────────────────
  {
    id: 'm-001',
    title: 'Classic Oxford Shirt',
    description: 'Premium Oxford weave shirt with a tailored fit.',
    rating: 4.4,
    reviewCount: 278,
    variants: [
      {
        color: "White",
        images: [
          'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 20,
            sku: "UC-MS-001-W-M",
            price: 45.99,
            originalPrice: 64.99,
            discount: 29,

          }
        ]
      },
      {
        color: "Light Blue",
        images: [
          'https://picsum.photos/seed/oxford-shirt-m/600/800'
        ],
        sizes: [
          {
            size: "L",
            stock: 15,
            sku: "UC-MS-001-LB-L",
            price: 45.99,
            originalPrice: 64.99,
            discount: 29,

          }
        ]
      }
    ],
    category: 'men',
    subCategory: 'shirts',
    brand: 'Urban Chic',
    tags: ['new-arrivals'],
    sku: 'UC-MS-001',
    gtin: '0012345681001',
    specifications: {
      Material: '100% Cotton',
      Fit: 'Regular',
      Collar: 'Button-Down'
    }
  },

  {
    id: 'm-002',
    title: 'Slim Fit Chinos',
    description: 'Versatile slim-fit chino trousers.',
    rating: 4.3,
    reviewCount: 156,
    variants: [
      {
        color: "Khaki",
        images: [
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600'
        ],
        sizes: [
          {
            size: "32",
            stock: 15,
            sku: "DC-MC-002-K-32",
            price: 52.99,
            originalPrice: 74.99,
            discount: 29,

          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://picsum.photos/seed/oxford-shirt-m/600/800'
        ],
        sizes: [
          {
            size: "34",
            stock: 10,
            sku: "DC-MC-002-B-34",
            price: 52.99,
            originalPrice: 74.99,
            discount: 29,

          }
        ]
      }
    ],
    category: 'men',
    subCategory: 'jeans',
    brand: 'Denim Co.',
    tags: ['best-seller'],
    sku: 'DC-MC-002',
    gtin: '0012345681002'
  },

  {
    id: 'm-003',
    title: 'Graphic Print Tee',
    description: 'Relaxed-fit graphic tee with vintage print.',
    rating: 4.2,
    reviewCount: 341,
    variants: [
      {
        color: "White",
        images: [
          'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 40,
            sku: "SC-MT-003-W-M",
            price: 22.99,
            originalPrice: 29.99,
            discount: 23,

          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600'
        ],
        sizes: [
          {
            size: "L",
            stock: 35,
            sku: "SC-MT-003-B-L",
            price: 22.99,
            originalPrice: 29.99,
            discount: 23,

          }
        ]
      }
    ],
    category: 'men',
    subCategory: 't-shirts',
    brand: 'Street Co.',
    tags: ['trending', 'sale'],
    sku: 'SC-MT-003',
    gtin: '0012345681003'
  },

  {
    id: 'm-004',
    title: 'Leather Biker Jacket',
    description: 'Premium faux leather biker jacket.',
    rating: 4.6,
    reviewCount: 203,
    variants: [
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'
        ],
        sizes: [
          {
            size: "M",
            stock: 12,
            sku: "EG-MJ-004-B-M",
            price: 129.99,
            originalPrice: 189.99,
            discount: 32,

          }
        ]
      },
      {
        color: "Brown",
        images: [
          'https://picsum.photos/seed/biker-jacket-m/600/800'
        ],
        sizes: [
          {
            size: "L",
            stock: 10,
            sku: "EG-MJ-004-BR-L",
            price: 129.99,
            originalPrice: 189.99,
            discount: 32,

          }
        ]
      }
    ],
    category: 'men',
    subCategory: 'jackets',
    brand: 'Edge Gear',
    tags: ['trending'],
    sku: 'EG-MJ-004',
    gtin: '0012345681004'
  },
  // ─── MEN WATCHES ─────────────────────────────────────────────────────────
  {
    id: 'mw-001',
    title: 'Chronograph Sports Watch',
    description: 'Precision chronograph watch with stainless steel case and sapphire crystal glass.',
    rating: 4.8,
    reviewCount: 487,
    variants: [
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1627384113710-424c9181ebbb?w=600',
          'https://picsum.photos/seed/chrono-watch-m/600/800'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 7,
            sku: "TL-MW-001-BLK",
            price: 249.99,
            originalPrice: 349.99,
            discount: 29,

          }
        ]
      },
      {
        color: "Silver",
        images: [
          'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=600',
          'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 7,
            sku: "TL-MW-001-SLV",
            price: 249.99,
            originalPrice: 349.99,
            discount: 29,

          }
        ]
      },
      {
        color: "Gold",
        images: [
          'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600',
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600'
        ]
        ,
        sizes: [
          {
            size: "One Size",
            stock: 6,
            sku: "TL-MW-001-GLD",
            price: 249.99,
            originalPrice: 349.99,
            discount: 29,

          }
        ]
      }
    ],
    category: 'men',
    subCategory: 'watches',
    brand: 'Tempo Luxe',
    tags: ['new-arrivals', 'best-seller'],
    sku: 'TL-MW-001',
    gtin: '0012345682001',
    specifications: {
      'Case Material': 'Stainless Steel',
      'Crystal': 'Sapphire',
      'Water Resistance': '100m',
      'Movement': 'Swiss Quartz',
      'Case Diameter': '44mm'
    }
  },
  // ─── KIDS ─────────────────────────────────────────────────────────────────
  {
    id: 'k-001',
    title: 'Dinosaur Printed T-Shirt',
    description: 'Fun and playful dinosaur print tee for little adventurers.',
    rating: 4.7,
    reviewCount: 156,
    variants: [
      {
        color: "Blue",
        images: [
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600'
        ],
        sizes: [
          {
            size: "4Y",
            stock: 40,
            sku: "TT-KT-001-BLU-4Y",
            price: 16.99,
            originalPrice: 24.99,
            discount: 32,

          }
        ]
      },
      {
        color: "Green",
        images: [
          'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600'
        ],
        sizes: [
          {
            size: "5Y",
            stock: 35,
            sku: "TT-KT-001-GRN-5Y",
            price: 16.99,
            originalPrice: 24.99,
            discount: 32,

          }
        ]
      },
      {
        color: "Yellow",
        images: [
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600'
        ],
        sizes: [
          {
            size: "6Y",
            stock: 30,
            sku: "TT-KT-001-YLW-6Y",
            price: 16.99,
            originalPrice: 24.99,
            discount: 32,
          }
        ]
      }
    ],
    category: 'kids',
    subCategory: 'boys',
    brand: 'Tiny Threads',
    tags: ['new-arrivals'],
    sku: 'TT-KT-001',
    gtin: '0012345683001'
  },

  {
    id: 'k-002',
    title: 'Girls Tutu Party Dress',
    description: 'Adorable layered tutu dress for special occasions.',
    rating: 4.8,
    reviewCount: 234,
    variants: [
      {
        color: "Pink",
        images: [
          'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?w=600'
        ],
        sizes: [
          {
            size: "4Y",
            stock: 20,
            sku: "TT-KD-002-PNK-4Y",
            price: 28.99,
            originalPrice: 39.99,
            discount: 28,
          }
        ]
      },
      {
        color: "Purple",
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600'
        ],
        sizes: [
          {
            size: "5Y",
            stock: 18,
            sku: "TT-KD-002-PRP-5Y",
            price: 28.99,
            originalPrice: 39.99,
            discount: 28,

          }
        ]
      },
      {
        color: "White",
        images: [
          'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?w=600'
        ],
        sizes: [
          {
            size: "6Y",
            stock: 15,
            sku: "TT-KD-002-WHT-6Y",
            price: 28.99,
            originalPrice: 39.99,
            discount: 28,

          }
        ]
      }
    ],
    category: 'kids',
    subCategory: 'girls',
    brand: 'Tiny Threads',
    tags: ['trending'],
    sku: 'TT-KD-002',
    gtin: '0012345683002'
  },
  // ─── ELECTRONICS – MOBILES ──────────────────────────────────────────────

  {
    id: 'e-mob-001',
    title: 'ProMax X15 Smartphone',
    description: '6.7" AMOLED display, 200MP camera, flagship performance.',
    rating: 4.7,
    reviewCount: 1243,
    variants: [
      {
        color: "Midnight Black",
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
        ],
        sizes: [
          {
            size: "128GB",
            stock: 10,
            sku: "TV-EM-001-BLK-128",
            price: 899.99,
            originalPrice: 1099.99,
            discount: 18,

          },
          {
            size: "256GB",
            stock: 8,
            sku: "TV-EM-001-BLK-256",
            price: 949.99,
            originalPrice: 1149.99,
            discount: 17,
          }
        ]
      },
      {
        color: "Glacier White",
        images: [
          'https://images.unsplash.com/photo-1592950630581-03cb41342cc5?w=600'
        ],
        sizes: [
          {
            size: "256GB",
            stock: 7,
            sku: "TV-EM-001-WHT-256",
            price: 949.99,
            originalPrice: 1149.99,
            discount: 17,

          }
        ]
      },
      {
        color: "Cosmic Purple",
        images: [
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'
        ],
        sizes: [
          {
            size: "512GB",
            stock: 5,
            sku: "TV-EM-001-PRP-512",
            price: 999.99,
            originalPrice: 1199.99,
            discount: 17,

          }
        ]
      }
    ],
    category: 'electronics',
    subCategory: 'mobiles',
    brand: 'TechVision',
    tags: ['new-arrivals', 'trending'],
    sku: 'TV-EM-001',
    gtin: '0012345684001',
    specifications: {
      Display: '6.7" AMOLED 120Hz',
      Processor: 'Snapdragon 8 Gen 3',
      RAM: '12GB',
      Camera: '200MP + 12MP + 10MP',
      Battery: '5000mAh',
      OS: 'Android 15',
      '5G': 'Yes'
    },
    features: [
      '5G Ready',
      '120Hz Refresh Rate',
      '200MP Camera',
      '65W Fast Charging',
      'IP68 Water Resistant'
    ]
  },

  {
    id: 'e-mob-002',
    title: 'Budget Max 5G Phone',
    description: 'Affordable smartphone with 64MP camera and long battery life.',
    rating: 4.3,
    reviewCount: 876,
    variants: [
      {
        color: "Blue",
        images: [
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'
        ],
        sizes: [
          {
            size: "64GB",
            stock: 30,
            sku: "VT-EM-002-BLU-64",
            price: 249.99,
            originalPrice: 329.99,
            discount: 24,

          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600'
        ],
        sizes: [
          {
            size: "128GB",
            stock: 40,
            sku: "VT-EM-002-BLK-128",
            price: 269.99,
            originalPrice: 349.99,
            discount: 23,

          }
        ]
      },
      {
        color: "Green",
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
        ],
        sizes: [
          {
            size: "128GB",
            stock: 25,
            sku: "VT-EM-002-GRN-128",
            price: 269.99,
            originalPrice: 349.99,
            discount: 23,

          }
        ]
      }
    ],
    category: 'electronics',
    subCategory: 'mobiles',
    brand: 'ValueTech',
    tags: ['best-seller', 'sale'],
    sku: 'VT-EM-002',
    gtin: '0012345684002',
    specifications: {
      Display: '6.5" IPS LCD 90Hz',
      Processor: 'MediaTek Dimensity 700',
      RAM: '6GB',
      Camera: '64MP + 8MP + 2MP',
      Battery: '5000mAh',
      OS: 'Android 14',
      '5G': 'Yes'
    }
  },

  // ─── ELECTRONICS – LAPTOPS ──────────────────────────────────────────────
  {
    id: 'e-lap-001',
    title: 'UltraBook Pro 14"',
    description: 'Thin and light professional laptop with 14" OLED display.',
    rating: 4.8,
    reviewCount: 654,
    variants: [
      {
        color: "Silver",
        images: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'
        ],
        sizes: [
          {
            size: "512GB SSD",
            stock: 10,
            sku: "TV-EL-001-SLV-512",
            price: 1299.99,
            originalPrice: 1599.99,
            discount: 19,
          },
          {
            size: "1TB SSD",
            stock: 8,
            sku: "TV-EL-001-SLV-1TB",
            price: 1399.99,
            originalPrice: 1699.99,
            discount: 18,
          }
        ]
      },
      {
        color: "Space Grey",
        images: [
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'
        ],
        sizes: [
          {
            size: "512GB SSD",
            stock: 6,
            sku: "TV-EL-001-GRY-512",
            price: 1299.99,
            originalPrice: 1599.99,
            discount: 19,
          }
        ]
      }
    ],
    category: 'electronics',
    subCategory: 'laptops',
    brand: 'TechVision',
    tags: ['new-arrivals', 'trending'],
    sku: 'TV-EL-001',
    gtin: '0012345685001',
    specifications: {
      Display: '14" OLED 2.8K',
      Processor: 'Intel Core i7-13th Gen',
      RAM: '16GB DDR5',
      Battery: '72Wh (up to 12h)',
      Weight: '1.2kg',
      OS: 'Windows 11'
    },
    features: [
      'OLED Display',
      'Thunderbolt 4',
      'Backlit Keyboard',
      'Fingerprint Reader',
      'Wi-Fi 6E'
    ]
  },

  {
    id: 'e-lap-002',
    title: 'Creator Studio 15"',
    description: 'High-performance laptop for creators and gamers.',
    rating: 4.7,
    reviewCount: 423,
    variants: [
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'
        ],
        sizes: [
          {
            size: "512GB SSD",
            stock: 8,
            sku: "TV-EL-002-BLK-512",
            price: 1599.99,
            originalPrice: 1999.99,
            discount: 20,
          },
          {
            size: "1TB SSD",
            stock: 12,
            sku: "TV-EL-002-BLK-1TB",
            price: 1699.99,
            originalPrice: 2099.99,
            discount: 19,
          }
        ]
      }
    ],
    category: 'electronics',
    subCategory: 'laptops',
    brand: 'TechVision',
    tags: ['trending'],
    sku: 'TV-EL-002',
    gtin: '0012345685002',
    specifications: {
      Display: '15.6" 4K IPS 144Hz',
      GPU: 'NVIDIA RTX 4060 8GB',
      Processor: 'AMD Ryzen 9 7945HX',
      RAM: '32GB DDR5',
      OS: 'Windows 11'
    }
  },
  // ─── ELECTRONICS – TVs ──────────────────────────────────────────────────
  {
    id: 'e-tv-001',
    title: '55" QLED 4K Smart TV',
    description: 'QLED 4K Smart TV with Quantum Dot technology, HDR10+, Dolby Vision.',
    rating: 4.6,
    reviewCount: 789,
    variants: [
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600',
          'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600',
        ],
        sizes: [
          {
            size: '43"',
            stock: 10,
            sku: 'VM-ET-001-43',
            price: 499.99,
            originalPrice: 699.99,
            discount: 28,
          },
          {
            size: '55"',
            stock: 12,
            sku: 'VM-ET-001-55',
            price: 699.99,
            originalPrice: 999.99,
            discount: 30,
          },
          {
            size: '65"',
            stock: 8,
            sku: 'VM-ET-001-65',
            price: 899.99,
            originalPrice: 1199.99,
            discount: 25,
          },
          {
            size: '75"',
            stock: 5,
            sku: 'VM-ET-001-75',
            price: 1199.99,
            originalPrice: 1499.99,
            discount: 20,
          }
        ]
      }
    ],
    category: 'electronics',
    subCategory: 'tvs',
    brand: 'VistaMax',
    tags: ['best-seller', 'sale'],
    sku: 'VM-ET-001',
    gtin: '0012345686001',
    specifications: {
      Resolution: '4K UHD (3840x2160)',
      Display: 'QLED',
      HDR: 'HDR10+, Dolby Vision',
      'Refresh Rate': '120Hz',
      'Smart OS': 'Tizen 7.0',
      Ports: '4x HDMI, 3x USB'
    },
    features: [
      'Quantum Dot Display',
      'Dolby Vision & Atmos',
      'Built-in Alexa & Google Assistant',
      'ALLM Gaming Mode',
      'Ambient Mode'
    ]
  },
  // ─── GROCERY ─────────────────────────────────────────────────────────────
  {
    id: 'g-001',
    title: 'Organic Mixed Nuts Pack',
    description: 'Premium blend of cashews, almonds, walnuts, and pistachios.',
    rating: 4.6,
    reviewCount: 1567,
    variants: [
      {
        color: "Default",
        images: [
          'https://images.unsplash.com/photo-1543168256-418811576931?w=600',
          'https://images.unsplash.com/photo-1578910208873-21fcf1ed0cca?w=600',
        ],
        sizes: [
          {
            size: "500g",
            stock: 200,
            sku: "NF-GS-001-500",
            price: 10.99,
            originalPrice: 14.99,
            discount: 26,

          },
          {
            size: "1kg",
            stock: 180,
            sku: "NF-GS-001-1KG",
            price: 18.99,
            originalPrice: 24.99,
            discount: 24,
          },
          {
            size: "2kg",
            stock: 120,
            sku: "NF-GS-001-2KG",
            price: 34.99,
            originalPrice: 44.99,
            discount: 22,
          }
        ]
      }
    ],
    category: 'grocery',
    subCategory: 'snacks',
    brand: 'NatureFarm',
    tags: ['best-seller'],
    sku: 'NF-GS-001',
    gtin: '0012345687001',
    specifications: {
      Contents: 'Cashews, Almonds, Walnuts, Pistachios',
      Organic: 'Yes',
      Packaging: 'Resealable Zip Bag',
      'Shelf Life': '12 months'
    }
  },

  {
    id: 'g-002',
    title: 'Farm Fresh Milk',
    description: 'Full cream farm fresh milk from free-range cows.',
    rating: 4.4,
    reviewCount: 2341,
    variants: [
      {
        color: "Default",
        images: [
          'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600',
          'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600'
        ],
        sizes: [
          {
            size: "1L",
            stock: 500,
            sku: "PV-GD-002-1L",
            price: 2.49,
            originalPrice: 3.49,
            discount: 28,

          },
          {
            size: "2L",
            stock: 500,
            sku: "PV-GD-002-2L",
            price: 3.99,
            originalPrice: 4.99,
            discount: 20,
          }
        ]
      }
    ],
    category: 'grocery',
    subCategory: 'dairy',
    brand: 'Pure Valley',
    tags: ['best-seller'],
    sku: 'PV-GD-002',
    gtin: '0012345687002'
  },
  // ─── MEDICINE ────────────────────────────────────────────────────────────
  {
    id: 'med-001',
    title: 'Vitamin C + Zinc Effervescent',
    description: '1000mg Vitamin C with Zinc effervescent tablets. Boosts immunity.',
    rating: 4.7,
    reviewCount: 3456,
    variants: [
      {
        color: "Default",
        images: [
          'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600',
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'
        ],
        sizes: [
          {
            size: "30 Tablets",
            stock: 400,
            sku: "HP-MV-001-30",
            price: 12.99,
            originalPrice: 17.99,
            discount: 28,

          },
          {
            size: "60 Tablets",
            stock: 400,
            sku: "HP-MV-001-60",
            price: 19.99,
            originalPrice: 27.99,
            discount: 28,
          }
        ]
      }
    ],
    category: 'medicine',
    subCategory: 'vitamins',
    brand: 'HealthPure',
    tags: ['best-seller'],
    sku: 'HP-MV-001',
    gtin: '0012345688001',
    specifications: {
      'Vitamin C': '1000mg',
      Zinc: '10mg',
      Flavour: 'Orange',
      'Suitable For': 'Adults 18+',
      Form: 'Effervescent'
    }
  },
  // ─── FURNITURE ───────────────────────────────────────────────────────────
  {
    id: 'f-001',
    title: '3-Seater Velvet Sofa',
    description: 'Luxurious velvet sofa with solid wood legs and premium comfort.',
    rating: 4.5,
    reviewCount: 234,
    variants: [
      {
        color: "Emerald Green",
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'
        ],
        sizes: [
          {
            size: "3-Seater",
            stock: 4,
            sku: "HE-FS-001-GRN-3S",
            price: 799.99,
            originalPrice: 1199.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Navy Blue",
        images: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600'
        ],
        sizes: [
          {
            size: "3-Seater",
            stock: 4,
            sku: "HE-FS-001-NVY-3S",
            price: 799.99,
            originalPrice: 1199.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Dusty Pink",
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'
        ],
        sizes: [
          {
            size: "3-Seater",
            stock: 3,
            sku: "HE-FS-001-PNK-3S",
            price: 799.99,
            originalPrice: 1199.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Charcoal",
        images: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600'
        ],
        sizes: [
          {
            size: "3-Seater",
            stock: 4,
            sku: "HE-FS-001-CHR-3S",
            price: 799.99,
            originalPrice: 1199.99,
            discount: 33,

          }
        ]
      }
    ],
    category: 'furniture',
    subCategory: 'sofas',
    brand: 'HomeElegance',
    tags: ['trending', 'sale'],
    sku: 'HE-FS-001',
    gtin: '0012345689001',
    specifications: {
      Upholstery: 'Premium Velvet',
      Legs: 'Solid Beech Wood',
      'Seating Capacity': '3',
      Dimensions: '220cm x 90cm x 85cm',
      Assembly: 'Required'
    },
    features: [
      'Stain-Resistant Fabric',
      'High-Density Foam',
      'Non-Slip Leg Pads',
      'Easy Assembly'
    ]
  },

  {
    id: 'f-002',
    title: 'Scandinavian Dining Table',
    description: 'Minimalist oak dining table with metal legs.',
    rating: 4.4,
    reviewCount: 167,
    variants: [
      {
        color: "Natural Oak",
        images: [
          'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600',
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600'
        ],
        sizes: [
          {
            size: "4-Seater",
            stock: 5,
            sku: "HE-FT-002-OAK-4S",
            price: 449.99,
            originalPrice: 649.99,
            discount: 31,

          },
          {
            size: "6-Seater",
            stock: 4,
            sku: "HE-FT-002-OAK-6S",
            price: 499.99,
            originalPrice: 699.99,
            discount: 29,
          }
        ]
      },
      {
        color: "Walnut",
        images: [
          'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600'
        ],
        sizes: [
          {
            size: "6-Seater",
            stock: 3,
            sku: "HE-FT-002-WNT-6S",
            price: 529.99,
            originalPrice: 749.99,
            discount: 29,

          }
        ]
      }
    ],
    category: 'furniture',
    subCategory: 'tables',
    brand: 'HomeElegance',
    tags: ['new-arrivals'],
    sku: 'HE-FT-002',
    gtin: '0012345689002',
    specifications: {
      Material: 'Solid Oak',
      Legs: 'Hairpin Metal',
      Capacity: '6 persons',
      Dimensions: '180cm x 90cm x 76cm'
    }
  },
  // ─── ACCESSORIES ──────────────────────────────────────────────────────────
  {
    id: 'a-001',
    title: 'Leather Crossbody Bag',
    description: 'Compact yet spacious crossbody bag in premium faux leather.',
    rating: 4.2,
    reviewCount: 310,
    variants: [
      {
        color: "Tan",
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 25,
            sku: "LL-WB-001-TAN",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,

          }
        ]
      },
      {
        color: "Black",
        images: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 25,
            sku: "LL-WB-001-BLK",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,

          }
        ]
      },
      {
        color: "Blush",
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 25,
            sku: "LL-WB-001-BLS",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'bags',
    brand: 'Luxe Lane',
    tags: ['best-seller'],
    sku: 'LL-WB-001',
    gtin: '0012345678907'
  },

  {
    id: 'a-002',
    title: 'Statement Gold Earrings',
    description: 'Bold geometric gold-plated earrings.',
    rating: 4.3,
    reviewCount: 445,
    variants: [
      {
        color: "Gold",
        images: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 80,
            sku: "LL-WJ-002-GLD",
            price: 19.99,
            originalPrice: 29.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Silver",
        images: [
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 70,
            sku: "LL-WJ-002-SLV",
            price: 19.99,
            originalPrice: 29.99,
            discount: 33,

          }
        ]
      },
      {
        color: "Rose Gold",
        images: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'
        ],
        sizes: [
          {
            size: "One Size",
            stock: 50,
            sku: "LL-WJ-002-RGD",
            price: 19.99,
            originalPrice: 29.99,
            discount: 33,

          }
        ]
      }
    ],
    category: 'women',
    subCategory: 'jewelry',
    brand: 'Luxe Lane',
    tags: ['sale', 'best-seller'],
    sku: 'LL-WJ-002',
    gtin: '0012345678908'
  },
];

export const brands = Array.from(new Set(products.map(product => product.brand))).sort();
export const allColors = Array.from(new Set(products.flatMap(product => product.variants.map(variant => variant.color)))).sort();
export const allSizes = Array.from(
  new Set(products.flatMap(product => product.variants.flatMap(variant => variant.sizes.map(size => size.size))))
).sort();

export const getProductsByCategory = (slug: string): Product[] => {
  if (slug === 'all') return products;
  if (slug === 'sale') return products.filter(p => p.tags.includes('sale'));
  if (slug === 'new-arrivals') return products.filter(p => p.tags.includes('new-arrivals'));
  return products.filter(p => p.category === slug || p.subCategory === slug);
};

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getSimilarProducts = (product: Product, limit = 4): Product[] =>
  products.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
