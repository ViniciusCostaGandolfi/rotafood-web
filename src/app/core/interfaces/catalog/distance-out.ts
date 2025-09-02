import { AddressDto, CoordinateDto } from "../shared/address";

export interface RouteDto {
  id: string;
  origin: AddressDto;
  destiny: AddressDto;
  routeLine: CoordinateDto[];
  distanceMeters: number;
  deliveryFee: number;
}
