import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { ItemDto } from '../../interfaces/catalog/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }

  /**
   * Retorna todos os itens associados ao merchant.
   */
  public getAll(): Observable<ItemDto[]> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/items`;
    return this.http.get<ItemDto[]>(url);
  }

  /**
   * Cria ou atualiza um item.
   * @param itemDto - Os dados do item para criação ou atualização.
   */
  public updateOrCreate(itemDto: ItemDto): Observable<ItemDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/items`;
    return this.http.put<ItemDto>(url, itemDto);
  }

  /**
   * Retorna um item pelo ID.
   * @param itemId - O ID do item a ser buscado.
   */
  public getById(itemId: string): Observable<ItemDto> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/items/${itemId}`;
    return this.http.get<ItemDto>(url);
  }

  /**
   * Deleta um item pelo ID.
   * @param itemId - O ID do item a ser deletado.
   */
  public deleteById(itemId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    const url = `${this.apiUrl}/${merchantId}/items/${itemId}`;
    return this.http.delete<void>(url);
  }
}
