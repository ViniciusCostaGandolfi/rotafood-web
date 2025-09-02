import { AddressDto } from "../shared/address";

export interface FullCustomerDto {
    id?: string,
    name: string,
    phone: string,
    addresses: AddressDto[]
}

export interface CustomerDto {
    id?: string,
    name: string,
    phone: string
}