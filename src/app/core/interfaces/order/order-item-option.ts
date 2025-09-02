import { OrderOptionDetailDto } from "./order-option-detail";

export interface OrderItemOptionDto {
  id?: string;
  quantity: number;
  totalPrice: number;
  contextModifierId: string;
  groupName: string;
  groupId: string;
  option: OrderOptionDetailDto;
}
