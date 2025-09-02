import { OptionGroupType } from "../../enums/option-group-type";
import { Status } from "../../enums/status";
import { OptionDto } from "./option";

export interface OptionGroupDto {
    id?: string;
    name: string;
    status: Status;
    optionGroupType: OptionGroupType;
    options: OptionDto[];
    iFoodOptionGroupId?: string;
  }
  