import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullOrderDto } from '../../core/interfaces/order/full-order';
import { Subscription, interval, switchMap } from 'rxjs';
import { CatalogOnlineService } from '../../core/services/catalog-online/catalog-online.service';
import { OrderStatusMap } from '../../core/interfaces/order/order-enum';
import { CatalogOnlineLayoutComponent } from '../../shared/catalog-online-layout/catalog-online-layout.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-order-status-page',
  templateUrl: './order-status-page.component.html',
  styleUrls: ['./order-status-page.component.scss'],
  imports: [
    CatalogOnlineLayoutComponent,
    CommonModule,
    MatCardModule,
    MatProgressSpinner
  ],
  standalone: true
})
export class OrderStatusPageComponent implements OnInit, OnDestroy {
  public order!: FullOrderDto;
  public loading = true;
  private pollingSubscription!: Subscription;
  public orderStatusMap = OrderStatusMap

  constructor(
    private route: ActivatedRoute,
    private catalogOnlineService: CatalogOnlineService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchOrder();
    this.startPolling();
  }

  fetchOrder(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (!orderId) return;

    const onlineName = this.route.snapshot.paramMap.get('onlineName');
    if (!onlineName) return;

    this.loading = true;
    this.catalogOnlineService.getOrderById(onlineName, orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackbar.open('Erro ao carregar o pedido.', 'Fechar', { duration: 3000 });
      }
    });
  }

  startPolling(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (!orderId) return;

    const onlineName = this.route.snapshot.paramMap.get('onlineName');
    if (!onlineName) return;

    this.pollingSubscription = interval(300000) 
      .pipe(switchMap(() => this.catalogOnlineService.getOrderById(onlineName, orderId)))
      .subscribe({
        next: (order) => {
          this.order = order;
        },
        error: () => {
          this.snackbar.open('Erro ao atualizar o status do pedido.', 'Fechar', { duration: 3000 });
        }
      });
  }


  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }


  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      CREATED: 'text-blue-600',
      CONFIRMED: 'text-yellow-600',
      PREPARATION_STARTED: 'text-orange-600',
      READY_TO_PICKUP: 'text-green-600',
      DISPATCHED: 'text-purple-600',
      COMPLETED: 'text-gray-600',
      CANCELED: 'text-red-600'
    };
    return statusClasses[status] || 'text-black';
  }
}
