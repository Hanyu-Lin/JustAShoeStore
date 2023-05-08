export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: Omit<Product, "image">[];
}

export interface ProductEntity {
  id: string;
  attributes: Product;
}

export interface Product {
  name: string;
  subtitle: string;
  current_price: number;
  original_price: number;
  image: {
    data: {
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  slug: string;
}
export interface MetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  oneQuantityPrice: number;
  quantity: number;
  image: string;
  attributes: {
    price: number;
  };
}
