import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';
import { Token } from '@angular/compiler';
import { AuthTokenDto, MerchantOwnerCreationDto, LoginDto } from '../../interfaces/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly apiUrl: string = environment.ROTAFOOD_API;
  constructor(
    private readonly http: HttpClient,
    private readonly CurrentUserService: CurrentUserService
    ) { }

  createMerchant(MerchantOwnerCreationDto: MerchantOwnerCreationDto): Observable<Token|any> {
    const url = `${this.apiUrl}/v1/auth/sigin`;
    
    return this.http.post<Token|any>(url, MerchantOwnerCreationDto, { observe: 'response' }).pipe(
      tap(response => {
        const AuthTokenDto = response.body?.accessToken;
        if (AuthTokenDto) {
          this.CurrentUserService.saveToken(AuthTokenDto);
        }
      })
    );
  }

  login(LoginDto: LoginDto): Observable<AuthTokenDto|any> {
    const url = `${this.apiUrl}/v1/auth/login`;

    return this.http.post<Token|any>(url, LoginDto, { observe: 'response' }).pipe(
      tap(response => {
        const AuthTokenDto = response.body?.accessToken;
        if (AuthTokenDto) {
          this.CurrentUserService.saveToken(AuthTokenDto);
        }
      })
    );
  }

  refreshToken():void {
    const url = `${this.apiUrl}/auth/refresh_token/`;
    this.http.post<Token|any>(url, { observe: 'response' }).pipe(
      tap(response => {
        const AuthTokenDto = response.body?.accessToken;
        if (AuthTokenDto) {
          this.CurrentUserService.saveToken(AuthTokenDto);
        } else {
          this.CurrentUserService.logout()
        }
      })
    );

  }
}
