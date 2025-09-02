import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


export const KEY = 'ROTAFOOD_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  saveToken(token: string): void {
    if (this.isBrowser) localStorage.setItem(KEY, token);
  }
  deleteToken(): void {
    if (this.isBrowser) localStorage.removeItem(KEY);
  }
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(KEY) : null;
  }

  getExp(): number {
    try {
      const { exp } = jwtDecode(this.getToken() as string);
      return exp as number
    } catch {
      return 0
    }

  }
  
  hasToken(): boolean {
    if (this.hasExpired() && !!this.getToken()) {
      this.deleteToken()
      return false;
    }
    return !!this.getToken();
  }

  hasExpired(): boolean | null {
    const currentTime = Math.floor(Date.now() / 1000);
    return this.getExp() < currentTime
  }

}


