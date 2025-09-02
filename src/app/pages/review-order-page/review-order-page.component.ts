import { Component } from '@angular/core';
import { FullOrderDto } from '../../core/interfaces/order/full-order';
import { OrderItemDto } from '../../core/interfaces/order/order-item';
import { WindowWidthService } from '../../core/services/window-width/window-width.service';
import { ShowCatalogOnlineSideNavService } from '../../core/services/show-catalog-online-side-nav/show-catalog-online-side-nav.service';
import { FullMerchantDto } from '../../core/interfaces/merchant/full-merchant';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressDto } from '../../core/interfaces/shared/address';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderDeliveryBy, OrderDeliveryMode, OrderSalesChannel, OrderStatus, OrderTakeoutMode, OrderTiming, OrderType } from '../../core/interfaces/order/order-enum';
import { PaymentMethodType } from '../../core/enums/payment-method-type';
import { PaymentType } from '../../core/enums/payment-type';
import { OrderDeliveryDto } from '../../core/interfaces/order/order-delivery';
import { CatalogOnlineService } from '../../core/services/catalog-online/catalog-online.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LngLatLike } from 'maplibre-gl';
import { formatPhone } from '../../core/helpers/format-phone';
import { RouteDto } from '../../core/interfaces/catalog/distance-out';
import { getHasOpened } from '../../core/helpers/get-has-opened';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CatalogOnlineLayoutComponent } from '../../shared/catalog-online-layout/catalog-online-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { SharedOrderService } from '../../core/services/shared-order/shared-order.service';
import { CustomerDto, FullCustomerDto } from '../../core/interfaces/order/customer';
import { CustomersService } from '../../core/services/customers/customers.service';
import { MatSelectModule } from '@angular/material/select';
import { OrderTakeoutDto } from '../../core/interfaces/order/order-takeout';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { SelectAddressDialogComponent } from '../../shared/select-address-dialog/select-address-dialog.component';
import { DialogErrorContentComponent } from '../../shared/dialog-error-content/dialog-error-content.component';

@Component({
  selector: 'app-review-order-page',
  templateUrl: './review-order-page.component.html',
  styleUrl: './review-order-page.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    CatalogOnlineLayoutComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    NgxMapLibreGLModule,
    MatStepperModule,
    RouterModule
  ]
})
export class ReviewOrderPageComponent {

  public merchant: FullMerchantDto | undefined = undefined;
  public order: FullOrderDto | undefined = undefined;
  public orderItems: OrderItemDto[] = [];
  public routeCatlogContext: string | undefined = undefined;
  public showNav = false;
  public hasOpened = false
  public isMobile = false;
  public routeDto: RouteDto | null = null;
  public totalPrice = 0;
  public customer?: FullCustomerDto;
  public lastPhoneSearched?: string;
  public selectedAddressOption: AddressDto | null = null;
  public isEditingSelected = false;

  public orderForm = new FormGroup({
    orderType: new FormControl<OrderType>(OrderType.DELIVERY, Validators.required),
    paymentMethod: new FormControl<PaymentMethodType>(PaymentMethodType.CASH, Validators.required),
    extraInfo: new FormControl<string>(''),
    customer: new FormGroup({
      name: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>('', Validators.required),
    })
  });

  public orderDeliveryForm =  new FormGroup({
      mode: new FormControl(OrderDeliveryMode.DEFAULT, Validators.required),
      deliveryBy: new FormControl(OrderDeliveryBy.MERCHANT, Validators.required),
      deliveryDateTime: new FormControl(new Date(), Validators.required),
      address: new FormControl<AddressDto | null>(null, Validators.required),
  });

  public orderTakeoutForm = new FormGroup({
    mode: new FormControl(OrderTakeoutMode.DEFAULT, Validators.required),
    takeoutDateTime: new FormControl(new Date(), Validators.required),
    comments: new FormControl('')
  });

