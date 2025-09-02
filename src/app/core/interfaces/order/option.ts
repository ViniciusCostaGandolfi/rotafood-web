import { Status } from "../../enums/status";
import { ContextModifierDto } from "../catalog/context-modifier";
import { ProductDto } from "../catalog/product";

export interface OptionDto {
    id?: string;
    status: Status;
    index: number;
    contextModifiers: ContextModifierDto[];
    product: ProductDto;
    fractions?: number[];
  }
  