import { PaymentRecordMethodDto } from "./order-payment-method";

export interface PaymentRecordDto {
  id?: string;
  description: string;
  methods: PaymentRecordMethodDto[];
  pending: number;
  paid: number;
}
