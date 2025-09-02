import { DocumentType } from "../../enums/document-type";
import { MerchantType } from "../../enums/merchant-type";
import { AddressDto } from "../shared/address";

export interface MerchantCreateDto {
    name: string;
    description: string;
    documentType: DocumentType;
    merchantType: MerchantType;
    document: string;
    address: AddressDto | null;
  }