import { stringToNumber } from "./string-number-parser"

export function contextModifierPriceStringToNumber(contextModifiers: any) {
    return contextModifiers.map((contextModifier: any) => {
        return {...contextModifier, value: stringToNumber(contextModifier.price.value), 
          originalValue: stringToNumber(contextModifier.price.originalValue)}
      })
    
}