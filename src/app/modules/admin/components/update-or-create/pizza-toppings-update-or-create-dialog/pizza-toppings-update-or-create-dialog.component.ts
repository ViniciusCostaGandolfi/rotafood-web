import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ItemDto } from '../../../../../core/interfaces/catalog/item';
import { ProductOptionDto } from '../../../../../core/interfaces/catalog/product-option';
import { OptionDto } from '../../../../../core/interfaces/order/option';
import { ContextModifierDto } from '../../../../../core/interfaces/catalog/context-modifier';
import { numberToString, stringToNumber } from '../../../../../core/helpers/string-number-parser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogContext, catalogContextToString } from '../../../../../core/enums/catalog-context';
import { Status } from '../../../../../core/enums/status';
import { ItemsService } from '../../../../../core/services/items/items.service';

@Component({
  selector: 'app-pizza-toppings-update-or-create-dialog',
  templateUrl: './pizza-toppings-update-or-create-dialog.component.html',
  styleUrls: ['./pizza-toppings-update-or-create-dialog.component.scss'],
})
export class PizzaToppingsUpdateOrCreateDialogComponent {
  currentStepIndex = 0;

  @ViewChild(MatStepper, { static: true }) stepper!: MatStepper;

  productForm = new FormGroup({
    id: new FormControl(this.data.option?.product?.id ?? null),
    name: new FormControl(this.data.option?.product?.name ?? '', Validators.required),
    description: new FormControl(this.data.option?.product?.description ?? '', [Validators.maxLength(255)]),
    imagePath: new FormControl(this.data.option?.product?.imagePath ?? '')
  });

  optionForm = new FormGroup({
    id: new FormControl<string | null>(null),
    status: new FormControl<Status | null>(Status.AVAILIABLE),
    index: new FormControl<number>(-1),
    contextModifiers: new FormArray<FormGroup<any>>([])
  });

  sizes: OptionDto[] = []

  catalogContextToString = catalogContextToString;


