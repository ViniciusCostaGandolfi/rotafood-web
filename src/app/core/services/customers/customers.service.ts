import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FullCustomerDto } from '../../interfaces/order/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

 private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/customers`;

  constructor(
    private readonly http: HttpClient,
  ) {}

  public getByPhone(phone: string) {
    return this.http.get<FullCustomerDto>(`${this.apiUrl}/phone/${phone}`);
  }


}
