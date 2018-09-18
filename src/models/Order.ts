import { User, UserResponse } from './User';

export interface OrderResponse {
  id: number;
  user: number;
  range: number[];
  exchange_rate: number;
}

export class Order {

  public static create(orderData: OrderResponse, userData: UserResponse): Order {
    const order = new Order();
    order.id = orderData.id;

    return order._update(orderData, userData);
  }

  public id!: number;
  public user: User = new User();
  public range: number[] = [];
  public exchangeRate!: number;

  private _update(orderData: OrderResponse, userData: UserResponse) {
    this.id = orderData.id;
    this.range = orderData.range;
    this.exchangeRate = orderData.exchange_rate;

    if (userData) {
      this.user = User.create(userData);
    }

    return this;
  }
}