  constructor(
    public windowService: WindowWidthService,
    public sideNavService: ShowCatalogOnlineSideNavService,
    private route: ActivatedRoute,
    private catalogOnlineService: CatalogOnlineService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private sharedOrderService: SharedOrderService,
    private customersService: CustomersService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.sideNavService.currentShowNav.subscribe(showNav => this.showNav = showNav);
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    this.sharedOrderService.order$.subscribe(order => {
      if (order) {
        this.order = order
      }
    });
    this.sharedOrderService.items$.subscribe(items => {
      this.orderItems = items;
      this.calculateTotal();
    });

    this.activatedRoute.params.subscribe(event => {
      this.routeCatlogContext = event['catalogContext'];
    });
    this.route.paramMap.subscribe(params => {
      const onlineName = params.get('onlineName');
      if (onlineName) {
        this.fetchMerchant(onlineName);
      }
    });
  }

  fetchMerchant(onlineName: string): void {
    this.catalogOnlineService.getMerchantByOnlineName(onlineName).subscribe({
      next: (response) => {
        this.merchant = response;
        this.hasOpened = getHasOpened(this.merchant)
      },
      error: () => {
        this.snackbar.open('Restaurante não encontrado :(', 'fechar');
      }
    });
  }

  getRoute() {
    if (!this.orderDeliveryForm.value.address) return;
    this.catalogOnlineService
      .getDistance(this.merchant!.onlineName, this.orderDeliveryForm.value.address)
      .subscribe({
        next: (routeDto) => {
          this.routeDto = routeDto;
          this.calculateTotal();
        },
        error: (error) => this.snackbar.open('Endereço com campos faltando, valide manualmente ou pesquise outro endereço.', 'Fechar', { duration: 3000 })
      });
  }

  selectAddress() {
    this.dialog.open(SelectAddressDialogComponent, {
      data: {addresses: this.customer?.addresses || []},
      width: this.isMobile ? "95%" : '50%',
      height: '90%'
    }).afterClosed().subscribe(address => {
      if (address) {
        this.orderDeliveryForm.controls.address.setValue(address);
        this.getRoute();
      }
    })
  }

  onPhoneInputChange(value: string) {
    const formatted = formatPhone(value);

    if (this.orderForm.controls.customer?.controls.phone.value !== formatted) {
      this.orderForm.controls.customer?.controls.phone.setValue(formatted, { emitEvent: false });
    }

    if (formatted.length === 15 && formatted !== this.lastPhoneSearched) {
      this.lastPhoneSearched = formatted;

      this.customersService.getByPhone(formatted).subscribe({
        next: (resp) => {
          this.customer = resp;
          if (resp.name) this.orderForm.controls.customer?.controls.name.setValue(resp.name);
        },
        error: () => {
          this.customer = undefined;
          this.selectedAddressOption = null;
        }
      });
    }
  }


  removeItem(index: number) {
    this.sharedOrderService.removeItemByIndex(index);
  }

  increaseQuantity(index: number) {
    this.sharedOrderService.increaseQuantityByIndex(index);
  }

  decreaseQuantity(index: number) {
    this.sharedOrderService.decreaseQuantityByIndex(index);
  }

  calculateTotal() {
    const itemsTotal = this.orderItems.reduce((total, item) => total + item.totalPrice, 0);
    this.totalPrice = itemsTotal + this.getDeliveryFee();
  }

  onOrderTypeChange() {
    const addressControl = this.orderForm.get('address');
    addressControl?.setValidators(Validators.required)
    if (this.orderForm.get("orderType")?.value !== OrderType.DELIVERY) {
      addressControl?.setValidators(null);
      this.orderDeliveryForm.controls.address?.setValue(null);
      this.routeDto = null;
    }

    addressControl?.updateValueAndValidity();

    this.calculateTotal();

  }

  getDeliveryFee() {
    if (this.routeDto) {
      return this.routeDto.deliveryFee
    }
    return 0
  }



