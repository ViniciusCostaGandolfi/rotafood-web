import { PackagingType } from "../../enums/packagiong-type";
import { Serving } from "../../enums/serving";

export interface ProductOptionDto {
  id?: string;
  ean: string;
  additionalInformation: string;
  name: string;
  description: string;
  optionId?: string | null;
  optionGroupId?: string;
  imagePath?: string;
  quantity?: number;
  serving?: Serving;
  packagingType?: PackagingType;
  dietaryRestrictions?: string[];

}
