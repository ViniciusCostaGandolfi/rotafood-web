import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ContextModifierDto } from '../../../../../core/interfaces/catalog/context-modifier';
import { Status } from '../../../../../core/enums/status';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { numberToString } from '../../../../../core/helpers/string-number-parser';
import { ItemDefaultCreateOrUpdateDialogComponent } from '../../../components/update-or-create/item-default-create-or-update-dialog/item-default-create-or-update-dialog.component';
import { ItemDto } from '../../../../../core/interfaces/catalog/item';
import { FullCategoryDto } from '../../../../../core/interfaces/catalog/category';
import { CanDeleteDialogComponent } from '../../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { ItemPreparedOrInstructedDialogComponent } from '../../../components/item-prepared-or-instructed-dialog/item-prepared-or-instructed-dialog.component';
import { MatTable } from '@angular/material/table';
import { ItemsService } from '../../../../../core/services/items/items.service';
import { CategoriesService } from '../../../../../core/services/cetegories/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ContextModifiersService } from '../../../../../core/services/context-modifiers/context-modifiers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogContext, catalogContextToString } from '../../../../../core/enums/catalog-context';
import { SortRequestDto } from '../../../../../core/interfaces/shared/sort-request';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-table-category-default',
  templateUrl: './table-category-default.component.html',
  styleUrl: './table-category-default.component.scss'
})
export class TableCategoryDefaultComponent {

  itemOrderChanges: SortRequestDto[] = [];


  catalogContextToString = catalogContextToString

  public isMobile: boolean = false;

  @Input()
  category!: FullCategoryDto;
  

  @Input()
  catalog!: CatalogContext;

  @ViewChild('defaultTable') table!: MatTable<any>;

  @Output()
  categoryUpdated = new EventEmitter<FullCategoryDto>();

  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly contextModifiersService: ContextModifiersService,
    private readonly snackbar: MatSnackBar,
    private readonly windowService: WindowWidthService,
  ) { }


  ngOnInit() {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.category = changes['category'].currentValue
      this.renderRows()
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

  public renderRows() {
    if (this.table) {
      this.table.renderRows()
    }
  }
  

  public sortItemsInCategory(categoryId: string | undefined): void {
    if (!this.category) return;

    const sortedItems = this.category.items.map((item, index) => ({
      id: item.id,
      index
    }));

    this.categoriesService.sortItemsInCategory(categoryId, sortedItems).subscribe({
      next: () => {
        this.snackbar.open('Itens reordenados com sucesso!', 'Fechar', { duration: 3000 })
        this.renderRows()
      },
      error: errors => this.snackbar.open(errors.error.detail || 'Erro ao reordenar itens.', 'Fechar')
    });
  }

  moveItemUp(index: number): void {
    if (index <= 0) return;
    const items = this.category.items;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    this.saveItemOrderChanges();
    this.table.renderRows()
  }
  
  moveItemDown(index: number): void {
    if (index >= this.category.items.length - 1) return;
    const items = this.category.items;
    [items[index + 1], items[index]] = [items[index], items[index + 1]];
    this.saveItemOrderChanges();
    this.table.renderRows()
  }
  
  private saveItemOrderChanges() {
    this.itemOrderChanges = this.category.items.map((item, index) => ({
      id: item.id,
      index
    }));
  }
  



  public createItemPreparedOrInstructedDialog(data: { item: ItemDto | null; categoryId: string | undefined }) {
    this.dialog.open(ItemPreparedOrInstructedDialogComponent, {
      data: data,
      width: '70%',
      height: '70%'
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



  public deleteItem(data: { item: ItemDto | null; categoryId: string | undefined }) {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: `Tem certeza que deseja deletar o item "${data.item?.product?.name}"?` }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.itemsService.deleteById(data.item?.id as string).subscribe({
          next: () => {
            this.category.items = this.category.items.filter(item => item.id !== data.item?.id);
            this.renderRows();
            this.snackbar.open('Item deletado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackbar.open('Ocorreu um erro ao deletar o item.', 'Fechar', {
            });
          }
        });
      }
    });
  }


  public updateOrCreateItemDefault(data: { item: ItemDto | null; categoryId: string | undefined }) {
    this.dialog.open(ItemDefaultCreateOrUpdateDialogComponent, {
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
        this.renderRows()
      }
    });
  }

  public formatPrice(value?: number) {
    return numberToString(value, 2)
  }

  public getDisplayedColumns(): string[] {
    return this.isMobile
      ? ['image', 'name', 'status', 'price','actions']
      : ['image', 'name', 'status', 'price', 'actions'];
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
    if (this.itemOrderChanges.length > 0) {
      this.categoriesService.sortItemsInCategory(this.category.id, this.itemOrderChanges).subscribe({
        next: () => {
          this.snackbar.open('Itens reordenados com sucesso!', 'Fechar', { duration: 3000 })
          this.itemOrderChanges = []
        },
        error: errors => this.snackbar.open(errors.error.detail || 'Erro ao reordenar itens.', 'Fechar')
      });
    }
  }
  
}