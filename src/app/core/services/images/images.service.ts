import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentUserService } from '../current-user/current-user.service';
import { ImageDto } from '../../interfaces/shared/image';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly apiUrl = `${environment.ROTAFOOD_API}/v1/merchants`;

  private readonly imageUploadedSubject = new Subject<string>();
  imageUploaded$ = this.imageUploadedSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly currentUserService: CurrentUserService
  ) {}

  private getMerchantId(): string | undefined | null {
    return this.currentUserService.getCurrentUser()?.merchantId;
  }

  uploadImage(file: File): Observable<ImageDto> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is missing.');
    }

    const formData = new FormData();
    formData.append('image', file);

    const url = `${this.apiUrl}/${merchantId}/images`;
    return this.http.put<ImageDto>(url, formData);
  }

  notifyImageUploaded(imageUrl: string): void {
    this.imageUploadedSubject.next(imageUrl);
  }

  getImages(): Observable<ImageDto[]> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is missing.');
    }

    const url = `${this.apiUrl}/${merchantId}/images`;
    return this.http.get<ImageDto[]>(url);
  }

  deleteImage(imageId: string | undefined): Observable<void> {
    const merchantId = this.getMerchantId();
    if (!merchantId) {
      throw new Error('Merchant ID is missing.');
    }

    const url = `${this.apiUrl}/${merchantId}/images/${imageId}`;
    return this.http.delete<void>(url);
  }
}
