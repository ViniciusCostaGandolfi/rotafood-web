export interface LogisticSettingDto {
    id?: string;
    minDeliveryFee: number;
    deliveryFeePerKm: number;
    maxDeliveryRadiusKm: number;
    freeDeliveryRadiusKm: number;
    latitude: number;
    longitude: number;
}