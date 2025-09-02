import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { MerchantUserCreateDto, MerchantUserDto, MerchantUserUpdateDto } from '../../interfaces/merchant/owner-create';



@Injectable({
  providedIn: 'root'
})
export class MerchantUsersService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }


  public list(): Observable<MerchantUserDto[]> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/users`;
    return this.http.get<MerchantUserDto[]>(url);
  }


  public create(dto: MerchantUserCreateDto): Observable<MerchantUserDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/users`;
    return this.http.post<MerchantUserDto>(url, dto);
  }


  public update(merchantUserId: string, dto: MerchantUserUpdateDto): Observable<MerchantUserDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/users/${merchantUserId}`;
    return this.http.put<MerchantUserDto>(url, dto);
  }


  public delete(merchantUserId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/users/${merchantUserId}`;
    return this.http.delete<void>(url);
  }
}
