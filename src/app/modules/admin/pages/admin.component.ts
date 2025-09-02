import { Component } from '@angular/core';
import { MyRoutesService } from '../../../core/services/my-routes/my-routes.service';
import { AdminRoute } from '../../../core/interfaces/shared/admin-route';
import { CurrentUserService } from '../../../core/services/current-user/current-user.service';
import { allRoutes } from '../../../core/mocks/admin-routes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public adminRoutes: AdminRoute[] = []

  constructor(
    private readonly myRoutesService: MyRoutesService,
    private readonly currentUser: CurrentUserService
  ) {
    
  }

  ngOnInit() {
    this.myRoutesService.routes$.subscribe(routes => {
      this.adminRoutes = routes;
    });

    this.currentUser.getUser().subscribe(user => {
    })
  }

}
