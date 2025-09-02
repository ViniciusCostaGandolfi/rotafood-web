import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { ProductDto } from '../../interfaces/catalog/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }

  public getAll(): Observable<ProductDto[]> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/products`;
    return this.http.get<ProductDto[]>(url);
  }

}
