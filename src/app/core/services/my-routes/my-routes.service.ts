import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';
import { MerchantUser } from '../../interfaces/merchant/merchant-user';
import { allRoutes } from '../../mocks/admin-routes';
import { AdminRoute } from '../../interfaces/shared/admin-route';
import { MerchantUserRole } from '../../enums/merchant-user-role';

@Injectable({
  providedIn: 'root'
})
export class MyRoutesService {
  private readonly routesSubject = new BehaviorSubject<AdminRoute[]>([]);
  public routes$: Observable<AdminRoute[]> = this.routesSubject.asObservable();

  constructor(private readonly currentUserService: CurrentUserService) {
    this.currentUserService.getUser().subscribe((user: MerchantUser | null) => {
      if (user && user.role) {
        const filteredRoutes = this.filterRoutesByRole(user.role);
        this.routesSubject.next(filteredRoutes);
      }
    });
  }

  private filterRoutesByRole(role: MerchantUserRole): AdminRoute[] {
    return allRoutes[role];
}

}
