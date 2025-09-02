export enum TempletaType {
    DEFAULT = 'DEFAULT',
    PIZZA = 'PIZZA'
}

export const templateTypeToString: { [key in TempletaType]: string } = {
    [TempletaType.DEFAULT]: 'Padrão',
    [TempletaType.PIZZA]: 'Pizza',
};