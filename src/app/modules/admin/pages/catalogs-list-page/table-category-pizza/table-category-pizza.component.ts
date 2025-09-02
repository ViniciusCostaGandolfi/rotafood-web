import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ContextModifierDto } from '../../../../../core/interfaces/catalog/context-modifier';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Status } from '../../../../../core/enums/status';
import { numberToString } from '../../../../../core/helpers/string-number-parser';
import { OptionDto } from '../../../../../core/interfaces/order/option';
import { CanDeleteDialogComponent } from '../../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { PizzaToppingsUpdateOrCreateDialogComponent } from '../../../components/update-or-create/pizza-toppings-update-or-create-dialog/pizza-toppings-update-or-create-dialog.component';
import { ItemDto } from '../../../../../core/interfaces/catalog/item';
import { MatDialog } from '@angular/material/dialog';
import { ContextModifiersService } from '../../../../../core/services/context-modifiers/context-modifiers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionGroupsService } from '../../../../../core/services/option-groups/option-groups.service';
import { MatTable } from '@angular/material/table';
import { FullCategoryDto } from '../../../../../core/interfaces/catalog/category';
import { OptionGroupType } from '../../../../../core/enums/option-group-type';
import { CatalogContext, catalogContextToString } from '../../../../../core/enums/catalog-context';
import { SortRequestDto } from '../../../../../core/interfaces/shared/sort-request';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-table-category-pizza',
  templateUrl: './table-category-pizza.component.html',
  styleUrl: './table-category-pizza.component.scss'
})
export class TableCategoryPizzaComponent {

  catalogContextToString = catalogContextToString

  optionOrderChanges: SortRequestDto[] = [];


  @Input()
  category!: FullCategoryDto;

  @Input()
  catalog!: CatalogContext;

  @ViewChild('pizzaTable') table!: MatTable<any>;

  @Output()
  categoryUpdated = new EventEmitter<FullCategoryDto>();

  isMobile = false



  constructor(
    private readonly dialog: MatDialog,
    private readonly contextModifiersService: ContextModifiersService,
    private readonly snackbar: MatSnackBar,
    private readonly optionGroupsService: OptionGroupsService,
    private readonly windowService: WindowWidthService,
    ) { }
  
  
    ngOnInit() {
      this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.category = changes['category'].currentValue
      this.renderRows();
    }
  }

  public renderRows() {
    if (this.table) {
      this.table.renderRows()
    }
  }


  public findParentOptionName(parentOptionId: string): string | null {
    const item = this.category.items.at(0)
    if (!item?.optionGroups) return null;
    for (const group of item?.optionGroups) {
      for (const option of group.optionGroup.options) {
        if (option.id === parentOptionId) {
          return option.product?.name || 'Sem nome';
        }
      }
    }
    return null;
  }


  moveOptionUp(index: number): void {
    const toppings = this.getToppingFromCategoryPizza(this.category);
    if (index <= 0) return;
    [toppings[index - 1], toppings[index]] = [toppings[index], toppings[index - 1]];
    this.saveOptionOrderChanges(toppings);
    this.renderRows();
  }
  
  moveOptionDown(index: number): void {
    const toppings = this.getToppingFromCategoryPizza(this.category);
    if (index >= toppings.length - 1) return;
    [toppings[index + 1], toppings[index]] = [toppings[index], toppings[index + 1]];
    this.saveOptionOrderChanges(toppings);
    this.renderRows();;
  }
  
  private saveOptionOrderChanges(options: OptionDto[]) {
    this.optionOrderChanges = options.map((option, index) => ({
      id: option.id,
      index
    }));
  }


  public updateOrCreateItemPizzaTopping(data: { item: ItemDto, option?: OptionDto }) {
    this.dialog.open(PizzaToppingsUpdateOrCreateDialogComponent, {
      data: data,
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      

    }).afterClosed().subscribe((updatedItem: ItemDto) => {
      if (updatedItem) {
        const index = this.category.items.findIndex(i => i.id === updatedItem.id);
        if (index >= 0) {
          this.category.items[index] = updatedItem;
        } else {
          this.category.items.push(updatedItem);
        }
        this.renderRows();
      }
    });
  }


  public deleteOption(option: OptionDto) {

    const optionGroupId = this.category.items.at(0)?.optionGroups?.find(og => og.optionGroup.optionGroupType === OptionGroupType.TOPPING)?.optionGroup.id

    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: `Tem certeza que deseja deletar o sabor "${option.product.name}"?` }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.optionGroupsService.deleteOption(optionGroupId as string, option.id as string).subscribe({
          next: () => {
            this.snackbar.open('Sabor removido com sucesso!', 'Fechar', { duration: 3000 });
            location.reload()
          },
          error: errors => {
            this.snackbar.open(errors.error.detail || 'Erro ao remover o sabor.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }


  public getToppingFromCategoryPizza(category: FullCategoryDto) {
    return category.items.at(0)?.optionGroups?.find(og => og.optionGroup.optionGroupType === OptionGroupType.TOPPING)?.optionGroup.options ?? []
  }


  public formatPrice(value?: number) {
    return numberToString(value, 2)
  }

  public onPriceChange(contextModifier: ContextModifierDto, event: number): void {
    contextModifier.price.value = event

    this.contextModifiersService.updateOrCreate(contextModifier).subscribe({
      next: response => {
        contextModifier = response
        this.snackbar.open('O preço atualizado com sucesso!', 'fechar', { duration: 3000 });
      },
      error: errors => {
        this.snackbar.open(errors.error.detail || 'Erro ao atualizar o preço.', 'fechar');
      }
    })
  }

  public onStatusChange(contextModifier: ContextModifierDto, event: MatSlideToggleChange): void {
    contextModifier.status = event.checked ? Status.AVAILIABLE : Status.UNAVAILABLE

    this.contextModifiersService.updateOrCreate(contextModifier).subscribe({
      next: response => {
        contextModifier = response
        this.snackbar.open('O status atualizado com sucesso!', 'fechar', { duration: 3000 });
      },
      error: errors => {
        this.snackbar.open(errors.error.detail || 'Erro ao atualizar o status.', 'fechar');
      }
    })
  }


  public saveAllChanges(): void {

    const optionGroupId = this.category.items.at(0)?.optionGroups?.find(
      og => og.optionGroup.optionGroupType === OptionGroupType.TOPPING
    )?.optionGroup.id;
  
    if (optionGroupId && this.optionOrderChanges.length > 0) {
      this.optionGroupsService.sortOptions(optionGroupId, this.optionOrderChanges).subscribe({
        next: () => {
          this.snackbar.open('Sabores reordenados com sucesso!', 'Fechar', { duration: 3000 })
          this.optionOrderChanges = []
        },
        error: errors => this.snackbar.open(errors.error.detail || 'Erro ao reordenar sabores.', 'Fechar')
      });
    }
  }
}