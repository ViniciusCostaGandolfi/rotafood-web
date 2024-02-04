import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../interfaces/address';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Merchant } from '../../interfaces/merchant';
import { Cvrp } from '../../interfaces/cvrp';

@Injectable({
  providedIn: 'root',
})
export class FormRoutineTestService {

  private apiUrl: string = environment.ROTAFOOD_API;
  constructor(private http: HttpClient) { }

  autoGenerateRoutes(numberOfOrders: number, address: Address): Observable<Cvrp|any> {
    const url = `${this.apiUrl}/routes/test/auto_generate/${numberOfOrders}/`;
    const merchant: Merchant = {
      name: 'Seu Restaurante',
      documentType: 'CPF', // Ajuste conforme necessário. Talvez 'CPF' ou 'CNPJ'
      document: 'XXX.XXX.XXX-XX', // Certifique-se de que este é um valor válido
      address: {
        ...address,
      }
    };
    
    return this.http.post(url, merchant);
  }
}
