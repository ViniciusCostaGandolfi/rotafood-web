import { Injectable } from '@angular/core';
import { TokenService } from '../jwt-token/token.service';
import { MerchantUser } from '../../interfaces/merchant/merchant-user';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { TokenMerchantUser } from '../../interfaces/merchant/token-merchant-user';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly userSubject = new BehaviorSubject<MerchantUser | null>(null);

  constructor(private readonly tokenService: TokenService) {
    if(this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const tokenMerchantUser = jwtDecode(token as string) as TokenMerchantUser;
    this.userSubject.next(tokenMerchantUser.merchantUser);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getCurrentUser(): MerchantUser | null {
    return this.userSubject.getValue();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  hasLogged() {
    return this.tokenService.hasToken();
  }

}
