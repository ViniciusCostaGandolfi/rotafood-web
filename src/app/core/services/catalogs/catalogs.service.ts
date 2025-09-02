import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { CatalogDto } from '../../interfaces/catalog/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly CurrentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.CurrentUserService.getCurrentUser()?.merchantId;
  }

  getAll(): Observable<CatalogDto[]> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/catalogs`;
    return this.http.get<CatalogDto[]>(url);
  }

  getById(catalogId: string): Observable<CatalogDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/catalogs/${catalogId}`;
    return this.http.get<CatalogDto>(url);
  }

  getCategoriesById(catalogId: string): Observable<CatalogDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/catalogs/${catalogId}/categories`;
    return this.http.get<CatalogDto>(url);
  }

  updateOrCreate(catalogId: string, catalogDto: CatalogDto): Observable<CatalogDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/catalogs/${catalogId}`;
    return this.http.put<CatalogDto>(url, catalogDto);
  }

  changeStatus(catalogId: string, status: string, catalogDto: CatalogDto): Observable<CatalogDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/catalogs/${catalogId}/${status}`;
    return this.http.put<CatalogDto>(url, catalogDto);
  }
}
