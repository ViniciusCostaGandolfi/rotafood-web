export enum PackagingType {
    PACKAGING = 'PACKAGING',
    SIDE_BAG = 'SIDE_BAG',
    NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export const packagingTypeToString: Record<PackagingType, string> = {
    [PackagingType.NOT_APPLICABLE]: 'Não Aplicável',
    [PackagingType.SIDE_BAG]: 'Usa bolso lateral',
    [PackagingType.PACKAGING]: 'Usa embalgem'
  };
  