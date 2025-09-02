import { AddressDto, CoordinateDto } from "../shared/address";



export interface VrpOrigin {
  id?: string;
  address: AddressDto
}

export interface VrpOrder {
    id?: string;
    volumeLiters: number;
    createdAt: Date;
    address: AddressDto;
  }  

export interface VrpRoute {
    id?: string;
    sequence: number[];
    orders: VrpOrder[];
    routeLine: CoordinateDto[];
    distanceMeters: number;
    volumeLiters: number;
    linkGoogleMaps: string;
  }

export interface Vrp {
  id?: string;
  origin: VrpOrigin;
  createAt: Date;
  maxRouteVolume: number;
  routes: VrpRoute[];
  timeToSolveMs: number;
}


  