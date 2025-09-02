import { PackagingDto } from "./packaging";

export interface ProductPackagingDto {
    id?: string;
    quantityPerPackage: number;
    useLateralBag: boolean;
    packaging: PackagingDto
}