import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrintDto } from '../../interfaces/merchant/print';
import { environment } from '../../../../environments/environment';

const STORAGE_KEY = 'ROTAFOOD_PRINTER_CONFIGURATION';

@Injectable({ providedIn: 'root' })
export class LocalPrinterService {
  private apiUrl = environment.PRINTER_URL;

  constructor(private http: HttpClient) {}

  listPrinters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/printer/list`, { headers: new HttpHeaders() });
  }

  print(dto: PrintDto) {
    return this.http.post<void>(`${this.apiUrl}/printer/print`, dto, { headers: new HttpHeaders() });
  }

  cleanPrint(text: string) {
    const dto = this.getConfig()
    if (dto) {
      this.http.post<void>(`${this.apiUrl}/printer/print`, {...dto, text: text}, { headers: new HttpHeaders() }).subscribe()
    }
  }

  getConfig(): PrintDto | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PrintDto) : null;
  }

  saveConfig(cfg: PrintDto) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  }
}
