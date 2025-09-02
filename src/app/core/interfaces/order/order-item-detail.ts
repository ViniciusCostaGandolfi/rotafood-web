import { Serving } from "../../enums/serving";

export interface OrderItemDetailDto {
    id?: string;
    name: string;
    description: string;
    ean?: string;
    additionalInformation?: string;
    serving?: Serving;
    imagePath?: string;
  }
  