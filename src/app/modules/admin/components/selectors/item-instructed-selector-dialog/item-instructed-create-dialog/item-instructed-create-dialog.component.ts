import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemDto } from '../../../../../../core/interfaces/catalog/item';
import { ShiftDto } from '../../../../../../core/interfaces/shared/shift';
import { DietaryRestriction, dietaryRestrictionToString } from '../../../../../../core/enums/dietary-restrictions';
import { MatStepper } from '@angular/material/stepper';
import { OptionGroupsService } from '../../../../../../core/services/option-groups/option-groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Serving } from '../../../../../../core/enums/serving';
import { numberToString, stringToNumber } from '../../../../../../core/helpers/string-number-parser';
import { CatalogContext, catalogContextToString } from '../../../../../../core/enums/catalog-context';
import { WeightUnit } from '../../../../../../core/enums/weight-unit';
import { WindowWidthService } from '../../../../../../core/services/window-width/window-width.service';
import { PackagingDto } from '../../../../../../core/interfaces/catalog/packaging';
import { timeOptions } from '../../../../../../core/mocks/time-options';
import { DefaultProduct } from '../../../../../../core/interfaces/catalog/default-product';
import { ContextModifierDto } from '../../../../../../core/interfaces/catalog/context-modifier';
import { Status } from '../../../../../../core/enums/status';
import { PackagingType, packagingTypeToString } from '../../../../../../core/enums/packagiong-type';
import { ProductPackagingDto } from '../../../../../../core/interfaces/catalog/product-packaging';
import { TempletaType } from '../../../../../../core/enums/template-type';
import { ItemsService } from '../../../../../../core/services/items/items.service';
import { PackagingsService } from '../../../../../../core/services/packagings/packagings.service';

@Component({
  selector: 'app-item-instructed-create-dialog',
  templateUrl: './item-instructed-create-dialog.component.html',
  styleUrl: './item-instructed-create-dialog.component.scss'
})
export class ItemInstructedCreateDialogComponent {
  @ViewChild(MatStepper, {static : true } ) stepper!: MatStepper;
  currentStepIndex = 0; 
  detailsForm!: FormGroup;
  contextModifiersForm: FormGroup;
  availabilityForm!: FormGroup;
  classificationForm!: FormGroup;
  packagingsForm!: FormGroup;
  packagingOptions: PackagingDto[] = [];

  isMobile = false

  isLoading = false

  dietaryRestrictionToString = dietaryRestrictionToString;

  weightUnitOptins = Object.values(WeightUnit)

  timeOptions = timeOptions

  packagingTypeOptions = [PackagingType.NOT_APPLICABLE, PackagingType.SIDE_BAG]

  packagingTypeToString = packagingTypeToString

  catalogContextToString = catalogContextToString

  constructor(
    public dialogRef: MatDialogRef<ItemInstructedCreateDialogComponent>,
    public snackbar: MatSnackBar,
    public windowService: WindowWidthService,
    public dialog: MatDialog,
    public itemsService: ItemsService,
    public optionGroupService: OptionGroupsService,
    public packagingsService: PackagingsService,
    @Inject(MAT_DIALOG_DATA) public data: {product: DefaultProduct, categoryId: string}
  ) {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);


    this.detailsForm = new FormGroup({
      name: new FormControl(this.data?.product.name ?? '', Validators.required),
      description: new FormControl(this.data?.product.description ?? '', [Validators.maxLength(1000)]),
      imagePath: new FormControl(this.data?.product.imagePath ?? this.data?.product.iFoodImagePath),
      serving: new FormControl(Serving.NOT_APPLICABLE),
    });



    this.classificationForm = new FormGroup({
      VEGETARIAN: new FormControl(false),
      VEGAN: new FormControl(false),
      ORGANIC: new FormControl(false),
      GLUTEN_FREE: new FormControl(false),
      SUGAR_FREE: new FormControl(false),
      LAC_FREE: new FormControl(false),
      ALCOHOLIC_DRINK: new FormControl(false),
      NATURAL: new FormControl(false),
      ZERO: new FormControl(false),
      DIET: new FormControl(false),
    });



    this.contextModifiersForm = new FormGroup({
      contextModifiers: new FormArray(
        this.defaultContextModifiers().map((m: ContextModifierDto) => this.createContextModifierForm(m))
      )
    });


    

    this.packagingsForm = new FormGroup({
      packagingType: new FormControl(PackagingType.NOT_APPLICABLE, Validators.required),
      productPackagings: new FormArray([])
    });    

    this.availabilityForm = new FormGroup({
      alwaysAvailable: new FormControl(true),
      shifts: new FormArray([])
  })

