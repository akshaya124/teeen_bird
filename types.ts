
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export enum View {
  PRODUCTS = 'products',
  DETAIL = 'detail',
  CART = 'cart',
  CHECKOUT = 'checkout',
  CONFIRMATION = 'confirmation',
}
