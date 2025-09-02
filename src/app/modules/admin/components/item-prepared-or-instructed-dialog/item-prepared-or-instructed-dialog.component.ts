import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemInstructedSelectorDialogComponent } from '../selectors/item-instructed-selector-dialog/item-instructed-selector-dialog.component';
import { ItemDto } from '../../../../core/interfaces/catalog/item';
import { ItemDefaultCreateOrUpdateDialogComponent } from '../update-or-create/item-default-create-or-update-dialog/item-default-create-or-update-dialog.component';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-item-prepared-or-instructed-dialog',
  templateUrl: './item-prepared-or-instructed-dialog.component.html',
  styleUrl: './item-prepared-or-instructed-dialog.component.scss'
})
export class ItemPreparedOrInstructedDialogComponent {

  isMobile = false

  constructor(private readonly dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: { item: ItemDto | null; categoryId: string },
    private readonly dialogRef: MatDialogRef<ItemPreparedOrInstructedDialogComponent>,

    private readonly windowService: WindowWidthService,
  ) { }


  ngOnInit() {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
  }

  createPreparedItem(): void {

    this.dialog.open(ItemDefaultCreateOrUpdateDialogComponent, {
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      data: this.data
    }).afterClosed().subscribe(response => (this.dialogRef.close(response)));
  }

  createInstructedItem(): void {
    this.dialog.open(ItemInstructedSelectorDialogComponent, {
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      data: this.data
    }).afterClosed().subscribe(response => (this.dialogRef.close(response)));
  }

  onClose() {
    this.dialogRef.close()
  }
}
