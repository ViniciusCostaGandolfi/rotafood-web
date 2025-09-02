import { Component } from '@angular/core';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { AdminRoute } from '../../../../../core/interfaces/shared/admin-route';
import { MyRoutesService } from '../../../../../core/services/my-routes/my-routes.service';
import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';

@Component({
  selector: 'app-admin-drawer',
  templateUrl: './admin-drawer.component.html',
  styleUrl: './admin-drawer.component.scss'
})
export class AdminDrawerComponent {
  public showNav = false;
  public isMobile = false;
  public adminRoutes: AdminRoute[] = []
  public homeRoute: AdminRoute = {
    title: 'Início',
    icon: 'dashboard',
    href: '/admin'
  };

  constructor(
    public windowService: WindowWidthService,
    public sideNavService: ShowAdminSideNavService,
    private readonly myRoutesService: MyRoutesService
    ) {
      this.sideNavService.currentShowNav.subscribe(showNav => this.showNav = showNav);
      this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
      
      this.myRoutesService.routes$.subscribe(routes => {
        this.adminRoutes = routes;
      });
    }
}