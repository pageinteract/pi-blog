export interface Category {
  name: string;
}

export interface Image {
  url: string;
  alternativeText: string;
}

export interface OEmbedData {
  url: string;
  thumbnail?: string;
  oembed: {
    title?: string;
    author_name?: string;
    author_url?: string;
    type: "video" | "photo" | "rich" | "link";
    height?: number;
    width?: number;
    version?: string;
    provider_name?: string;
    provider_url?: string;
    thumbnail_height?: number;
    thumbnail_width?: number;
    thumbnail_url?: string;
    html?: string;
  };
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: Category[];
  oembed?: OEmbedData;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  plans: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  categories?: any[];
}
