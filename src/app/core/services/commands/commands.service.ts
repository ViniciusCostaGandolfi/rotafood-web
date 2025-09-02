import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { Observable } from 'rxjs';
import { CommandDto, FullCommandDto } from '../../interfaces/command/full-command-dto';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private readonly apiUrl: string = `${environment.ROTAFOOD_API}/v1/merchants`;

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }

  getAllCommands(): Observable<FullCommandDto[]> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands`;
    return this.http.get<FullCommandDto[]>(url);
  }

  getAllCommandsSimplified(): Observable<CommandDto[]> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands/simplified`;
    return this.http.get<CommandDto[]>(url);
  }

  getCommandById(commandId: string): Observable<FullCommandDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands/${commandId}`;
    return this.http.get<FullCommandDto>(url);
  }

  createOrUpdateCommand(command: FullCommandDto): Observable<FullCommandDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands`;
    return this.http.put<FullCommandDto>(url, command);
  }


  closeCommand(command: FullCommandDto): Observable<FullCommandDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands/${command.id}/close`;
    return this.http.put<FullCommandDto>(url, command);
  }

  deleteCommand(commandId: string): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) throw new Error('Merchant ID is required');

    const url = `${this.apiUrl}/${merchantId}/commands/${commandId}`;
    return this.http.delete<void>(url);
  }
}
