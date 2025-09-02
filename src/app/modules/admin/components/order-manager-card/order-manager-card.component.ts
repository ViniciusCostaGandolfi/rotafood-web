import { Component, Input } from '@angular/core';
import { FullOrderDto, fullOrderToCommandString } from '../../../../core/interfaces/order/full-order';
import { OrderTypeMap } from '../../../../core/interfaces/order/order-enum';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalPrinterService } from '../../../../core/services/local-printer/local-printer.service';


@Component({
  selector: 'app-order-manager-card',
  templateUrl: './order-manager-card.component.html',
  styleUrl: './order-manager-card.component.scss'
})
export class OrderManagerCardComponent {

  @Input()
  order?: FullOrderDto

  OrderTypeMap = OrderTypeMap

  constructor(private ordersService: OrdersService, private snackbar: MatSnackBar, private localPrinterService: LocalPrinterService) {}

  printOrder(order: FullOrderDto) {
    this.localPrinterService.cleanPrint(fullOrderToCommandString(order))
    this.ordersService.printOrder(order.id as string).subscribe({
      next: () => {
        this.snackbar.open('Pedido enviado para impressão!', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

}
