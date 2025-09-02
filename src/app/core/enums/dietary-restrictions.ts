export enum DietaryRestriction {
    VEGETARIAN = 'VEGETARIAN', 
    VEGAN = 'VEGAN', 
    ORGANIC = 'ORGANIC', 
    GLUTEN_FREE = 'GLUTEN_FREE', 
    SUGAR_FREE = 'SUGAR_FREE', 
    LAC_FREE = 'LAC_FREE', 
    ALCOHOLIC_DRINK = 'ALCOHOLIC_DRINK', 
    NATURAL = 'NATURAL', 
    ZERO = 'ZERO', 
    DIET = 'DIET'
}

export const dietaryRestrictionToString: { [key in DietaryRestriction]: string } = {
    [DietaryRestriction.VEGETARIAN]: 'Vegetariano',
    [DietaryRestriction.VEGAN]: 'Vegano',
    [DietaryRestriction.ORGANIC]: 'Orgânico',
    [DietaryRestriction.GLUTEN_FREE]: 'Sem Glúten',
    [DietaryRestriction.SUGAR_FREE]: 'Sem Açúcar',
    [DietaryRestriction.LAC_FREE]: 'Zero Lactose',
    [DietaryRestriction.ALCOHOLIC_DRINK]: 'Bebida Alcoólica',
    [DietaryRestriction.NATURAL]: 'Natural',
    [DietaryRestriction.ZERO]: 'Zero',
    [DietaryRestriction.DIET]: 'Diet',
};