  constructor(
    public dialogRef: MatDialogRef<PizzaToppingsUpdateOrCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: ItemDto, option?: OptionDto },
    public itemsService: ItemsService,
    private readonly snackbar: MatSnackBar
  ) {
    const sizeGroup = this.data.item.optionGroups?.find(
      (og) => og.optionGroup.optionGroupType === 'SIZE'
    );


    if (!sizeGroup || !sizeGroup.optionGroup.options.length) {
      this.snackbar.open('É necessário configurar os tamanhos antes.', 'Fechar', { duration: 3000 });
      return;
    }

    this.sizes = sizeGroup.optionGroup.options;


    let contextModifiers = []

    if (this.data.option) {
      contextModifiers = this.data.option?.contextModifiers.map((modifier) =>
        this.createContextModifierForm(modifier)
      )
    } else {
      contextModifiers = this.sizes.flatMap((sizeOption) =>
        (this.data.option?.contextModifiers || this.defaultContextModifiers(sizeOption.id)).map((modifier) =>
          this.createContextModifierForm(modifier)
        )
      );
    }

    this.optionForm = new FormGroup({
      id: new FormControl(this.data.option?.id),
      status: new FormControl<Status | null>(this.data.option?.status ?? Status.AVAILIABLE),
      index: new FormControl(this.data.option?.index ?? -1),
      contextModifiers: new FormArray(contextModifiers),
    }) as any;

  }


  getContextModifiersArray(): FormArray {
    return this.optionForm.get('contextModifiers') as FormArray;
  }
  
  

  defaultContextModifiers(parentOptionId: string | undefined) {
    return [
      { catalogContext: CatalogContext.TABLE, status: Status.AVAILIABLE, parentOptionId: parentOptionId, price: { value: 0, originalValue: 0 } },
      { catalogContext: CatalogContext.DELIVERY, status: Status.AVAILIABLE, parentOptionId: parentOptionId, price: { value: 0, originalValue: 0 } },
      { catalogContext: CatalogContext.IFOOD, status: Status.AVAILIABLE, parentOptionId: parentOptionId, price: { value: 0, originalValue: 0 } },
    ];
  }

  createProductOptionForm(product?: ProductOptionDto): FormGroup {
    return new FormGroup({
      name: new FormControl(product?.name ?? '', Validators.required),
      description: new FormControl(product?.description ?? ''),
      imagePath: new FormControl(product?.imagePath ?? ''),
    });
  }

  createContextModifierForm(contextModifier?: ContextModifierDto): FormGroup {
    return new FormGroup({
      id: new FormControl(contextModifier?.id ?? undefined),
      catalogContext: new FormControl(contextModifier?.catalogContext ?? '', Validators.required),
      status: new FormControl(contextModifier?.status ?? true, Validators.required),
      parentOptionId: new FormControl(contextModifier?.parentOptionId ?? null),
      price: new FormGroup({
        id: new FormControl(contextModifier?.price?.id ?? undefined),
        value: new FormControl(numberToString(contextModifier?.price?.value, 2, 'R$: '), Validators.required),
        originalValue: new FormControl(numberToString(contextModifier?.price?.originalValue, 2, 'R$: ')),
        hasDiscount: new FormControl<boolean>((contextModifier?.price?.originalValue ?? 0) > 0)
      })
    });
  }

  getContextModifierByParentOption(parentOption: OptionDto): FormGroup<any>[] {
    const allContextModifiers = this.optionForm.get('contextModifiers') as FormArray;

    return allContextModifiers.controls.filter((control) => {
      const parentOptionId = control.get('parentOptionId')?.value;
      return (parentOptionId === parentOption.id &&  control.get('catalogContext')?.value !== 'IFOOD');
    }) as FormGroup<any>[];
  }


  selctImage(path: string) {
    this.productForm.controls.imagePath.setValue(path)
  }


  onCancel() {
    this.dialogRef.close();
  }

  nextStep() {
    if (this.isCurrentStepValid() && this.currentStepIndex < this.stepper.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  previousStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  isLastStep(): boolean {
    return this.stepper?.selectedIndex === this.stepper?.steps?.length - 1;
  }

  isFirstStep(): boolean {
    return this.stepper?.selectedIndex === 0;
  }


  isCurrentStepValid(): boolean {
    switch (this.currentStepIndex) {
      case 0: return this.productForm.valid;
      case 1: return this.optionForm.valid;
      default: return true;
    }
  }


  onSubmit() {
    if (this.productForm.valid && this.optionForm.valid) {

      const product = this.productForm.value;


      const toppingOption = {
        ...this.optionForm.value,
        product: product,
        contextModifiers: this.optionForm.value.contextModifiers?.map((cm: any) => ({
          id: cm.id,
          catalogContext: cm.catalogContext,
          status: cm.status,
          parentOptionId: cm.parentOptionId,
          itemId: this.data.item.id,
          price: {
            value: stringToNumber(cm.price.value),
            originalValue: stringToNumber(cm.price.originalValue),
          },
        })),
      };



      const updatedItem = {
        ...this.data.item,
        product: {
          ...this.data.item.product,
          optionGroups: this.data.item.optionGroups?.map((group) => {
            if (group.optionGroup.optionGroupType === 'TOPPING') {
              const existingOptions = group.optionGroup.options || [];
      

              return {
                ...group,
                optionGroup: {
                  ...group.optionGroup,
                  options: [...existingOptions, toppingOption],
                },
              };
            }
      
            return group;
          }),
        },
      };
      

      this.itemsService.updateOrCreate(updatedItem as unknown as ItemDto).subscribe({
        next: (response) => {
          this.snackbar.open('Sabores adicionados com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.snackbar.open(error.error || 'Erro ao adicionar sabores.', 'Fechar');
        },
      });
    } else {
      console.error('Formulário inválido!');
    }
  }



}
