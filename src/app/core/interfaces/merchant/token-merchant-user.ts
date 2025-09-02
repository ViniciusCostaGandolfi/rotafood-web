import { MerchantUser } from "./merchant-user";

export interface TokenMerchantUser{
    subject: string;
    exp: number;
    merchantUser: MerchantUser
}