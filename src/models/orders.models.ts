export interface Orders {
  orderIds: string[];
  userId: string;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}
