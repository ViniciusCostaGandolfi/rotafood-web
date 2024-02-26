import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory, ProductCategoryParams } from '../../interfaces/product-category';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiUrl: string = `${environment.ROTAFOOD_API}/product_category`;

  constructor(private http: HttpClient) { }

  getProductCategories(searchParams?: ProductCategoryParams | any): Observable<ProductCategory[] | any> {

    let queryParams = new HttpParams()
    if (searchParams) {
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined) {
          queryParams = queryParams.append(key, searchParams[key].toString());
        }
      });
    }
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/`, {params: queryParams});
  }

  getProductCategoryById(id: number): Observable<ProductCategory | any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProductCategory>(url);
  }

  createProductCategory(productCategory: ProductCategory): Observable<ProductCategory | any> {
    return this.http.post<ProductCategory>(`${this.apiUrl}/`, productCategory);
  }

  deleteProductCategoryById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editProductCategoryById(id: number, productCategory: ProductCategory): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, productCategory);
  }
}