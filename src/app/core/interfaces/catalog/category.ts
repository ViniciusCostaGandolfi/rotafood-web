import { Status } from "../../enums/status";
import { TempletaType } from "../../enums/template-type";
import { ItemDto } from "./item";

export interface FullCategoryDto {
  id?: string;
  index: number;
  name: string;
  template: TempletaType;
  status: Status; 
  items: ItemDto[];
}


export interface CategoryDto {
    id?: string;
    index: number;
    name: string;
    template: TempletaType;
    status: Status; 
  }
