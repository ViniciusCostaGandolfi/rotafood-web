import { Component, Inject } from '@angular/core';
import { DefaultPackagingDto } from '../../../../../core/interfaces/catalog/default-packaging';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DefaultPackagingsService } from '../../../../../core/services/default-packagings/default-packagings.service';
import { PackagingUpdateOrCreateDialogComponent } from '../../update-or-create/packaging-update-or-create-dialog/packaging-update-or-create-dialog.component';

@Component({
  selector: 'app-default-packaging-selector-dialog',
  templateUrl: './default-packaging-selector-dialog.component.html',
  styleUrl: './default-packaging-selector-dialog.component.scss'
})
export class DefaultPackagingSelectorDialogComponent {
  packagings: DefaultPackagingDto[] = [];
  options = ['Saco Kraft', 'Marmitex', 'Caixa Pizza', 'Embalagem para Sushi' ]
  selectControl: FormControl = new FormControl('Saco Kraft', [Validators.required]);

  constructor(
    private readonly defaultPackagingsService: DefaultPackagingsService, 
    private readonly dialogRef: MatDialogRef<DefaultPackagingSelectorDialogComponent>,
    private readonly dialog: MatDialog) {}

  ngOnInit(): void {
     this.loadProducts('Saco Kraft');
    this.selectControl.valueChanges.subscribe(value => {
      if (value) {
        this.loadProducts(value);
      }
    });
  }

  loadProducts(value?: string): void {
    if (value) {
      this.defaultPackagingsService.getDefaultProducts(value).subscribe(
        (packagings) => (this.packagings = packagings)
      );
    }
  }

  selectPackaging(packaging: DefaultPackagingDto): void {
    this.dialog.open(PackagingUpdateOrCreateDialogComponent, {
      height: "90vh",
      width: "90vw",
      data: packaging
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
      this.dialogRef.close();
    });
  }
  
}