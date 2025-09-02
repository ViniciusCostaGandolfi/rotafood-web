import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { OrderStatus, OrderType } from '../../interfaces/order/order-enum';
import { PaginationDto } from '../../interfaces/shared/pagination';
import { OrderDto } from '../../interfaces/order/order';
import { FullOrderDto } from '../../interfaces/order/full-order';



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }


  getAllOrders(
    orderTypes?: OrderType[],
    orderStatuses?: OrderStatus[],
    startDate?: string,
    endDate?: string,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    sortDirection: 'asc' | 'desc' = 'desc'
  ): Observable<PaginationDto<OrderDto>> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');
  
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);
  
    if (orderTypes?.length) {
      params = params.set('orderTypes', orderTypes.join(','));
    }
    if (orderStatuses?.length) {
      params = params.set('orderStatuses', orderStatuses.join(','));
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
  
    const url = `${this.apiUrl}/${merchantId}/orders`;
    return this.http.get<PaginationDto<OrderDto>>(url, { params });
  }


  polling(): Observable<FullOrderDto[]> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/orders/polling`;
    return this.http.get<FullOrderDto[]>(url);
  }

  stopPolling(): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/orders/polling/stop`;
    return this.http.get<void>(url);
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');
  
    const url = `${this.apiUrl}/${merchantId}/orders/${orderId}/status/${status}`;
    return this.http.put<void>(url, null);
  }

  updateOrderPrinted(orderId: string, printed: boolean): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');
    const url = `${this.apiUrl}/${merchantId}/orders/${orderId}/printed/${printed}`;
    return this.http.put<void>(url, null);
  }

  printOrder(orderId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');
  
    const url = `${this.apiUrl}/${merchantId}/orders/${orderId}/print`;
    return this.http.put<void>(url, null);
  }
  

  getOrderById(orderId: string): Observable<FullOrderDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/orders/${orderId}`;
    return this.http.get<FullOrderDto>(url);
  }


  createOrUpdateOrder(order: FullOrderDto): Observable<FullOrderDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/orders`;
    return this.http.put<FullOrderDto>(url, order);
  }

  deleteOrder(orderId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/orders/${orderId}`;
    return this.http.delete<void>(url);
  }
}
