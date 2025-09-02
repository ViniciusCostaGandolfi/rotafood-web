import { OrderStatus } from "../enums/order-status";
import { OrderDto } from "../interfaces/order/order";
import { OrderSalesChannel, OrderTiming, OrderType } from "../interfaces/order/order-enum";
import { OrderTotalDto } from "../interfaces/order/order-total";


// Função para gerar valores aleatórios para OrderTotalDto
const generateOrderTotal = (): OrderTotalDto => ({
  id: 'dskldfskldklfsçkdlsfnkldjfç',
  benefits: Math.floor(Math.random() * 30), // Benefícios aplicados ao pedido
  deliveryFee: Math.floor(Math.random() * 20), // Taxa de entrega
  orderAmount: Math.floor(Math.random() * 200) + 50, // Valor do pedido
  subTotal: Math.floor(Math.random() * 200) + 50, // Subtotal do pedido
  additionalFees: Math.floor(Math.random() * 15) // Taxas adicionais
});

export const mockOrders: OrderDto[] = [
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-01T10:00:00Z'),
    type: OrderType.DELIVERY,
    status: OrderStatus.COMPLETED,
    salesChannel: OrderSalesChannel.IFOOD,
    timing: OrderTiming.IMMEDIATE,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-01T11:30:00Z'),
    type: OrderType.TAKEOUT,
    status: OrderStatus.CONFIRMED,
    salesChannel: OrderSalesChannel.WHATSAPP,
    timing: OrderTiming.SCHEDULED,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-01T12:45:00Z'),
    type: OrderType.DELIVERY,
    status: OrderStatus.CANCELED,
    salesChannel: OrderSalesChannel.FACEBOOK,
    timing: OrderTiming.IMMEDIATE,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-02T09:15:00Z'),
    type: OrderType.TAKEOUT,
    status: OrderStatus.READY_TO_PICKUP,
    salesChannel: OrderSalesChannel.INSTAGRAM,
    timing: OrderTiming.SCHEDULED,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-02T13:20:00Z'),
    type: OrderType.DELIVERY,
    status: OrderStatus.DISPATCHED,
    salesChannel: OrderSalesChannel.CALL,
    timing: OrderTiming.IMMEDIATE,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-02T14:45:00Z'),
    type: OrderType.TAKEOUT,
    status: OrderStatus.CREATED,
    salesChannel: OrderSalesChannel.IFOOD,
    timing: OrderTiming.SCHEDULED,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-02T16:00:00Z'),
    type: OrderType.DELIVERY,
    status: OrderStatus.CONFIRMED,
    salesChannel: OrderSalesChannel.WHATSAPP,
    timing: OrderTiming.IMMEDIATE,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-03T09:10:00Z'),
    type: OrderType.INDOOR,
    status: OrderStatus.PREPARATION_STARTED,
    salesChannel: OrderSalesChannel.INSTAGRAM,
    timing: OrderTiming.SCHEDULED,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-03T11:50:00Z'),
    type: OrderType.TAKEOUT,
    status: OrderStatus.DISPATCHED,
    salesChannel: OrderSalesChannel.FACEBOOK,
    timing: OrderTiming.IMMEDIATE,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  },
  {
    id: 'dskldfskldklfsçkdlsfnkldjfç',
    createdAt: new Date('2024-02-03T15:30:00Z'),
    type: OrderType.DELIVERY,
    status: OrderStatus.COMPLETED,
    salesChannel: OrderSalesChannel.IFOOD,
    timing: OrderTiming.SCHEDULED,
    total: generateOrderTotal(),
    modifiedAt: new Date(),
    merchantId: ""
  }
];
