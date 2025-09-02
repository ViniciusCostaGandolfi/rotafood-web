import { CustomerDto } from "./customer";
import { CommandDto } from "../command/full-command-dto";
import { OrderAdditionalFeeDto } from "./order-additional-fee";
import { OrderBenefitDto } from "./order-benefit";
import { OrderDeliveryDto } from "./order-delivery";
import { OrderSalesChannel, OrderStatus, OrderTiming, OrderType } from "./order-enum";
import { OrderItemDto } from "./order-item";
import { PaymentRecordDto } from "./order-payment";
import { OrderScheduleDto } from "./order-schedule";
import { OrderTakeoutDto } from "./order-takeout";
import { OrderTotalDto } from "./order-total";


export interface FullOrderDto {
  id?: string;
  merchantSequence?: number;
  modifiedAt?: Date;
  createdAt?: Date;
  preparationStartDateTime: Date;
  type: OrderType;
  status: OrderStatus;
  salesChannel: OrderSalesChannel;
  timing: OrderTiming;
  extraInfo?: string;
  printed?: boolean;
  merchantId?: string;
  total: OrderTotalDto;
  customer?: CustomerDto; 
  delivery?: OrderDeliveryDto;
  schedule?: OrderScheduleDto;
  takeout?: OrderTakeoutDto;
  command?: CommandDto
  payment: PaymentRecordDto;
  items: OrderItemDto[];
  benefits?: OrderBenefitDto[];
  additionalFees?: OrderAdditionalFeeDto[];
}



function translateType(type?: OrderType): string {
  switch (type) {
    case OrderType.DELIVERY:  return 'Entrega';
    case OrderType.SCHEDULE:  return 'Agendado';
    case OrderType.TAKEOUT:   return 'Retirada';
    case OrderType.COMMAND:   return 'Comanda';
    default:                  return 'Desconhecido';
  }
}

function translateStatus(status?: OrderStatus): string {
  switch (status) {
    case OrderStatus.CREATED:             return 'Criado';
    case OrderStatus.CONFIRMED:           return 'Confirmado';
    case OrderStatus.PREPARATION_STARTED: return 'Em preparo';
    case OrderStatus.READY_TO_PICKUP:     return 'Pronto p/ retirar';
    case OrderStatus.DISPATCHED:          return 'Despachado';
    case OrderStatus.COMPLETED:           return 'Concluído';
    case OrderStatus.CANCELED:            return 'Cancelado';
    default:                              return 'Desconhecido';
  }
}


const money = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function two(n: number): string {
  return n.toString().padStart(2, '0');
}

export function formatDateToMinute(src: Date | string | undefined | null): string {
  if (!src) return '-';

  const d = src instanceof Date ? src : new Date(src);

  if (isNaN(d.getTime())) return '-';   

  return `${two(d.getDate())}/${two(d.getMonth() + 1)}/${d.getFullYear()} `
       + `${two(d.getHours())}:${two(d.getMinutes())}`;
}


export function fullOrderToCommandString(order: FullOrderDto): string {

  const sb: string[] = [];

  sb.push(`--- ${translateType(order.type)} ---`);
  sb.push(`Pedido: ${order.merchantSequence ?? '-'}`);
  sb.push(`Data: ${formatDateToMinute(order.createdAt)}`);
  sb.push(`Tipo: ${translateType(order.type)}`);
  sb.push(`Status: ${translateStatus(order.status)}`);
  sb.push('-------------------');

  if (order.customer) {
    sb.push(`Nome: ${order.customer.name}`);
  }
  if (order.delivery) {
    sb.push(`Entrega: ${order.delivery?.address?.formattedAddress}`);
  } else if (order.command) {
    sb.push(`Mesa: ${order.command.tableIndex ?? '-'}`);
    sb.push(`Comanda: ${order.command.name ?? '-'}`);
  } else if (order.takeout) {
    sb.push('Retirada');
  }
  sb.push('-------------------');

  order.items.forEach(item => {
    const itemPrice = money.format(item.totalPrice ?? 0);
    sb.push(`(${item.quantity}) ${item.item.name}  R$ ${itemPrice}`);

    if (item.observations) {
      sb.push(item.observations);
    }

    item.options?.forEach(opt => {
      const optPrice = money.format(opt.totalPrice ?? 0);
      sb.push(`   + ${opt.option.name}  R$ ${optPrice}`);
    });
  });

  sb.push('-------------------');
  sb.push(`Total: R$ ${money.format(order.total.orderAmount)}`);

  if (order.extraInfo) {
    sb.push(`Info extra: ${order.extraInfo}`);
  }

  return sb.join('\n');
}
