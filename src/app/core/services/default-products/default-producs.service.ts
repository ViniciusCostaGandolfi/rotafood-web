import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DefaultProduct } from '../../interfaces/catalog/default-product';

@Injectable({
  providedIn: 'root'
})
export class DefaultProductsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/default-products`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getDefaultProducts(search: string): Observable<DefaultProduct[]> {
    return this.http.get<DefaultProduct[]>(`${this.apiUrl}`, {
      params: { search: search }
    });
  }
}
