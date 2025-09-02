import { Routes } from '@angular/router';
import { logedGuard } from './core/guards/loged/loged.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { hasTokenGuard } from './core/guards/has-token/has-token.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ReviewOrderPageComponent } from './pages/review-order-page/review-order-page.component';
import { OrderStatusPageComponent } from './pages/order-status-page/order-status-page.component';
import { VrpTestComponent } from './pages/vrp-test/vrp-test.component';
import { CatalogOnlineContextComponent } from './pages/catalog-online-context/catalog-online-context.component';
import { CatalogsOnlineComponent } from './pages/catalogs-online/catalogs-online.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'RotaFood - Início'
        }
    },
    {
        path: 'entrar',
        component: LoginComponent,
        canActivate: [hasTokenGuard],
        data: {
            title: 'Entrar - RotaFood'
        }
    },
    {
        path: 'registrar',
        component: RegisterComponent,
        canActivate: [hasTokenGuard],
        data: {
            title: 'Registrar - RotaFood'
        }
    },

    {
        path: 'cardapios/:onlineName',
        component: CatalogsOnlineComponent,
        data: {
            title: 'Cardápio Online',
        }
    },

    {
        path: 'cardapios/:onlineName/:catalogContext',
        component: CatalogOnlineContextComponent,
        data: {
            title: 'Cardápio Online',
        }
    },

    {
        path: 'cardapios/:onlineName/:catalogContext/revisar-pedido',
        component: ReviewOrderPageComponent,
        data: {
            title: 'Revisar Pedido',
        }
    },
    {
        path: 'cardapios/:onlineName/pedidos/:orderId',
        component: OrderStatusPageComponent,
        data: {
            title: 'Status do Pedido'
        }
    },
    {
        path: 'routing',
        component: VrpTestComponent,
        data: {
            title: 'Teste de Roterização'
        }

    },
    {
        path: 'test',
        redirectTo: 'routing'
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [logedGuard],
        data: {
            title: 'Admin Rotafood'
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

