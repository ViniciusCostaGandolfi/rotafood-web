import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogOnlineService } from '../../core/services/catalog-online/catalog-online.service';
import { ContextModifierDto } from '../../core/interfaces/catalog/context-modifier';
import { ItemDto } from '../../core/interfaces/catalog/item';
import { CatalogContext } from '../../core/enums/catalog-context';
import { WindowWidthService } from '../../core/services/window-width/window-width.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderItemDialogComponent } from '../../shared/add-order-item-dialog/add-order-item-dialog.component';
import { ShowCatalogOnlineSideNavService } from '../../core/services/show-catalog-online-side-nav/show-catalog-online-side-nav.service';
import { FullCategoryDto } from '../../core/interfaces/catalog/category';
import { getHasOpened } from '../../core/helpers/get-has-opened';
import { Meta, Title } from '@angular/platform-browser';
import { Status } from '../../core/enums/status';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatalogOnlineLayoutComponent } from '../../shared/catalog-online-layout/catalog-online-layout.component';
import { FullMerchantDto } from '../../core/interfaces/merchant/full-merchant';
import { SharedOrderService } from '../../core/services/shared-order/shared-order.service';

@Component({
  selector: 'app-catalog-online-context',
  templateUrl: './catalog-online-context.component.html',
  styleUrl: './catalog-online-context.component.scss',
  standalone: true,
  imports: [
     CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDividerModule,
        MatRadioModule,
        MatCardModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        CatalogOnlineLayoutComponent
  ]
})
export class CatalogOnlineContextComponent {
  merchant: FullMerchantDto | undefined = undefined;
  categories: FullCategoryDto[] = []
  isMobile = false;
  catalogContext = CatalogContext.DELIVERY
  hasOpened = false
  isLoading = false;
  selectedCategory = '';

  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;



  constructor(
    private catalogOnlineService: CatalogOnlineService,
    private route: ActivatedRoute,
    private windowService: WindowWidthService,
    private sharedOrder: SharedOrderService,
    private showCatalogOnlineSideNav: ShowCatalogOnlineSideNavService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta
  ) {}

  

  ngOnInit(): void {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);

    this.route.paramMap.subscribe(params => {
      const onlineName = params.get('onlineName');
      if (onlineName) {
        this.fetchData(onlineName);
      }

      const catalogContext = params.get('catalogContext');
      if (catalogContext && catalogContext === 'entrega') {
        this.catalogContext  = CatalogContext.DELIVERY
      } else if(catalogContext && catalogContext === 'mesa') {
        this.catalogContext = CatalogContext.TABLE
      }
    });

  }
  

  addOrderItem(item: ItemDto, context: CatalogContext = CatalogContext.DELIVERY) {
    if (item && context) {
        this.dialog.open(AddOrderItemDialogComponent, {
            data: {item, context, canAdd: this.catalogContext === CatalogContext.DELIVERY},
            width: this.isMobile ? "calc(100% - 30px)" : '50%',
            height: this.isMobile ? "calc(100% - 30px)" : '90%',
            maxWidth: "100%",
            maxHeight: "100%" 
          }).afterClosed().subscribe(
            orderItem => {
            if (orderItem) {
              this.sharedOrder.addItem(orderItem);
              if (!this.showCatalogOnlineSideNav.getStatus()) {
                this.showCatalogOnlineSideNav.toggleNav()
              }
            }
          })
    }
  }

  fetchData(onlineName: string): void {
    this.isLoading = true;

    this.catalogOnlineService.getMerchantByOnlineName(onlineName).subscribe({
      next: (response) => {
        this.merchant = response;
        this.hasOpened = getHasOpened(response);
        this.updateMeta()
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Merchant não encontrado :(', 'fechar');
      }
    });
  
    this.catalogOnlineService.getCategoriesByOnlineName(onlineName).subscribe({
      next: (response) => {
        this.categories = response;
        this.selectedCategory = response[0].name
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Restaurante não encontrado :(', 'fechar');
      }
    });
  }

  private updateMeta() {
    const merchant = this.merchant;
    const title = merchant?.name ?? 'Cardápio Online';
    const desc  = merchant?.description
               ?? 'Confira nosso cardápio online!';
    const img   = merchant?.imagePath
               ?? 'https://rotafood.com.br/assets/images/rotafood-icone.png';
  
    this.titleService.setTitle(title);
  
    this.metaService.updateTag({ name: 'description', content: desc });
  
    this.metaService.updateTag({ property: 'og:type',        content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name',   content: 'RotaFood' });
    this.metaService.updateTag({ property: 'og:locale',      content: 'pt_BR'   });
    this.metaService.updateTag({ property: 'og:title',       content: title     });
    this.metaService.updateTag({ property: 'og:description', content: desc      });
    this.metaService.updateTag({ property: 'og:image',       content: img       });
  
    this.metaService.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title',       content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: desc  });
    this.metaService.updateTag({ name: 'twitter:image',       content: img   });
    
  }
  
  getDescriptionSlice(description: string): string {
    const maxLength = this.isMobile ? 50 : 200;
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
  }

  getMinimumPrice(item: ItemDto): number {
    if (!item || !item.contextModifiers) return 0;
  
    const context = this.catalogContext;
  
    const basePrice = item.contextModifiers.find(mod => mod.catalogContext === context)?.price.value || 0;
  
    const minRequiredOptionPrices = (item.optionGroups || [])
      .filter(group => group.min === 1 && group.optionGroup?.options?.length > 0)
      .map(group => {
        const prices = group.optionGroup.options
          .map(opt =>
            opt.contextModifiers.find(mod => mod.catalogContext === context)?.price.value ?? Number.POSITIVE_INFINITY
          );
        return Math.min(...prices);
      });
  
    const totalOptionsPrice = minRequiredOptionPrices.reduce((sum, price) => sum + price, 0);
  
    return basePrice + totalOptionsPrice;
  }

  isItemAvailable(item: ItemDto): boolean {
    return item.contextModifiers.some(mod =>
      mod.catalogContext === this.catalogContext && mod.status === Status.AVAILIABLE
    );
  }
    
  

  getPriceByContext(modifiers: ContextModifierDto[]): number {
    const deliveryModifier = modifiers.find(mod => mod.catalogContext === this.catalogContext);
    return deliveryModifier ? deliveryModifier.price.value : 0;
  }

  getOriginalPrice(modifiers: ContextModifierDto[]): number | null {
    const deliveryModifier = modifiers.find(mod => mod.catalogContext === this.catalogContext);
    return deliveryModifier?.price.originalValue ?? null;
  }

  hasDiscount(modifiers: ContextModifierDto[]): boolean {
    const deliveryModifier = modifiers.find(mod => mod.catalogContext === this.catalogContext);
    if (deliveryModifier) {
      return deliveryModifier.price.originalValue > 0;
    }
    return false;
  }

  scrollToCategory(name: string) {
    const element = document.getElementById(this.formatCategoryId(name));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  formatCategoryId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }


}