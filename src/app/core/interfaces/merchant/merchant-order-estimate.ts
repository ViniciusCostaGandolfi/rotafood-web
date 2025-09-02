export interface MerchantOrderEstimateDto {
    id?: string;
    pickupMaxMinutes: number;
    pickupMinMinutes: number;
    deliveryMaxMinutes: number;
    deliveryMinMinutes: number;
    merchantId: string;
}