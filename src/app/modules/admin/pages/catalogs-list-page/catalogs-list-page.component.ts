import { ChangeDetectorRef, Component } from '@angular/core';
import { CatalogsService } from '../../../../core/services/catalogs/catalogs.service';
import { CatalogDto } from '../../../../core/interfaces/catalog/catalog';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { CatalogContext } from '../../../../core/enums/catalog-context';
import { catalogContextToString } from '../../../../core/mappers/catalog-context-to-string';
import { CategoriesService } from '../../../../core/services/cetegories/categories.service';
import { CategoryDto, FullCategoryDto } from '../../../../core/interfaces/catalog/category';
import { ItemDto } from '../../../../core/interfaces/catalog/item';
import { statusToString } from '../../../../core/enums/status';
import { CategoryDefaultOrPizzaDialogComponent } from '../../components/update-or-create/category-default-or-pizza-dialog/category-default-or-pizza-dialog.component';
import { ItemPreparedOrInstructedDialogComponent } from '../../components/item-prepared-or-instructed-dialog/item-prepared-or-instructed-dialog.component';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryUpdateOrCrateDialogComponent } from '../../components/update-or-create/category-update-or-crate-dialog/category-update-or-crate-dialog.component';
import { TempletaType } from '../../../../core/enums/template-type';
import { ItemPizzaCreateOrUpdateDialogComponent } from '../../components/update-or-create/item-pizza-create-or-update-dialog/item-pizza-create-or-update-dialog.component';
import { PizzaToppingsUpdateOrCreateDialogComponent } from '../../components/update-or-create/pizza-toppings-update-or-create-dialog/pizza-toppings-update-or-create-dialog.component';
import { OptionDto } from '../../../../core/interfaces/order/option';
import { SortRequestDto } from '../../../../core/interfaces/shared/sort-request';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-catalogs-list-page',
  templateUrl: './catalogs-list-page.component.html',
  styleUrl: './catalogs-list-page.component.scss'
})
export class CatalogsListPageComponent {
  public catalogs = [
    CatalogContext.TABLE,
    CatalogContext.DELIVERY,
    CatalogContext.IFOOD
  ]
  public categories: FullCategoryDto[] = []
  public categoryOrderChanges: SortRequestDto[] = [];
  public isLoading = false
  public statusToString = statusToString;
  public activeTabIndex: number = 0; 
  public displayedColumns: string[] = ['image', 'name', 'status', 'price', 'actions'];
  public isMobile = false

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly windowService: WindowWidthService,
    ) { }
  
  
    ngOnInit() {
      this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
      this.isLoading = true

      this.loadData()
  }

  public catalogContextToString(context: CatalogContext) {
    return catalogContextToString[context]
  }

  public loadData() {
    this.categoriesService.getAll().subscribe({
      next: (response) => {
        this.categories = response  
        this.isLoading = false;
      },
      error: (errors) => {
        console.error('Error:', errors);
        this.isLoading = false;
      }
    })
  }

  public updateOrCreateCategory(category?: FullCategoryDto, template: TempletaType = TempletaType.DEFAULT) {

    if (category && template === TempletaType.DEFAULT) {
      this.dialog.open(CategoryUpdateOrCrateDialogComponent, {
        data: category,
       width: '80%',
        height: '50%'
      }).afterClosed().subscribe((response: FullCategoryDto) => {
        if (response) {
          const index = this.categories.findIndex(c => c.id === response.id);
          if (index >= 0) {
            this.categories[index] = response;
          } else {
            this.categories.push(response);
          }
        }
      });
    } else if (category && template === TempletaType.PIZZA) {
      this.dialog.open(ItemPizzaCreateOrUpdateDialogComponent, {
        data: { item: category?.items[0], categoryId: category?.items[0].categoryId },
        width: '90vw',
        height: '90vh'
      }).afterClosed().subscribe((response) => {
        if (response) {
          const index = this.categories.findIndex(c => c.id === response.id);
          if (index >= 0) {
            this.categories[index] = response;
          } else {
            this.categories.push(response);
          }
        }
      });
    } else {
      this.dialog.open(CategoryUpdateOrCrateDialogComponent, {
        width: '80%',
        height: '50%'
      }).afterClosed().subscribe((response: FullCategoryDto) => {
        console.log(response)
        if (response) {
          const index = this.categories.findIndex(c => c.id === response.id);
          if (index >= 0) {
            this.categories[index] = response;
          } else {
            this.categories.push(response);
          }
        }
      });
    }
  }

  public deleteCategory(category: CategoryDto | FullCategoryDto) {
      const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
        data: { message: `Tem certeza que deseja deletar a categoria "${category.name}"?` }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.categoriesService.deleteById(category?.id).subscribe({
            next: () => {
              this.loadData()
              this.snackbar.open('Categoria deletada com sucesso!', 'Fechar', {
                duration: 3000,
              });
            },
            error: () => {
              this.snackbar.open('Ocorreu um erro ao deletar a categoria.', 'Fechar', {
              });
            }
          });
        }
      });
  }

  moveCategoryUp(index: number): void {
    if (index > 0) {
      [this.categories[index - 1], this.categories[index]] = [this.categories[index], this.categories[index - 1]];
      this.updateCategoryOrderChanges();
    }
  }

  moveCategoryDown(index: number): void {
    if (index < this.categories.length - 1) {
      [this.categories[index], this.categories[index + 1]] = [this.categories[index + 1], this.categories[index]];
      this.updateCategoryOrderChanges();
    }
  }

  private updateCategoryOrderChanges() {
    this.categoryOrderChanges = this.categories.map((category, index) => ({
      id: category.id,
      index
    }));
  }

  public saveCategoryOrderChanges(): void {
    if (this.categoryOrderChanges.length > 0) {
      this.categoriesService.sortCategories(this.categoryOrderChanges).subscribe({
        next: () => {
          this.snackbar.open('Categorias reordenadas com sucesso!', 'Fechar', { duration: 3000 });
          this.categoryOrderChanges = [];
        },
        error: errors => this.snackbar.open(errors.error.detail || 'Erro ao reordenar categorias.', 'Fechar')
      });
    } else {
      this.snackbar.open('Nenhuma alteração para salvar.', 'Fechar', { duration: 3000 });
    }
  }

  public createItemPreparedOrInstructedDialog(data: { item: ItemDto | null; categoryId: string | undefined }) {
    this.dialog.open(ItemPreparedOrInstructedDialogComponent, {
      data: data,
      width: '80%',
      height: '50%'
    }).afterClosed().subscribe((updatedItem: ItemDto) => {
      if (updatedItem && data.categoryId) {
        const category = this.categories.find(c => c.id === data.categoryId);
        if (category) {
          const index = category.items.findIndex(i => i.id === updatedItem.id);
          if (index >= 0) {
            category.items[index] = updatedItem;
          } else {
            category.items.push(updatedItem);
          }
          const categoryIndex = this.categories.findIndex(c => c.id === category.id);
          this.categories[categoryIndex] = { ...category, items: [...category.items] }; 
          this.categories = [...this.categories];
        }
        
      }
    });
  }
  

  public updateOrCreateItemPizzaTopping(data: { item: ItemDto, option?: OptionDto }) {
    this.dialog.open(PizzaToppingsUpdateOrCreateDialogComponent, {
      data: data,
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
      

    }).afterClosed().subscribe((updatedItem: ItemDto) => {
      if (updatedItem) {
        const category = this.categories.find(c => c.id === updatedItem.categoryId);
        if (category) {
          const index = category.items.findIndex(i => i.id === updatedItem.id);
          if (index >= 0) {
            category.items[index] = updatedItem;
          } else {
            category.items.push(updatedItem);
          }
          this.categories = [...this.categories];
        }
      }
    });
  }
  
  
}