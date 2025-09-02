import { CatalogContext } from "../enums/catalog-context";
import { ContextModifierDto } from "../interfaces/catalog/context-modifier";

export function mapContextModifiers(
    contextModifiers: ContextModifierDto[]
  ): Record<CatalogContext, ContextModifierDto | undefined> {
    return {
      [CatalogContext.TABLE]: contextModifiers.find((modifier) => modifier.catalogContext === CatalogContext.TABLE),
      [CatalogContext.DELIVERY]: contextModifiers.find((modifier) => modifier.catalogContext === CatalogContext.DELIVERY),
      [CatalogContext.IFOOD]: contextModifiers.find((modifier) => modifier.catalogContext === CatalogContext.IFOOD),
    };
  }