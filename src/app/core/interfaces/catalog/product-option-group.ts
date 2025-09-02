import { Status } from "../../enums/status";
import { OptionGroupDto } from "../order/option-group";

export interface ItemOptionGroupDto {
    id?: string;
    status: Status;
    index: number;
    min: number;
    max: number;
    itemId?: string;
    optionGroup: OptionGroupDto
}
