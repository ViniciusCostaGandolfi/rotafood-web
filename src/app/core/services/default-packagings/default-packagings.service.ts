import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultPackagingDto } from '../../interfaces/catalog/default-packaging';

@Injectable({
  providedIn: 'root'
})
export class DefaultPackagingsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/default-packagings`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getDefaultProducts(search: string): Observable<DefaultPackagingDto[]> {
    return this.http.get<DefaultPackagingDto[]>(`${this.apiUrl}`, {
      params: { search: search }
    });
  }
}
