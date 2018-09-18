import { OrderResponse } from '../models/Order';
import { UserResponse } from '../models/User';

export class Api {

  public getOrders(): Promise<OrderResponse[]> {
    return fetch('/api/orders.json').then((response) => {
      return response.json();
    }).then((orders) => {
      return orders;
    });
  }

  public getUser(): Promise<UserResponse[]> {
    return fetch('/api/users.json').then((response) => {
      return response.json();
    }).then((users: any) => {
      return users;
    });
  }
}
