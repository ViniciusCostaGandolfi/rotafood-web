import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { FullMerchantDto } from '../../interfaces/merchant/full-merchant';
import { Observable } from 'rxjs';
import { LogisticSettingDto } from '../../interfaces/merchant/merchant-logistic-setting';
import { MerchantOrderEstimateDto } from '../../interfaces/merchant/merchant-order-estimate';
import { RouteDto } from '../../interfaces/catalog/distance-out';
import { AddressDto } from '../../interfaces/shared/address';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly CurrentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.CurrentUserService.getCurrentUser()?.merchantId;
  }
  
  public get(): Observable<FullMerchantDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}`;
    return this.http.get<FullMerchantDto>(url);
  }

  public update(merchant: FullMerchantDto): Observable<FullMerchantDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}`;
    return this.http.put<FullMerchantDto>(url, merchant);
  }

  public getRoute(address: AddressDto) {
      const merchantId = this.getMerchantId()
      const url = `${this.apiUrl}/${merchantId}/distances`;
      return this.http.post<RouteDto>(url, address);
  }

}
