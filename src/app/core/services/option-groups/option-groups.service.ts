import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { OptionGroupDto } from '../../interfaces/order/option-group';
import { OptionGroupType } from '../../enums/option-group-type';
import { OptionDto } from '../../interfaces/order/option';
import { SortRequestDto } from '../../interfaces/shared/sort-request';


@Injectable({
  providedIn: 'root'
})
export class OptionGroupsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }


  public getAll(optionGroupType?: OptionGroupType): Observable<OptionGroupDto[]> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
  
    let params = new HttpParams(); 
    if (optionGroupType) {
      params = params.set('optionGroupType', optionGroupType);
    }
  
    const url = `${this.apiUrl}/${merchantId}/optionGroups`;
    return this.http.get<OptionGroupDto[]>(url, { params });
  }
  

  public getById(optionGroupId: string): Observable<OptionGroupDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/optionGroups/${optionGroupId}`;
    return this.http.get<OptionGroupDto>(url);
  }


  public updateOrCreate(optionGroupDto: OptionGroupDto): Observable<OptionGroupDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/optionGroups`;
    return this.http.put<OptionGroupDto>(url, optionGroupDto);
  }


  public delete(optionGroupId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/optionGroups/${optionGroupId}`;
    return this.http.delete<void>(url);
  }

  public sortOptions(optionGroupId: string, sortedOptions: SortRequestDto[]): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/optionGroups/${optionGroupId}/options/sort`;
    return this.http.put<void>(url, sortedOptions);
  }


  public deleteOption(optionGroupId: string, optionId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is not available');
    }
    const url = `${this.apiUrl}/${merchantId}/optionGroups/${optionGroupId}/options/${optionId}`;
    return this.http.delete<void>(url);
  }
}
