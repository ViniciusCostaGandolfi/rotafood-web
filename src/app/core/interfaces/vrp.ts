import { Address } from "./address";

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface VrpOrigin {
  id?: string;
  address: Address
}

export interface VrpOrder {
    id?: string;
    volumeLiters: number;
    createdAt: Date;
    address: Address;
  }  

export interface VrpRoute {
    id?: string;
    sequence: number[];
    orders: VrpOrder[];
    routeLine: Coordinate[];
    distanceMeters: number;
    volumeLiters: number;
    linkGoogleMaps: string;
  }

export interface Vrp {
  id?: string;
  origin: VrpOrigin;
  maxRouteVolume: number;
  maxRouteOrders: number;
  routes: VrpRoute[];
  createAd: Date;
  timeToSolveMs: number;
}


  