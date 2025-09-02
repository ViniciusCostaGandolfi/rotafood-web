import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FullOrderDto } from '../../interfaces/order/full-order';
import { OrderItemDto } from '../../interfaces/order/order-item';

@Injectable({
  providedIn: 'root'
})
export class SharedOrderService {
  private orderSubject = new BehaviorSubject<FullOrderDto | null>(null);
  order$ = this.orderSubject.asObservable();

  private itemsSubject = new BehaviorSubject<OrderItemDto[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  getItems(): OrderItemDto[] {
    return this.itemsSubject.getValue();
  }

  addItem(item: OrderItemDto) {
    const currentItems = this.getItems();
    this.itemsSubject.next([...currentItems, item]);
  }

  removeItemByIndex(index: number) {
    const currentItems = this.getItems();
    if (index >= 0 && index < currentItems.length) {
      currentItems.splice(index, 1);
      this.itemsSubject.next([...currentItems]);
    }
  }

  clearItems() {
    this.itemsSubject.next([]);
  }

  increaseQuantityByIndex(index: number) {
    const currentItems = this.getItems();
    if (index >= 0 && index < currentItems.length) {
      const price = currentItems[index].totalPrice / currentItems[index].quantity
      currentItems[index].quantity += 1;
      currentItems[index].totalPrice = currentItems[index].quantity * price;
      this.itemsSubject.next([...currentItems]);
    }
  }

  decreaseQuantityByIndex(index: number) {
    const currentItems = this.getItems();
    if (index >= 0 && index < currentItems.length) {
      if (currentItems[index].quantity > 1) {
        const price = currentItems[index].totalPrice / currentItems[index].quantity
        currentItems[index].quantity -= 1;
        currentItems[index].totalPrice = currentItems[index].quantity * price;
        this.itemsSubject.next([...currentItems]);
      } else {
        this.removeItemByIndex(index);
      }
    }
  }

  

  getOrder(): FullOrderDto | null {
    return this.orderSubject.getValue();
  }

  setOrder(order: FullOrderDto) {
    this.orderSubject.next(order);
  }

  clearOrder() {
    this.orderSubject.next(null);
  }
}
