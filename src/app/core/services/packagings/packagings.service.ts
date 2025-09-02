
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { PackagingDto } from '../../interfaces/catalog/packaging';

@Injectable({
  providedIn: 'root'
})
export class PackagingsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly CurrentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.CurrentUserService.getCurrentUser()?.merchantId;
  }

  getAll(): Observable<PackagingDto[]> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/packagings`;
    return this.http.get<PackagingDto[]>(url);
  }

  getById(packagingId: string): Observable<PackagingDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/packagings/${packagingId}`;
    return this.http.get<PackagingDto>(url);
  }

  updateOrCreate(PackagingDto: PackagingDto): Observable<PackagingDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/packagings`;
    return this.http.put<PackagingDto>(url, PackagingDto);
  }
}
