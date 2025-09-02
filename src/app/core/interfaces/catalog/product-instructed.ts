import { PackagingType } from "../../enums/packagiong-type";
import { Serving } from "../../enums/serving";

export interface ProductInstructedDto {
    id?: string;
    name: string;
    description: string;
    imagePath?: string;
    serving?: Serving;
    packagingType?: PackagingType;
    dietaryRestrictions?: string[];

  }
  