import { Component } from '@angular/core';
import { CurrentUserService } from '../../../../../core/services/current-user/current-user.service';
import { MerchantUser } from '../../../../../core/interfaces/merchant/merchant-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-menu',
  templateUrl: './admin-user-menu.component.html',
  styleUrl: './admin-user-menu.component.scss'
})
export class AdminUserMenuComponent {

  public user: MerchantUser | null = null
  constructor(
    private readonly currentUser: CurrentUserService,
    private readonly router : Router
    ){
    this.currentUser.getUser().subscribe(user => this.user = user)
  }

  public myPerfil() {
    this.router.navigate(['/perfil'])
  }

  public logout() {
    this.currentUser.logout()
    this.router.navigate([''])
  }

}
