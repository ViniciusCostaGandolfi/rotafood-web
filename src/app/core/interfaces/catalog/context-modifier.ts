import { CatalogContext } from "../../enums/catalog-context";
import { Status } from "../../enums/status";
import { PriceDto } from "../order/price";

export interface ContextModifierDto {
    id?: string;
    price: PriceDto;
    catalogContext: CatalogContext;
    status: Status;
    parentOptionId?: string,
    optionId?: string,
    itemId?: string,

}
  