import { Component, Inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ItemDto } from '../../../../../core/interfaces/catalog/item';
import { ShiftDto } from '../../../../../core/interfaces/shared/shift';
import {
  dietaryRestrictionToString
} from '../../../../../core/enums/dietary-restrictions';

import { Status } from '../../../../../core/enums/status';
import {
  Serving,
  servingToString
} from '../../../../../core/enums/serving';

import { WeightUnit } from '../../../../../core/enums/weight-unit';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { ProductPackagingDto } from '../../../../../core/interfaces/catalog/product-packaging';
import { timeOptions } from '../../../../../core/mocks/time-options';
import { ItemOptionGroupDto } from '../../../../../core/interfaces/catalog/product-option-group';
import { TempletaType } from '../../../../../core/enums/template-type';
import { ItemsService } from '../../../../../core/services/items/items.service';
import { ContextModifierDto } from '../../../../../core/interfaces/catalog/context-modifier';
import {
  PackagingType,
  packagingTypeToString
} from '../../../../../core/enums/packagiong-type';


@Component({
  selector: 'app-item-default-create-or-update-dialog',
  templateUrl: './item-default-create-or-update-dialog.component.html',
  styleUrls: ['./item-default-create-or-update-dialog.component.scss']
})
export class ItemDefaultCreateOrUpdateDialogComponent {
  @ViewChild(MatStepper, { static: true }) stepper!: MatStepper;

  currentStepIndex = 0;
  isMobile = false;
  isLoading = false;

  detailsForm!: FormGroup;
  contextModifiers: ContextModifierDto[] = [];
  itemOptionGroups: ItemOptionGroupDto[] = []
  packagingConfig: { 
      packagingType: PackagingType; 
      productPackaging?: ProductPackagingDto | undefined; 
  } = {
    packagingType: PackagingType.NOT_APPLICABLE,
    productPackaging: undefined
  }

  itemShifts: ShiftDto[] = []

  servingOptions = Object.values(Serving);
  packagingTypeOptions = Object.values(PackagingType);
  weightUnitOptins = Object.values(WeightUnit);
  timeOptions = timeOptions;

  servingToString = servingToString;
  dietaryRestrictionToString = dietaryRestrictionToString;
  packagingTypeToString = packagingTypeToString;

  constructor(
    public dialogRef: MatDialogRef<ItemDefaultCreateOrUpdateDialogComponent>,
    public snackbar: MatSnackBar,
    public windowService: WindowWidthService,
    public itemsService: ItemsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { item: ItemDto | null; categoryId: string }
  ) {
    this.windowService.isMobile().subscribe(isMobile => (this.isMobile = isMobile));

    this.detailsForm = new FormGroup({
      id: new FormControl(this.data.item?.product.id ?? undefined),
      name: new FormControl(this.data.item?.product?.name ?? '', Validators.required),
      description: new FormControl(this.data.item?.product?.description ?? '', [
        Validators.maxLength(1024)
      ]),
      imagePath: new FormControl(
        this.data.item?.product?.imagePath ?? this.data.item?.product?.imagePath
      ),
      serving: new FormControl(this.data.item?.product?.serving ?? Serving.SERVES_1)
    });
  }
  

  isLastStep(): boolean {
    return this.stepper?.selectedIndex === this.stepper?.steps.length - 1;
  }

  isFirstStep(): boolean {
    return this.stepper?.selectedIndex === 0;
  }

  nextStep() {
    if (this.isCurrentStepValid()) {
      this.stepper.next();
    }
  }

  previousStep() {
    this.stepper.previous();
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStepIndex) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return true;
      default:
        return true;
    }
  }

  selctImage(imagePath: string) {
    this.detailsForm.get('imagePath')?.setValue(imagePath);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      const itemDto: ItemDto = {
        ...this.data.item,
        id: this.data.item?.id,
        index: this.data.item?.index ?? -1,
        categoryId: this.data.categoryId,
        status: Status.AVAILIABLE,
        type: TempletaType.DEFAULT,
        optionGroups: this.itemOptionGroups,
        product: {
          id: this.detailsForm.get('id')?.value,
          name: this.detailsForm.get('name')?.value,
          description: this.detailsForm.get('description')?.value,
          serving: this.detailsForm.get('serving')?.value,
          imagePath: this.detailsForm.get('imagePath')?.value ?? null,
          packagingType: this.packagingConfig.packagingType,
          packaging: this.packagingConfig.packagingType ===  PackagingType.PACKAGING
              ? this.packagingConfig.productPackaging
              : undefined
        },
        contextModifiers: this.contextModifiers,
        shifts: this.itemShifts
      };

      this.isLoading = true;

      this.itemsService.updateOrCreate(itemDto).subscribe({
        next: response => {
          this.snackbar.open(
            'O item foi criado/atualizado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: errors => {
          this.isLoading = false;
          this.snackbar.open(
            errors.error.detail || 'Erro ao criar/atualizar o item.',
            'Fechar',
            {
              duration: 3000,
            }
          );

        }
      });
    } else {
      this.snackbar.open('Formulário inválido!', 'fechar', {
        duration: 3000
      })
    }
  }
}
