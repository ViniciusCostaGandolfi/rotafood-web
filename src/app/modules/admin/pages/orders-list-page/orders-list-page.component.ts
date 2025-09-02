import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailOrderDialogComponent } from '../../components/detail-order-dialog/detail-order-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationDto } from '../../../../core/interfaces/shared/pagination';
import { PageEvent } from '@angular/material/paginator';
import { OrderDto } from '../../../../core/interfaces/order/order';
import { Subscription } from 'rxjs';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { OrderStatus, OrderStatusMap, OrderType, OrderTypeMap } from '../../../../core/interfaces/order/order-enum';
import { OrdersService } from '../../../../core/services/orders/orders.service';

@Component({
  selector: 'app-orders-list-page',
  templateUrl: './orders-list-page.component.html',
  styleUrls: ['./orders-list-page.component.scss'],
})
export class OrdersListPageComponent implements OnInit {
  isLoading = false;
  activeTabIndex = 0;
  refreshSubscription!: Subscription;



  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  orderTypeOptions = [
    { key: OrderStatus.ALL, label: 'Todos' },
    { key: OrderStatus.COMPLETED, label: 'Concluídos' },
    {
      key: 'OPEN_ORDERS',
      label: 'Em Aberto'
    },
    { key: OrderStatus.CANCELED, label: 'Cancelados' }
  ];


  orders: PaginationDto<OrderDto> = {
    currentPage: 0,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
    data: []
  };

  displayedColumns: string[] = ['createdAt', 'type', 'merchantSequence', 'status', 'total'];

  constructor(
    public dialog: MatDialog,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    this.dateRangeForm.patchValue({
      start: start,
      end: end
    });

    this.loadOrders();
  }

  getOrderStatus(status: string): string {
    return OrderStatusMap[status as OrderStatus] || status;
  }

  getOrderType(type: string): string {
    return OrderTypeMap[type as OrderType] || type;
  }



  loadOrders(): void {
    this.isLoading = true;

    function toYyyyMmDd(d?: Date | null): string | undefined {
      return d ? d.toISOString().substring(0, 10) : undefined;
    }
  
    const { start, end } = this.dateRangeForm.value;
    const startStr = toYyyyMmDd(start);
    const endStr   = toYyyyMmDd(end);
  
    const tabKey = this.orderTypeOptions[this.activeTabIndex].key;
  
    let statusFilter: OrderStatus[] | undefined;
    if (tabKey === OrderStatus.ALL) {
      statusFilter = undefined;
    } else if (tabKey === 'OPEN_ORDERS') {
      statusFilter = [
        OrderStatus.CREATED,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARATION_STARTED,
        OrderStatus.READY_TO_PICKUP,
        OrderStatus.DISPATCHED
      ];
    } else {
      statusFilter = [tabKey as OrderStatus]; 
    }
  
    const { currentPage, pageSize } = this.orders;
  
    this.ordersService
        .getAllOrders(
           undefined,
           statusFilter,
           startStr,
           endStr,
           currentPage,
           pageSize,
           'createdAt', 
           'desc'
        )
        .subscribe({
          next: resp => {
            this.orders   = resp;
            this.isLoading = false;
          },
          error: err => {
            this.dialog.open(DialogErrorContentComponent, {
              data: { message: err.error || 'Erro ao carregar pedidos.' }
            });
            this.isLoading = false;
          }
        });
  }

  get filteredOrders() {
    const currentType = this.orderTypeOptions[this.activeTabIndex].key;

    if (currentType === OrderStatus.ALL) {
      return this.orders.data;
    } else if (currentType === 'OPEN_ORDERS') {
      return this.orders.data.filter(order =>
        [OrderStatus.CREATED, OrderStatus.CONFIRMED, OrderStatus.PREPARATION_STARTED, OrderStatus.READY_TO_PICKUP, OrderStatus.DISPATCHED]
          .includes(order.status as OrderStatus)
      );
    } else {
      return this.orders.data.filter(order => order.status === currentType);
    }
  }


  handlePageEvent(event: PageEvent) {
    this.orders.currentPage = event.pageIndex;
    this.orders.pageSize = event.pageSize;
  }

  openOrderModal(order: OrderDto) {
    this.dialog.open(DetailOrderDialogComponent, {
      width: '60vw',
      data: { order }
    });
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  }

  onRefresh(): void {
    this.loadOrders();
  }

  getSubtotal(): number {
    return this.filteredOrders.reduce((acc, order) => acc + (order.total?.subTotal ?? 0), 0);
  }

  getDeliveryFee(): number {
    return this.filteredOrders.reduce((acc, order) => acc + (order.total?.deliveryFee ?? 0), 0);
  }

  getOrderAmount(): number {
    return this.filteredOrders.reduce((acc, order) => acc + (order.total?.orderAmount ?? 0), 0);
  }



}
