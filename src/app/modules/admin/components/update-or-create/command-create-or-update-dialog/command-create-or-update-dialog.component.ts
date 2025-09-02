import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullCommandDto } from '../../../../../core/interfaces/command/full-command-dto';
import { CommandsService } from '../../../../../core/services/commands/commands.service';
import { CommandStatus } from '../../../../../core/enums/command-status';
import { FullOrderDto } from '../../../../../core/interfaces/order/full-order';
import { PaymentMethodType } from '../../../../../core/enums/payment-method-type';
import { PaymentType } from '../../../../../core/enums/payment-type';
import { stringToNumber, numberToString } from '../../../../../core/helpers/string-number-parser';
import { changeForOptions } from '../../../../../core/mocks/change-for-options';
import { OrderStatus, OrderStatusMap } from '../../../../../core/interfaces/order/order-enum';
import { OrderCreateOrUpdateComponent } from '../order-create-or-update/order-create-or-update.component';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-command-create-or-update-dialog',
  templateUrl: './command-create-or-update-dialog.component.html',
  styleUrls: ['./command-create-or-update-dialog.component.scss'],
})
export class CommandCreateOrUpdateDialogComponent {

  commandForm = new FormGroup({
    id: new FormControl<string | null>(this.data?.command?.id ?? null),
    name: new FormControl(this.data?.command?.name ?? '', [Validators.required]),
    tableIndex: new FormControl(this.data?.command?.tableIndex ?? null),
    orders: new FormControl<FullOrderDto[]>(this.data?.command?.orders ?? [])
  });

  paymentForm = new FormGroup({
    useServiceFee: new FormControl(false),
    serviceFeePercent: new FormControl(0),
    methods: new FormArray([])
  });

  isMobile = false;

  showPaymentControl = new FormControl(false);

  orderStatusMap = OrderStatusMap

  changeForOptions = changeForOptions;

  constructor(
    public dialogRef: MatDialogRef<CommandCreateOrUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { command?: FullCommandDto, pay?: boolean },
    private readonly commandsService: CommandsService,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly windowService: WindowWidthService,

  ) {}

  ngOnInit(): void {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    if (this.data?.command?.id) {
      this.addPaymentMethod();
    }

    if (this.data?.pay) {
      this.showPaymentControl.setValue(true)
    }

    this.paymentForm.get('serviceFeePercent')?.valueChanges.subscribe(() => {
      this.updatePaymentSplits();
    });
  }

  get paymentMethodsArray(): FormArray {
    return this.paymentForm.get('methods') as FormArray;
  }

  addPaymentMethod() {
    this.paymentMethodsArray.push(this.createPaymentMethodFormGroup());
    this.updatePaymentSplits();
  }

  removePaymentMethod(index: number) {
    this.paymentMethodsArray.removeAt(index);
    this.updatePaymentSplits();
  }

  onEditOrder(order: FullOrderDto): void {
    const dialogRef = this.dialog.open(OrderCreateOrUpdateComponent, {
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      disableClose: true,
      autoFocus: true,
      data: {
        merchant: {
          id: order.merchantId
        },
        order: order
      }
    });
  
    dialogRef.afterClosed().subscribe((result: FullOrderDto | { canceled: true } | undefined) => {
      const ordersControl = this.commandForm.get('orders');
      if (!ordersControl || !Array.isArray(ordersControl.value)) return;
  
      if (result && 'canceled' in result && result.canceled === true) {
        const index = ordersControl.value.findIndex((o: FullOrderDto) => o.id === order.id);
        if (index >= 0) {
          ordersControl.value.splice(index, 1);
          ordersControl.updateValueAndValidity();
          this.snackbar.open('Pedido removido da comanda com sucesso.', 'Fechar', { duration: 3000 });
        }
        return;
      }
  
      if (result && 'id' in result) {
        const index = ordersControl.value.findIndex((o: FullOrderDto) => o.id === result.id);
        if (index >= 0) {
          ordersControl.value[index] = result;
          ordersControl.updateValueAndValidity();
        }
      }
  
      this.updatePaymentSplits();
    });
  }
  
  

