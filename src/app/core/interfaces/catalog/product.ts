import { PackagingType } from "../../enums/packagiong-type";
import { Serving } from "../../enums/serving";
import { ProductPackagingDto } from "./product-packaging";

export interface ProductDto {
    id?: string;
    name: string;
    description: string;
    ean?: string;
    additionalInformation?: string;
    serving?: Serving;
    packaging?: ProductPackagingDto;
    imagePath?: string;
    quantity?: number;
    packagingType?: PackagingType;
  }
  