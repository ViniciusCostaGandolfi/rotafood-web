import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { LogisticSettingDto } from '../../interfaces/merchant/merchant-logistic-setting';
import { MerchantOrderEstimateDto } from '../../interfaces/merchant/merchant-order-estimate';


@Injectable({
  providedIn: 'root'
})
export class LogisticService {
private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly CurrentUserService: CurrentUserService
  ) {}


  private getMerchantId(): string | undefined | null {
    return this.CurrentUserService.getCurrentUser()?.merchantId;
  }


  public getLogisticSettings(): Observable<LogisticSettingDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}/logistic/settings`;
    return this.http.get<LogisticSettingDto>(url);
  }

  public createOrUpdateLogisticSettings(dto: LogisticSettingDto): Observable<LogisticSettingDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}/logistic/settings`;
    return this.http.put<LogisticSettingDto>(url, dto);
  }

  public getMerchantOrderEstimates(): Observable<MerchantOrderEstimateDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}/logistic/order-estimate`;
    return this.http.get<MerchantOrderEstimateDto>(url);
  }

  public createOrUpdateMerchantOrderEstimates(dto: MerchantOrderEstimateDto): Observable<MerchantOrderEstimateDto> {
    const merchantId = this.getMerchantId()
    const url = `${this.apiUrl}/${merchantId}/logistic/order-estimate`;
    return this.http.put<MerchantOrderEstimateDto>(url, dto);
  }
}
