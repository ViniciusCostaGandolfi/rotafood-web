import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackagingDto } from '../../../../../core/interfaces/catalog/packaging';
import { numberToString, stringMinValidator, stringToNumber } from '../../../../../core/helpers/string-number-parser';
import { PackagingsService } from '../../../../../core/services/packagings/packagings.service';

@Component({
  selector: 'app-packaging-update-or-create-dialog',
  templateUrl: './packaging-update-or-create-dialog.component.html',
  styleUrl: './packaging-update-or-create-dialog.component.scss'
})
export class PackagingUpdateOrCreateDialogComponent {
  packagingForm: FormGroup;

  constructor(
    private readonly packagingsService: PackagingsService,
    private readonly dialogRef: MatDialogRef<PackagingUpdateOrCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PackagingDto
  ) {
    this.packagingForm = new FormGroup({
      id: new FormControl(data?.id ?? null),
      name: new FormControl(data?.name ?? '', Validators.required),
      imagePath: new FormControl(data?.imagePath ?? ''),
      lenghtCm: new FormControl(
        numberToString(data?.lenghtCm) ?? '1,00',
        [Validators.required, stringMinValidator(0)]
      ),
      widthCm: new FormControl(
        numberToString(data?.widthCm) ?? '1,00',
        [Validators.required, stringMinValidator(0)]
      ),
      thicknessCm: new FormControl(
        numberToString(data?.thicknessCm) ?? '1,00',
        [Validators.required, stringMinValidator(0)]
      ),
      volumeMl: new FormControl(
        numberToString(data?.volumeMl) ?? '1,00',
        [Validators.required, stringMinValidator(0)]
      )
    });
  }

  onSelectImage(imagePath: string) {
    this.packagingForm.get("imagePath")?.setValue(imagePath)
  }

  onSubmit(): void {
    if (this.packagingForm.valid) {
      const packaging = this.packagingForm.value;
      packaging.lenghtCm = stringToNumber(packaging.lenghtCm)
      packaging.widthCm = stringToNumber(packaging.widthCm)
      packaging.thicknessCm = stringToNumber(packaging.thicknessCm)
      packaging.volumeMl = stringToNumber(packaging.volumeMl)

      this.packagingsService.updateOrCreate(packaging).subscribe(response => {
        this.dialogRef.close(response);
      })
    } else {
      console.error('Formulário inválido!');
    }
  }
}