    this.loadPackagings();
  }

  createContextModifierForm(contextModifier?: ContextModifierDto): FormGroup {
    return new FormGroup({
      id: new FormControl(contextModifier?.id ?? undefined),
      catalogContext: new FormControl(contextModifier?.catalogContext ?? '', Validators.required),
      status: new FormControl(contextModifier?.status ?? true, Validators.required),
      price: new FormGroup({
        id: new FormControl(contextModifier?.price?.id ?? undefined),
        value: new FormControl(numberToString(contextModifier?.price?.value, 2, 'R$: '), Validators.required),
        originalValue: new FormControl(numberToString(contextModifier?.price?.originalValue, 2, 'R$: ')),
        hasDiscount: new FormControl<boolean>((contextModifier?.price?.originalValue ?? 0) > 0)
      })
    });
  }

  defaultContextModifiers() {
    return [
      { catalogContext: CatalogContext.TABLE, status: Status.AVAILIABLE, price: { value: 0, originalValue: 0 } },
      { catalogContext: CatalogContext.DELIVERY, status: Status.AVAILIABLE, price: { value: 0, originalValue: 0 } },
      { catalogContext: CatalogContext.IFOOD, status: Status.AVAILIABLE, price: { value: 0, originalValue: 0 } }
    ];
  }

  getCatalogContextToString(value: any): string {
    if (value in CatalogContext) return catalogContextToString[value as CatalogContext];
    return '';
  }

  getContextModifiersFormArray(): FormArray {
    return this.contextModifiersForm.get('contextModifiers') as FormArray
  }


  loadPackagings() {
    this.packagingsService.getAll().subscribe({
      next: (response) => {''
        this.packagingOptions = response;
      },

      error: (errors) => {
        this.snackbar.open(errors.error, 'fechar')
      }
    })
  }

  get shiftsForm() {
    return this.availabilityForm.get('shifts') as FormArray;
  }


  createShiftGroup(shift?: ShiftDto): FormGroup {
    return new FormGroup({
      startTime: new FormControl(shift?.startTime ?? '', Validators.required),
      endTime: new FormControl(shift?.endTime ?? '', Validators.required),
      monday: new FormControl(shift?.monday ?? false),
      tuesday: new FormControl(shift?.tuesday ?? false),
      wednesday: new FormControl(shift?.wednesday ?? false),
      thursday: new FormControl(shift?.thursday ?? false),
      friday: new FormControl(shift?.friday ?? false),
      saturday: new FormControl(shift?.saturday ?? false),
      sunday: new FormControl(shift?.sunday ?? false),
    });
  }

  addShift() {
    (this.availabilityForm.get('shifts') as FormArray).push(this.createShiftGroup({} as ShiftDto));
  }


  getFormControlRestriction(restriction: DietaryRestriction) {
    const control = this.classificationForm.get(restriction);
    if (!control || !(control instanceof FormControl)) {
      throw new Error(`Control for ${restriction} is not a FormControl`);
    }
    return control;
  }

  onCancel() {
    this.dialogRef.close();
  }

  isLastStep(): boolean {
    return this.stepper?.selectedIndex === this.stepper?.steps?.length - 1;
  }
  
  isFirstStep(): boolean {
    return this.stepper?.selectedIndex === 0;
  }
  

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStepIndex++;
      this.stepper.selectedIndex = this.currentStepIndex;
    }
  }

  previousStep(): void {
    if (!this.isFirstStep()) {
      this.currentStepIndex--;
      this.stepper.selectedIndex = this.currentStepIndex;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStepIndex) {
      case 0:
        return this.detailsForm.valid;
      case 1:
        return this.contextModifiersForm.valid;
      default:
        return true;
    }
  }

  onSubmit() {
    if (this.detailsForm.valid && this.availabilityForm.valid) {
      const contextModifiers = this.contextModifiersForm.get('contextModifiers')?.value.map((c: any) => ({
        ...c,
        status: c.status ? Status.AVAILIABLE : Status.UNAVAILABLE,
        price: {
          ...c.price,
          value: stringToNumber(c.price.value),
          originalValue: stringToNumber(c.price.originalValue)
        }
      }));
      const itemDto: ItemDto = {
        categoryId: this.data.categoryId,
        status: Status.AVAILIABLE,
        type: TempletaType.DEFAULT,
        index: -1,
        product: {
          id: this.detailsForm.get('id')?.value,
          name: this.detailsForm.get('name')?.value,
          description: this.detailsForm.get('description')?.value,
          serving: this.detailsForm.get('serving')?.value,
          imagePath: this.detailsForm.get('imagePath')?.value,
          packagingType: this.packagingsForm.get('packagingType')?.value,
          packaging: this.packagingsForm.get('packagingType')?.value === PackagingType.PACKAGING
            ? this.packagingsForm.get('productPackagings')?.value as ProductPackagingDto
            : undefined
        },
        contextModifiers,
        shifts: this.availabilityForm.get('alwaysAvailable')?.value === true ? [] : this.availabilityForm.get('shifts')?.value as ShiftDto[]
      };

      

      this.isLoading = true
      this.itemsService.updateOrCreate(itemDto).subscribe({
        next: response => {
          this.isLoading = false
          this.snackbar.open('O item foi criado/atualizado com sucesso!', 'fechar', { duration: 3000 });
          this.dialogRef.close(response)
        },
        error: errors => {
          this.isLoading = false
          this.snackbar.open(errors.error.detail || 'Erro ao criar/atualizar o item.', 'fechar');
        }
      });
    } else {
      console.error('Formulário inválido!');
    }
  }

  

}
