import { MerchantUserRole } from "../../enums/merchant-user-role";


export interface OwnerCreateDto {
    name: string
    email: string
    password: string
    phone: string
}


export interface MerchantUserDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: MerchantUserRole; 
  }
  
  export interface MerchantUserCreateDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: MerchantUserRole;
  }
  
  export interface MerchantUserUpdateDto {
    name: string;
    email: string;
    phone: string;
    role: MerchantUserRole;
  }
  