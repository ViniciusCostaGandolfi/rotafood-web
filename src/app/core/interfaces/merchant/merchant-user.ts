import { MerchantUserRole } from "../../enums/merchant-user-role";

export interface MerchantUser {
  id?: string | null;
  name: string;
  email: string;
  phone: string;
  role: MerchantUserRole
  merchantId: string

}