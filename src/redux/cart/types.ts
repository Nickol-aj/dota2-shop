export type CartItem = {
  id: string;
  title: string;
  realPrice: number;
  priceWithoutSale: number;
  sale: number;
  count: number;
  image: string;
  name: string;
  grade: string;
  icon: string;
};

export interface CartSliceState {
  totalPrice: number;
  totalPriceWithoutSale: number;
  items: CartItem[];
}
