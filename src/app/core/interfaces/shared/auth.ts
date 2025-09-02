import { MerchantCreateDto } from "../merchant/merchant-create"
import { OwnerCreateDto } from "../merchant/owner-create"

export interface AuthTokenDto {
    accessToken: string
  }
export interface MerchantOwnerCreationDto {
    merchant: MerchantCreateDto
    owner: OwnerCreateDto
}

export interface LoginDto {
    email: string
    password: string
} 