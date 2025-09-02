import { OrderTakeoutMode } from "./order-enum";

export interface OrderTakeoutDto {
    id?: string;
    takeoutDateTime: Date,
    mode: OrderTakeoutMode,
    comments: string
  }