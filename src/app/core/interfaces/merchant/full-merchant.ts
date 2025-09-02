import { DocumentType } from "../../enums/document-type";
import { MerchantType } from "../../enums/merchant-type";
import { AddressDto } from "../shared/address";
import { LogisticSettingDto } from "./merchant-logistic-setting";
import { MerchantOrderEstimateDto } from "./merchant-order-estimate";
import { ShiftDto } from "../shared/shift";

export interface FullMerchantDto {
    id?: string;
    name: string;
    documentType: DocumentType;
    document: string;
    onlineName: string;
    imagePath?: string;
    phone: string;
    description?: string;
    merchantType: MerchantType;
    createdAt: Date;
    lastOpenedUtc: Date;
    address: AddressDto;
    logisticSetting?: LogisticSettingDto;
    orderEstimate?: MerchantOrderEstimateDto
    openingHours?: ShiftDto[]
  }



