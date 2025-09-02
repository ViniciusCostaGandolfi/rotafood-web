import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../../../../core/services/commands/commands.service';
import { CommandDto, FullCommandDto } from '../../../../core/interfaces/command/full-command-dto';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommandCreateOrUpdateDialogComponent } from '../../components/update-or-create/command-create-or-update-dialog/command-create-or-update-dialog.component';
import { OrderCreateOrUpdateComponent } from '../../components/update-or-create/order-create-or-update/order-create-or-update.component';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';
import { FullMerchantDto } from '../../../../core/interfaces/merchant/full-merchant';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';
import { OrderStatusMap, OrderType } from '../../../../core/interfaces/order/order-enum';


@Component({
  selector: 'app-commands-list-page',
  templateUrl: './commands-list-page.component.html',
  styleUrl: './commands-list-page.component.scss'
})
export class CommandsListPageComponent implements OnInit {
  commands: FullCommandDto[] = [];
  isLoading = false;
  isMobile = false;
  merchant!: FullMerchantDto;
  orderStatusMap = OrderStatusMap

  constructor(
    private readonly commandsService: CommandsService,
    private readonly dialog: MatDialog,
    private readonly merchantService: MerchantService,
    private readonly windowService: WindowWidthService,

  ) {}

  ngOnInit(): void {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    this.merchantService.get().subscribe((response) => {
      this.merchant = response;
    });
    this.getCommands();
  }

  getCommands(): void {
    this.isLoading = true;
    this.commandsService.getAllCommands().subscribe({
      next: (commands) => {
        this.commands = commands.sort((a, b) => a.merchantSequence - b.merchantSequence);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  updateOrCreateCommand(command?: FullCommandDto, pay?: boolean): void {
    const dialogRef = this.dialog.open(CommandCreateOrUpdateDialogComponent, {
      width: this.isMobile ? '100vw' : '90%',
      height: this.isMobile ? '100%' : '90%',
      data: { command, pay }
    });

    dialogRef.afterClosed().subscribe((result: FullCommandDto | undefined) => {
      if (result) {
        const index = this.commands.findIndex(c => c.id === result.id);
        if (index >= 0) {
          this.commands[index] = result;
        } else {
          this.commands.push(result);
        }
        this.commands = [...this.commands].sort((a, b) => a.merchantSequence - b.merchantSequence);
      } else {
        this.getCommands()
      }
    });
  }
  


  updateOrCreateOrder(command?: FullCommandDto) {
    const cleanCommand = command
      ? {
          id: command.id,
          name: command.name,
          merchantSequence: command.merchantSequence,
          tableIndex: command.tableIndex,
        }
      : undefined;
  
    const data = {
      merchant: this.merchant,
      order: cleanCommand ? {
        command: cleanCommand,
        type: OrderType.COMMAND
      } : undefined
    };
  
    this.dialog.open(OrderCreateOrUpdateComponent, {
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      data
    }).afterClosed().subscribe((updatedOrder) => {
      if (updatedOrder && updatedOrder.command?.id) {
        const commandIndex = this.commands.findIndex(c => c.id === updatedOrder.command?.id);
        if (commandIndex >= 0) {
          const command = this.commands[commandIndex];
          const orderIndex = command.orders?.findIndex(o => o.id === updatedOrder.id) ?? -1;
  
          if (orderIndex >= 0) {
            command.orders[orderIndex] = updatedOrder;
          } else {
            command.orders = [...(command.orders ?? []), updatedOrder];
          }
  
          this.commands[commandIndex] = { ...command };
          this.commands = [...this.commands];
        }
      }
    });;
  
  }
  
  
}