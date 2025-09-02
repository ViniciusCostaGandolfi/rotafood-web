import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowCatalogOnlineSideNavService {

  private readonly showNavSource = new BehaviorSubject<boolean>(false);
  currentShowNav = this.showNavSource.asObservable();

  constructor() {}

  toggleNav(): void {
    
    this.showNavSource.next(!this.showNavSource.value);
  }

  getStatus(): boolean {
    return this.showNavSource.value
  }
}
