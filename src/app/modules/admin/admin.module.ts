import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultFormContainerComponent } from '../../shared/default-form-container/default-form-container.component';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './pages/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AdminDrawerComponent } from './components/admin-layout/admin-drawer/admin-drawer.component';
import { AdminHeaderComponent } from './components/admin-layout/admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminUserMenuComponent } from './components/admin-layout/admin-user-menu/admin-user-menu.component';
import { AdminDrawerListComponent } from './components/admin-layout/admin-drawer/admin-drawer-list/admin-drawer-list.component';
import { NoDataContentComponent } from '../../shared/no-data-content/no-data-content.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingSpinnerDialogComponent } from '../../shared/loading-spinner-dialog/loading-spinner-dialog.component';
import { CanDeleteDialogComponent } from '../../shared/can-delete-dialog/can-delete-dialog.component';
import { DefaultTableHeaderComponent } from './components/default-table-header/default-table-header.component';
import { DefaultTableCellComponent } from './components/default-table-cell/default-table-cell.component';
import { DefaultColumnsControlComponent } from './components/default-columns-control/default-columns-control.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CustomPaginatorProvider } from '../../core/providers/custom-paginator-provider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryUpdateOrCrateDialogComponent } from './components/update-or-create/category-update-or-crate-dialog/category-update-or-crate-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { OptionGroupUpdateOrCreateDialogComponent } from './components/update-or-create/option-group-update-or-create-dialog/option-group-update-or-create-dialog.component';
import { ImageSelectorComponent } from './components/selectors/image-selector/image-selector.component';
import { ReplaceDotWithCommaDirective } from '../../core/directives/replace-dot-with-directive';
import { PackagingUpdateOrCreateDialogComponent } from './components/update-or-create/packaging-update-or-create-dialog/packaging-update-or-create-dialog.component';
import { SelectImageDialogComponent } from './components/selectors/image-selector/select-image-dialog/select-image-dialog.component';
import { StatusToggleComponent } from './components/status-slide-toggle/status-slide-toggle.component';
import { CategoryDefaultOrPizzaDialogComponent } from './components/update-or-create/category-default-or-pizza-dialog/category-default-or-pizza-dialog.component';
import { ItemPreparedOrInstructedDialogComponent } from './components/item-prepared-or-instructed-dialog/item-prepared-or-instructed-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemInstructedSelectorDialogComponent } from './components/selectors/item-instructed-selector-dialog/item-instructed-selector-dialog.component';
import { ItemInstructedCreateDialogComponent } from './components/selectors/item-instructed-selector-dialog/item-instructed-create-dialog/item-instructed-create-dialog.component';
import { ItemPizzaCreateOrUpdateDialogComponent } from './components/update-or-create/item-pizza-create-or-update-dialog/item-pizza-create-or-update-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DefaultPackagingSelectorDialogComponent } from './components/selectors/default-packaging-selector-dialog/default-packaging-selector-dialog.component';
import { MerchantSettingsPageComponent } from './pages/merchant-settings-page/merchant-settings-page.component';
import { PizzaToppingsUpdateOrCreateDialogComponent } from './components/update-or-create/pizza-toppings-update-or-create-dialog/pizza-toppings-update-or-create-dialog.component';
import { OrdersListPageComponent } from './pages/orders-list-page/orders-list-page.component';
import { CatalogsListPageComponent } from './pages/catalogs-list-page/catalogs-list-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ItemDefaultCreateOrUpdateDialogComponent } from './components/update-or-create/item-default-create-or-update-dialog/item-default-create-or-update-dialog.component';
import { OrdersManagerPageComponent } from './pages/orders-manager-page/orders-manager-page.component';
import { SortCategoriesDialogComponent } from './components/sort-categories-dialog/sort-categories-dialog.component';
import { PriceInputComponent } from './pages/catalogs-list-page/price-input/price-input.component';
import { OrderManagerCardComponent } from './components/order-manager-card/order-manager-card.component';
import { LogisticSettingsPageComponent } from './pages/logistic-settings-page/logistic-settings-page.component';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { MerchantOrderEstimateDialogComponent } from './components/merchant-order-estimate-dialog/merchant-order-estimate-dialog.component';
import { OrderCreateOrUpdateComponent } from './components/update-or-create/order-create-or-update/order-create-or-update.component';
import { TableCategoryPizzaComponent } from './pages/catalogs-list-page/table-category-pizza/table-category-pizza.component';
import { TableCategoryDefaultComponent } from './pages/catalogs-list-page/table-category-default/table-category-default.component';
import { ConfigurePrinterDialogComponent } from './components/configure-printer-dialog/configure-printer-dialog.component';
import { CommandsListPageComponent } from './pages/commands-list-page/commands-list-page.component';
import { SubscriptionPageComponent } from './pages/subscription-page/subscription-page.component';
import { CommandCreateOrUpdateDialogComponent } from './components/update-or-create/command-create-or-update-dialog/command-create-or-update-dialog.component';
import { DetailOrderDialogComponent } from './components/detail-order-dialog/detail-order-dialog.component';
import { WorkerUpdateOrCreateDialogComponent } from './components/update-or-create/worker-update-or-create-dialog/worker-update-or-create-dialog.component';
import { ContextModifiersComponent } from './components/forms/context-modifiers-form/context-modifiers-form.component';
import { OptionGroupsFormComponent } from './components/forms/option-groups-form/option-groups-form.component';
import { PackagingsFormComponent } from './components/forms/packagings-form/packagings-form.component';
import { ShiftsFormComponent } from './components/forms/shifts-form/shifts-form.component';
import { CopyOptionGroupsDialogComponent } from './components/copy-option-groups-dialog/copy-option-groups-dialog.component';
import { ProductSelectorDialogComponent } from './components/selectors/product-selector-dialog/product-selector-dialog.component';
import { AddressAutocompleteComponent } from '../../shared/address-autocomplete/address-autocomplete.component';





