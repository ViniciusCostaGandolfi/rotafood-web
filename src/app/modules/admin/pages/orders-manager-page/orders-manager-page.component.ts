import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullOrderDto, fullOrderToCommandString } from '../../../../core/interfaces/order/full-order';
import { Subscription, interval, switchMap } from 'rxjs';
import { OrderStatus, OrderTypeMap } from '../../../../core/interfaces/order/order-enum';
import { MatDialog } from '@angular/material/dialog';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';
import { FullMerchantDto } from '../../../../core/interfaces/merchant/full-merchant';
import { ConfigurePrinterDialogComponent } from '../../components/configure-printer-dialog/configure-printer-dialog.component';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';
import { OrderCreateOrUpdateComponent } from '../../components/update-or-create/order-create-or-update/order-create-or-update.component';
import { MerchantOrderEstimateDialogComponent } from '../../components/merchant-order-estimate-dialog/merchant-order-estimate-dialog.component';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { LocalPrinterService } from '../../../../core/services/local-printer/local-printer.service';

@Component({
  selector: 'app-orders-manager-page',
  templateUrl: './orders-manager-page.component.html',
  styleUrls: ['./orders-manager-page.component.scss']
})
export class OrdersManagerPageComponent implements OnInit, OnDestroy {
  public isOpen = false;
  public useSound = false;
  public autoAccept = false;
  public isMobile = false;
  public allOrders: FullOrderDto[] = [];
  public ordersCreated: FullOrderDto[] = [];
  public ordersInPreparation: FullOrderDto[] = [];
  public ordersReady: FullOrderDto[] = [];
  public OrderTypeMap = OrderTypeMap;
  public merchant!: FullMerchantDto;

  private orderAudio = new Audio('assets/sound.mp3');
  private pollingSubscription?: Subscription;

  constructor(
    private ordersService: OrdersService,
    private merchantService: MerchantService,
    private dialog: MatDialog,
    private windowService: WindowWidthService,
    private localPrinterService: LocalPrinterService
  ) { }

  ngOnInit(): void {
    this.windowService.isMobile().subscribe(isM => this.isMobile = isM);
  }

  toggleAutoAccept(): void {
    this.autoAccept = !this.autoAccept;
    if (this.autoAccept && this.ordersCreated.length) {
      this.acceptAllOrders();
    }
  }



  toggleStoreStatus(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.loadAndStartPolling();
    } else {
      this.stopPolling();
      this.ordersService.stopPolling().subscribe({
        next: () => console.log('Backend notificado: stopPolling'),
        error: e => console.error('Erro em stopPolling():', e)
      });
    }
  }

  loadAndStartPolling(): void {
    this.ordersService.polling().subscribe({
      next: resp => this.sortOrders(resp),
      error: e => console.error('Erro no polling inicial:', e)
    });
    this.startPolling();
  }

  startPolling(): void {
    if (this.pollingSubscription) { return; }

    this.pollingSubscription = interval(15000)
      .pipe(switchMap(() => this.ordersService.polling()))
      .subscribe({
        next: resp => this.sortOrders(resp),
        error: e => {
          console.error('Erro no polling periódico:', e);
          this.stopPolling();
        }
      });
  }

  stopPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = undefined;
  }


  openConfigurePrinter() {
    this.dialog.open(ConfigurePrinterDialogComponent, {
      width: '90%',
      height: '90%'
    });
  }

  createOrder() {
    this.dialog.open(OrderCreateOrUpdateComponent, {
      width: this.isMobile ? '100vw' : '90%',
      height: this.isMobile ? '100%' : '90%',
      data: {
        merchant: this.merchant
      }
    }).afterClosed().subscribe((value) => {
      if (value) {
        this.sortOrders([...this.allOrders, value])
      }
    });
  }

  sortOrders(orders: FullOrderDto[]) {
    this.allOrders = orders;
    this.ordersCreated = orders.filter(order => order.status === OrderStatus.CREATED || order.status === OrderStatus.CONFIRMED);
    this.ordersInPreparation = orders.filter(order => order.status === OrderStatus.PREPARATION_STARTED);
    this.ordersReady = orders.filter(order => order.status === OrderStatus.READY_TO_PICKUP);

    this.allOrders.forEach(o => {
      if (o.printed === false) {
        this.ordersService.updateOrderPrinted(o.id as string, true).subscribe();
        this.localPrinterService.cleanPrint(fullOrderToCommandString(o))

        if (o.status === OrderStatus.CREATED || o.status === OrderStatus.PREPARATION_STARTED) {
          this.playNewOrderSound();

        }
      }
    })

    if (this.autoAccept) {
      this.acceptAllOrders();
    }
  }

  acceptAllOrders(): void {
    const toAccept = this.ordersCreated.slice();
    toAccept.forEach(order => {
      this.ordersService
        .updateOrderStatus(order.id!, OrderStatus.PREPARATION_STARTED)
        .subscribe({
          next: () => {
            order.status = OrderStatus.PREPARATION_STARTED;
            this.sortOrders(this.allOrders);
          },
          error: err =>
            console.error('Erro ao auto-aceitar pedido', order.id, err)
        });
    });
  }

  nextOrderStatus(order: FullOrderDto): void {
    const statusFlow = [
      OrderStatus.CREATED,
      OrderStatus.CONFIRMED,
      OrderStatus.PREPARATION_STARTED,
      OrderStatus.READY_TO_PICKUP,
      OrderStatus.DISPATCHED,
      OrderStatus.COMPLETED
    ];

    let newStatus: OrderStatus;

    if (order.status === OrderStatus.CREATED || order.status === OrderStatus.CONFIRMED) {
      newStatus = OrderStatus.PREPARATION_STARTED;

      this.ordersService.updateOrderStatus(order.id!, newStatus).subscribe(() => {
        order.status = newStatus;
        this.sortOrders(this.allOrders);
      });
    } else {
      const currentIndex = statusFlow.indexOf(order.status);
      if (currentIndex === -1 || currentIndex === statusFlow.length - 1) return;
      newStatus = statusFlow[currentIndex + 1];

      this.ordersService.updateOrderStatus(order.id!, newStatus).subscribe(() => {
        order.status = newStatus;
        this.sortOrders(this.allOrders);
      });
    }
  }

  cancelOrder(order: FullOrderDto): void {
    if (!order || order.status === OrderStatus.CANCELED) return;

    const newStatus = OrderStatus.CANCELED;

    this.ordersService.updateOrderStatus(order.id!, newStatus).subscribe(() => {
      order.status = newStatus;
      this.sortOrders(this.allOrders);
    });
  }

  openEstimateDialog(): void {
    const dialogRef = this.dialog.open(MerchantOrderEstimateDialogComponent, {
      width: '400px',
      data: this.merchant
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.merchant = result
      }
    });
  }

  private playNewOrderSound(): void {
    if (this.useSound) {
      this.orderAudio.pause();
      this.orderAudio.loop = false;
      this.orderAudio.play().catch(err =>
        console.warn('Falha ao tocar som de novo pedido:', err)
      );
    }
    

  }



  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}

