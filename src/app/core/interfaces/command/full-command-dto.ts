import { CommandStatus } from '../../enums/command-status';
import { FullOrderDto } from '../order/full-order';

export interface FullCommandDto {
  id?: string | null;
  name: string;
  merchantSequence: number;
  tableIndex: number | null;
  status: CommandStatus;
  orders: FullOrderDto[];
}
export interface CommandDto {
  id?: string | null;
  name: string;
  merchantSequence: number;
  tableIndex: number; 
}

