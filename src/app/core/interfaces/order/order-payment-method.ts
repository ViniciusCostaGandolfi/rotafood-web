import { PaymentMethodType } from "../../enums/payment-method-type";
import { PaymentType } from "../../enums/payment-type";

export interface PaymentRecordMethodDto {
    id?: string;
    description: string;
    method: PaymentMethodType;
    paid: boolean;
    type: PaymentType;
    value: number;
    changeFor?: number;
  }