  openWhatsApp(order: FullOrderDto) {
    const customerName = order.customer?.name || "Cliente";
    const customerPhone = order.customer?.phone || "Não informado";

    const isDelivery = order.type === OrderType.DELIVERY;
    const deliveryType = isDelivery ? "Entrega" : "Retirada";

    const address = order.delivery?.address
      ? `Endereço: ${order.delivery.address.formattedAddress}`
      : "Endereço: Não informado";

    const itemsText = order.items.map(item => {
      const itemPrice = item.totalPrice.toFixed(2);

      const itemDetails = [
        `*(${item.quantity}) ${item.item.name}* .......... R$ ${itemPrice}\n`
      ];

      if (item.observations) {
        itemDetails.push(`  _${item.observations}_\n`);
      }

      item.options?.forEach(opt => {
        const optPrice = opt.totalPrice.toFixed(2);
        itemDetails.push(`   + ${opt.option.name} .......... R$ ${optPrice}\n`);
      });

      return itemDetails.join('\n');
    }).join('\n\n');

    const totalAmount = order.total?.orderAmount?.toFixed(2) || "0.00";
    const paymentMethod = order.payment?.description || "Não informado";

    const trackingLink = `${window.location.origin}/cardapios/${this.merchant?.onlineName}/pedidos/${order.id}`;

    const message = encodeURIComponent(`
      *Novo Pedido*
      
      *Cliente:* ${customerName} (${customerPhone})
      *Tipo:* ${deliveryType}
      ${isDelivery ? ` *${address}*` : ""}
      
      *Itens do Pedido:*
      
      ${itemsText}
  
      *Total:* R$ ${totalAmount}
      *Forma de Pagamento:* ${paymentMethod}
  
      *Acompanhe seu pedido:* ${trackingLink}
  
      *Aguardando confirmação pelo app do Rotafood!*
    `);

    const whatsappUrl = `https://wa.me/55${this.merchant?.phone.replace(/\D/g, '')}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      this.router.navigate([`/cardapios/${this.merchant?.onlineName}/pedidos/${order.id}`]);
    }, 1000)
  }

  getFormattedAddress() {
    return this.orderDeliveryForm.controls.address.value?.formattedAddress;
  }




  submitOrder() {
    if (this.orderItems.length === 0) {
      this.dialog.open(DialogErrorContentComponent, {
        data: {
          message: "Adicione pelo menos um item ao pedido"
        }
      })
      return;
    }

    if (this.orderForm.controls.customer.invalid) {
      this.dialog.open(DialogErrorContentComponent, {
        data: {
          message: "Adicione o nome e telefone"
        }
      })
      return;
    }

    if (this.orderForm.controls.orderType.value === OrderType.DELIVERY && this.orderDeliveryForm.controls.address.value === null) {
      this.dialog.open(DialogErrorContentComponent, {
        data: {
          message: "Endereço obrigatório para pedidos do tipo entrega"
        }
      })
      return;
    }
    if (this.orderForm.invalid) {
      return;
    }

    const orderType = this.orderForm.value.orderType as OrderType
    const subTotal = this.orderItems.reduce((total, item) => total + item.totalPrice, 0);
    const benefits = 0;
    const additionalFees = 0;
    const orderAmount = subTotal + this.getDeliveryFee() + additionalFees - benefits;


    const orderDto: FullOrderDto = {
      type: orderType,
      status: OrderStatus.CREATED,
      salesChannel: OrderSalesChannel.ROTAFOOD,
      preparationStartDateTime: new Date(),
      timing: OrderTiming.IMMEDIATE,
      merchantId: this.merchant?.id,
      extraInfo: '',
      total: {
        benefits: benefits,
        deliveryFee: this.getDeliveryFee(),
        orderAmount: orderAmount,
        serviceFee: 0,
        subTotal: subTotal,
        additionalFees: additionalFees
      },
      customer: this.orderForm.value.customer as CustomerDto,
      delivery: orderType === OrderType.DELIVERY ? this.orderDeliveryForm.value as OrderDeliveryDto : undefined,
      takeout: orderType === OrderType.TAKEOUT ? this.orderTakeoutForm.value as OrderTakeoutDto : undefined,
      payment: {
        id: undefined,
        description: `Pagamento via ${this.orderForm.value.paymentMethod}`,
        methods: [
          {
            description: '',
            method: this.orderForm.value.paymentMethod as PaymentMethodType,
            paid: false,
            type: PaymentType.OFFLINE,
            value: this.totalPrice
          }
        ],
        pending: 0,
        paid: this.totalPrice
      },
      items: this.orderItems,
      printed: false
    };



    this.catalogOnlineService.createOrder(this.merchant?.onlineName as string, orderDto).subscribe({
      next: (response) => {
        this.openWhatsApp(response);
      },
      error: (errors) => {
        this.snackbar.open(`Erro ${errors.error.status} - ${errors.error.details}`, "Fechar", { duration: 3000 })
      }
    })

  }

}
