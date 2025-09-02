import { CatalogContext } from "../../enums/catalog-context";
import { Status } from "../../enums/status";

export interface CatalogDto {
    id?: string;
    catalogContext: CatalogContext;
    name: string;
    status: Status;
    modifiedAt: Date
  }