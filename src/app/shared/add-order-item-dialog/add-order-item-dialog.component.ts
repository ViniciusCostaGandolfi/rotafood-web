import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ItemDto } from '../../core/interfaces/catalog/item';
import { OptionDto } from '../../core/interfaces/order/option';
import { CatalogContext } from '../../core/enums/catalog-context';
import { OrderItemOptionDto } from '../../core/interfaces/order/order-item-option';
import { OrderItemDto } from '../../core/interfaces/order/order-item';
import { ContextModifierDto } from '../../core/interfaces/catalog/context-modifier';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from '../../core/enums/status';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-order-item-dialog',
  templateUrl: './add-order-item-dialog.component.html',
  styleUrls: ['./add-order-item-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class AddOrderItemDialogComponent {
  orderItemForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<AddOrderItemDialogComponent>,
    private readonly snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { item: ItemDto; context: CatalogContext, canAdd?: boolean }
  ) {
    this.orderItemForm = new FormGroup({
      options: new FormArray([]),
      observations: new FormControl('')
    });

    if (data.canAdd === undefined) {
      this.data.canAdd = true
    }

    this.initializeOptionGroups();
  }

  decrementOption(group: FormGroup | AbstractControl, index: number): void {
    const control = this.getOptionFormGroup(group, index).get('quantity') as FormControl;
    if (control.value > 0) {
      control.setValue(control.value - 1);
    }
  }


  getOptionsFormArray(): FormArray {
    return this.orderItemForm.get('options') as FormArray;
  }

  getPriceValueByContext(data: ItemDto | OptionDto): number {
    const contextModifier = data.contextModifiers.find(mod => mod.catalogContext === this.data.context);
    return contextModifier ? contextModifier.price.value : 0;
  }

  getSelectedOptionsFormControl(group: FormGroup | AbstractControl): FormControl {
    return group.get('selectedOptions.option') as FormControl;
  }

  getOptionFormGroup(group: FormGroup | AbstractControl, index: number): FormGroup {
    return (group.get('selectedOptions') as FormArray).at(index) as FormGroup;
  }

  isItemAvailable(): boolean {
    return this.data.item.contextModifiers.some(mod =>
      mod.catalogContext === this.data.context && mod.status === Status.AVAILIABLE
    );
  }

  initializeOptionGroups() {
    if (this.data.item.optionGroups) {
      this.data.item.optionGroups.forEach(group => {
        const firstOption = group.optionGroup.options.length > 0 ? group.optionGroup.options[0] : null;
  
        const selectedOptionsControl = group.min === 1 && group.max === 1
          ? new FormGroup({
              option: new FormControl(firstOption),
              quantity: new FormControl(1)
            })
          : new FormArray(
              group.optionGroup.options.map(option =>
                new FormGroup({
                  option: new FormControl(option),
                  quantity: new FormControl(0)
                })
              )
            );
  
        const groupForm = new FormGroup({
          groupId: new FormControl(group.id),
          groupName: new FormControl(group.optionGroup.name),
          selectedOptions: selectedOptionsControl
        });
  
        this.getOptionsFormArray().push(groupForm);
      });
    }
  }

  isMaxReached(group: AbstractControl): boolean {
    const selectedOptionsControl = group.get('selectedOptions') as FormArray;
    const groupId = group.get('groupId')?.value;
    const groupData = this.data.item.optionGroups?.find(g => g.id === groupId);
    const max = groupData?.max;
  
    const totalSelected = selectedOptionsControl.controls.reduce((acc, ctrl) => {
      return acc + (ctrl.get('quantity')?.value || 0);
    }, 0);
  
    return max !== undefined && totalSelected >= max;
  }
  
  
  incrementOption(group: FormGroup | AbstractControl, index: number): void {
    const control = this.getOptionFormGroup(group, index).get('quantity') as FormControl;
    const selectedOptionsControl = group.get('selectedOptions') as FormArray;
  
    const groupId = group.get('groupId')?.value;
    const groupData = this.data.item.optionGroups?.find(g => g.id === groupId);
    const max = groupData?.max ?? null;
  
    const totalSelected = selectedOptionsControl.controls.reduce((acc, ctrl) => {
      return acc + (ctrl.get('quantity')?.value || 0);
    }, 0);
  
    if (!max || totalSelected < max) {
      control.setValue(control.value + 1);
    } else {
      this.snackbar.open(`Você pode escolher no máximo ${max} opção(ões) para este grupo.`, 'Fechar', { duration: 3000 });
    }
  }
  
  
  

  setSelectedOption(group: FormGroup | AbstractControl, selectedOption: OptionDto): void {
    const selectedOptions = group.get('selectedOptions') as FormControl;
    if (selectedOptions) {
      selectedOptions.setValue({ option: selectedOption, quantity: 1 });
    }
  }
  


  createOrderItemOptionDto(option: OptionDto, groupName: string, groupId: string, quantity: number): OrderItemOptionDto {
    const contextModifier = option.contextModifiers.find(mod => mod.catalogContext === this.data.context) as ContextModifierDto;
    const optionDetail = {
      id: option.id,
      name: option.product?.name || '',
      description: option.product?.description || '',
      ean: option.product?.ean || '',
      additionalInformation: option.product?.additionalInformation || '',
      serving: option.product?.serving || null,
      imagePath: option.product?.imagePath || ''
    }
    return {
      quantity: quantity,
      totalPrice: contextModifier.price.value * quantity,
      contextModifierId: contextModifier?.id as string,
      groupName: groupName,
      groupId: groupId,
      option: optionDetail
    };
  }

  calculateTotalPrice(): number {
    let totalPrice = this.getPriceValueByContext(this.data.item);
    this.getOptionsFormArray().controls.forEach(group => {
      const selectedOptionsControl = group.get('selectedOptions');
      if (selectedOptionsControl instanceof FormGroup) {
        const selectedOption = selectedOptionsControl.value.option;
        if (selectedOption) {
          totalPrice += this.getPriceValueByContext(selectedOption);
        }
      } else if (selectedOptionsControl instanceof FormArray) {
        selectedOptionsControl.controls.forEach(optionGroup => {
          const option = optionGroup.get('option')?.value;
          const quantity = optionGroup.get('quantity')?.value;
          if (option && quantity > 0) {
            totalPrice += this.getPriceValueByContext(option) * quantity;
          }
        });
      }
    });
    return totalPrice;
  }

  onSubmit() {
    const orderOptions: OrderItemOptionDto[] = [];
  
    for (const group of this.getOptionsFormArray().controls) {
      const groupId = group.get('groupId')?.value;
      const groupName = group.get('groupName')?.value;
      const groupData = this.data.item.optionGroups?.find(g => g.id === groupId);
  
      const selectedOptionsControl = group.get('selectedOptions');
      let totalSelected = 0;
  
      if (selectedOptionsControl instanceof FormGroup) {
        const selectedOption = selectedOptionsControl.value.option;
        totalSelected = selectedOption ? 1 : 0;
      } else if (selectedOptionsControl instanceof FormArray) {
        totalSelected = selectedOptionsControl.controls.reduce((sum, ctrl) => {
          return sum + (ctrl.get('quantity')?.value || 0);
        }, 0);
      }
  
      if (groupData) {
        if (totalSelected < groupData.min) {
          this.snackbar.open(
            `Você deve selecionar pelo menos ${groupData.min} opção(ões) para o grupo ${groupName}.`,
            'Fechar', { duration: 3000 }
          );
          return;
        }
      }
  
      if (selectedOptionsControl instanceof FormGroup) {
        const selectedOption = selectedOptionsControl.value.option;
        if (selectedOption) {
          orderOptions.push(this.createOrderItemOptionDto(selectedOption, groupName, groupId, 1));
        }
      } else if (selectedOptionsControl instanceof FormArray) {
        selectedOptionsControl.controls.forEach(optionGroup => {
          const option = optionGroup.get('option')?.value;
          const quantity = optionGroup.get('quantity')?.value;
  
          if (option && quantity > 0) {
            orderOptions.push(this.createOrderItemOptionDto(option, groupName, groupId, quantity));
          }
        });
      }
    }
  
    const contextModifier = this.data.item.contextModifiers.find(mod => mod.catalogContext === this.data.context);
    const orderItem: OrderItemDto = {
      quantity: 1,
      totalPrice: this.calculateTotalPrice(),
      contextModifierId: contextModifier?.id as string,
      item: {
        id: this.data.item.id,
        name: this.data.item.product.name,
        description: this.data.item.product.description,
        ean: this.data.item.product.ean,
        additionalInformation: this.data.item.product.additionalInformation,
        serving: this.data.item.product.serving,
        imagePath: this.data.item.product.imagePath,
      },
      options: orderOptions,
      observations: this.orderItemForm.get('observations')?.value
    };

    console.log(orderItem)


    this.snackbar.open('Item adicionado ao pedido!', 'Fechar', { duration: 500 });
    this.dialogRef.close(orderItem);
  }
  


}