  private createPaymentMethodFormGroup(): FormGroup {
    return new FormGroup({
      method: new FormControl<PaymentMethodType>(PaymentMethodType.CREDIT, Validators.required),
      type: new FormControl<PaymentType>(PaymentType.OFFLINE, Validators.required),
      value: new FormControl<string>('0,00', [Validators.required]),
      description: new FormControl('', Validators.required),
      paid: new FormControl(true),
      changeFor: new FormControl(null)
    });
  }

  calculateSubTotal(): number {
    const orders = this.commandForm.value.orders ?? [];
    return orders.reduce((acc, order) => {
      const subTotal = order.total?.subTotal;
      if (subTotal && subTotal > 0) return acc + subTotal;
      const itemsTotal = order.items?.reduce((sum, item) => sum + (item.totalPrice ?? 0), 0) ?? 0;
      return acc + itemsTotal;
    }, 0);
  }
  
  

  calculateTotal(): number {
    const subTotal = this.calculateSubTotal();
    const feePercent = this.paymentForm.get('serviceFeePercent')?.value ?? 0;
    return subTotal + (subTotal * feePercent / 100);
  }
  

  updatePaymentSplits(): void {
    const orderAmount = this.calculateTotal();
    const methodsCount = this.paymentMethodsArray.length;

    if (methodsCount === 0 || orderAmount <= 0) return;

    const share = orderAmount / methodsCount;
    this.paymentMethodsArray.controls.forEach((ctrl) => {
      ctrl.get('value')?.setValue(numberToString(share));
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.commandForm.valid) return;
  
    const formValue = this.commandForm.value;
    const orders = formValue.orders ?? [];
    const methods = this.paymentMethodsArray.controls.map((ctrl) => ({
      method: ctrl.get('method')?.value,
      type: ctrl.get('type')?.value,
      value: stringToNumber(ctrl.get('value')?.value),
      description: ctrl.get('description')?.value,
      paid: ctrl.get('paid')?.value,
      changeFor: ctrl.get('changeFor')?.value
    }));
  
    const isClosing = this.showPaymentControl.value;
  
    const command = {
      id: formValue.id,
      name: formValue.name,
      merchantSequence: this.data?.command?.merchantSequence || 0,
      status: isClosing ? CommandStatus.CLOSED : this.data?.command?.status || CommandStatus.OPENED,
      tableIndex: formValue.tableIndex,
      orders: orders
    };
  
    if (isClosing && orders.length > 0) {
      const subTotal = this.calculateSubTotal();
      const serviceFeePercent = this.paymentForm.get('serviceFeePercent')?.value ?? 0;
    
      for (const order of orders) {
        const orderSubTotal = order.items.reduce((acc, i) => acc + (i.totalPrice ?? 0), 0);
        const proportional = orderSubTotal / subTotal;
    
        const serviceFee = orderSubTotal * (serviceFeePercent / 100);
        const totalWithFee = orderSubTotal + serviceFee;
    
        const proportionalMethods = methods.map((m) => ({
          ...m,
          value: parseFloat((m.value * proportional).toFixed(2)),
          paid: true
        }));
    
        order.total = {
          ...order.total,
          subTotal: orderSubTotal,
          serviceFee: serviceFee,
          orderAmount: totalWithFee,
          benefits: 0,
          deliveryFee: 0,
          additionalFees: 0
        };
    
        order.payment = {
          ...order.payment,
          methods: proportionalMethods,
          paid: totalWithFee,
          pending: 0,
          description: `Pagamento da comanda #${command.merchantSequence} - ${command.name}`
        };
    
        order.status = OrderStatus.COMPLETED;
      }
    }
    
  
    const finalCommand = {
      ...command,
      orders: orders
    } as FullCommandDto;
  
    const request$ = isClosing
      ? this.commandsService.closeCommand(finalCommand)
      : this.commandsService.createOrUpdateCommand(finalCommand);
  
    request$.subscribe({
      next: (res) => {
        this.snackbar.open(
          isClosing ? 'Comanda encerrada com sucesso!' : 'Comanda salva com sucesso!',
          'Fechar',
          { duration: 3000 }
        );
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.snackbar.open(`Erro ${err.error?.message || 'ao salvar comanda'}`, 'Fechar', { duration: 3000 });
      }
    });
  }
  
  
}
