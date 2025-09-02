
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressDto } from '../../interfaces/shared/address';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/places`;

  constructor(private http: HttpClient) {}

  getAddressByCep(cep: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(`${this.apiUrl}/cep/${cep}`);
  }

  getAddressByLatitudeAndLongitude(lat: number, lng: number): Observable<AddressDto> {
    if (!lat || !lng) {
      throw new Error('Latitude e longitude são obrigatórios.');
    }
    let params = new HttpParams();
    params = params.append('latitude', lat.toString());
    params = params.append('longitude', lng.toString());

    return this.http.get<AddressDto>(`${this.apiUrl}/reverse-geocoding`, { params });
  }


  searchAddress(query: string): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiUrl}/search`, {
      params: { q: query },
    });
  }
}
