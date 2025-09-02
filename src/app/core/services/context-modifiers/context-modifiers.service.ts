import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user/current-user.service';
import { ContextModifierDto } from '../../interfaces/catalog/context-modifier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextModifiersService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }

  /**
   * Create or update an OptionGroup
   */
  public updateOrCreate(contextModifierDto: ContextModifierDto): Observable<ContextModifierDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/contextModifiers`;
    return this.http.put<ContextModifierDto>(url, contextModifierDto);
  }

}