@NgModule({
  declarations: [
    AdminDrawerComponent,
    AdminDrawerListComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminUserMenuComponent,
    AdminComponent,
    SelectImageDialogComponent,
    StatusToggleComponent,
    ImageSelectorComponent,
    PackagingUpdateOrCreateDialogComponent,
    CategoryDefaultOrPizzaDialogComponent,
    ItemInstructedCreateDialogComponent,
    OrderManagerCardComponent,
    ItemPizzaCreateOrUpdateDialogComponent,
    LogisticSettingsPageComponent,
    CategoryUpdateOrCrateDialogComponent,
    MerchantSettingsPageComponent,
    CopyOptionGroupsDialogComponent,
    DetailOrderDialogComponent,
    SubscriptionPageComponent,
    PackagingsFormComponent,
    ShiftsFormComponent,
    OptionGroupsFormComponent,
    CommandCreateOrUpdateDialogComponent,
    DefaultPackagingSelectorDialogComponent,
    ContextModifiersComponent,
    ItemDefaultCreateOrUpdateDialogComponent,
    PriceInputComponent,
    CommandsListPageComponent,
    ItemInstructedSelectorDialogComponent,
    OptionGroupUpdateOrCreateDialogComponent,
    OrderCreateOrUpdateComponent,
    ItemPreparedOrInstructedDialogComponent,
    ConfigurePrinterDialogComponent,
    SortCategoriesDialogComponent,
    OrdersManagerPageComponent,
    PizzaToppingsUpdateOrCreateDialogComponent,
    WorkerUpdateOrCreateDialogComponent,
    TableCategoryPizzaComponent,
    TableCategoryDefaultComponent,
    CatalogsListPageComponent,
    WorkersPageComponent,
    ProductSelectorDialogComponent,
    MerchantOrderEstimateDialogComponent,
    OrdersListPageComponent, 
    DefaultTableHeaderComponent,
    DefaultTableCellComponent,
    DefaultColumnsControlComponent

  ],
  imports: [
    AdminRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatProgressSpinner,
    MatDatepickerModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatNavList,
    MatMenuModule,
    MatFormFieldModule,
    QRCodeModule,
    MatInputModule,
    MatDialogModule,
    ReplaceDotWithCommaDirective,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultFormContainerComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerDialogComponent,
    CanDeleteDialogComponent,
    SpinnerButtonComponent,
    FooterComponent,
    NoDataContentComponent,
    NgxMapLibreGLModule,
    AddressAutocompleteComponent
],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorProvider },
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { maxWidth: '100vw', hasBackdrop: true } },
    provideNativeDateAdapter()

  ],
  

})


export class AdminModule { }
