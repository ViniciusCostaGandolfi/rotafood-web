import { WeightUnit } from "../../enums/weight-unit";

export interface WeightDto {
    id?: string;
    quantity: number;
    unit: WeightUnit;
  }
  