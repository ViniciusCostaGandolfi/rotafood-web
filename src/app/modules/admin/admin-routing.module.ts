import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminComponent } from './pages/admin.component';
import { MerchantSettingsPageComponent } from './pages/merchant-settings-page/merchant-settings-page.component';
import { OrdersListPageComponent } from './pages/orders-list-page/orders-list-page.component';
import { CatalogsListPageComponent } from './pages/catalogs-list-page/catalogs-list-page.component';
import { OrdersManagerPageComponent } from './pages/orders-manager-page/orders-manager-page.component';
import { LogisticSettingsPageComponent } from './pages/logistic-settings-page/logistic-settings-page.component';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { CommandsListPageComponent } from './pages/commands-list-page/commands-list-page.component';
import { SubscriptionPageComponent } from './pages/subscription-page/subscription-page.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      {
        path: '', 
        component: AdminComponent
      },

      {
        path: 'cardapios', 
        children: [
          {
            path: '', 
            component: CatalogsListPageComponent
          },
        ]
      },

      {
        path: 'configuracoes/entrega',
        component: LogisticSettingsPageComponent
      },

      {
        path: 'funcionarios',
        component: WorkersPageComponent
      },

      {
        path: 'planos',
        component: SubscriptionPageComponent
      },

      {
        path: 'comandas',
        component: CommandsListPageComponent
      },


      {
        path: 'pedidos', 
        children: [
          {
            path: 'listar', 
            component: OrdersListPageComponent
          },

          {
            path: 'gestor',
            component: OrdersManagerPageComponent
          }
        ]
      },

      {
        path: 'configuracoes',
        children: [
          {
            path: '',
            component: MerchantSettingsPageComponent
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
