import type { ArtistSlug } from "@/lib/artists/types";

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  price: ShopifyMoney;
  image?: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  options: Array<{ name: string; values: string[] }>;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  tags: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: ShopifyProduct[];
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: Array<{ name: string; value: string }>;
    image?: ShopifyImage | null;
    product: {
      id: string;
      handle: string;
      title: string;
      tags: string[];
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
    amountPerQuantity: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney | null;
  };
  lines: ShopifyCartLine[];
}

export interface DomainProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  priceMin: ShopifyMoney;
  priceMax: ShopifyMoney;
  options: Array<{ name: string; values: string[] }>;
  variants: ShopifyVariant[];
  tags: string[];
  artist: ArtistSlug | null;
}

export interface DomainCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: DomainProduct[];
}

export interface DomainCart extends Omit<ShopifyCart, "lines"> {
  lines: ShopifyCartLine[];
}
