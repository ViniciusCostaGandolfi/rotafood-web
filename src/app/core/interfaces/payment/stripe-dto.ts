export interface StripeChargeDto {
  id: string;
  amount: number;
  created: string;
  currency: string;
  status: string;
}
export interface StripeSubscriptionDto {
  id: string;
  status: string;
  startDate: Date;
  endDate: Date | null;
}
export interface StripePaymentStatusDto {
  active: boolean;
  message: string;
  email: string;
  totalSubscriptions: number;
  subscriptions: StripeSubscriptionDto[];
  payments: StripeChargeDto[];
}