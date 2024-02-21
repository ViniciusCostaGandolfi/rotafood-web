import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutingComponent } from './pages/routing/routing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { hasTokenGuard } from './core/guards/has-token/has-token.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, 
    },
    {
        path: 'login',
        component: LoginComponent, 
        canActivate: [hasTokenGuard]

    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [hasTokenGuard]
    },
    {
        path: 'routing',
        component: RoutingComponent

    },
    {
        path: 'test',
        redirectTo: 'routing'
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [logedGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

