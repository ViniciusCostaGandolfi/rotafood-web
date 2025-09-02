import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDeliveryByMap, OrderDeliveryModeMap, OrderIndoorDtoModeMap, OrderSalesChannelMap, OrderStatusMap, OrderTakeoutModeMap, OrderTimingMap, OrderTypeMap } from '../../../../core/interfaces/order/order-enum';
import { OrderDto } from '../../../../core/interfaces/order/order';



@Component({
  selector: 'app-detail-order-dialog',
  templateUrl: './detail-order-dialog.component.html',
  styleUrls: ['./detail-order-dialog.component.scss']
})
export class DetailOrderDialogComponent {

  orderTypeMap = OrderTypeMap;
  orderStatusMap = OrderStatusMap;
  orderSalesChannelMap = OrderSalesChannelMap;
  orderTimingMap = OrderTimingMap;
  orderDeliveryModeMap = OrderDeliveryModeMap;
  orderDeliveryByMap = OrderDeliveryByMap;
  orderIndoorModeMap = OrderIndoorDtoModeMap;
  orderTakeoutModeMap = OrderTakeoutModeMap;

  constructor(
    private dialogRef: MatDialogRef<DetailOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: OrderDto }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
