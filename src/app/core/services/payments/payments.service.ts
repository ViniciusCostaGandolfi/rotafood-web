import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { StripePaymentStatusDto } from '../../interfaces/payment/stripe-dto';







@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }


  validatePayment(sessionId?: string): Observable<StripePaymentStatusDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    let params = new HttpParams();
    if (sessionId) {
      params = params.set('session_id', sessionId);
    }

    const url = `${this.apiUrl}/${merchantId}/payments`;
    return this.http.get<StripePaymentStatusDto>(url, { params });
  }
}
