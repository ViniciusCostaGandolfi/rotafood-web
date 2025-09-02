import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private readonly http: HttpClient) { }

  public getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }
}
