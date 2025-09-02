import { Serving } from "../../enums/serving";
import { OrderItemDetailDto } from "./order-item-detail";
import { OrderItemOptionDto } from "./order-item-option";

export interface OrderItemDto {
  id?: string;
  quantity: number;
  serving?: Serving;
  totalPrice: number;
  observations?: string;
  contextModifierId: string;
  item: OrderItemDetailDto;
  options?: OrderItemOptionDto[];
}
