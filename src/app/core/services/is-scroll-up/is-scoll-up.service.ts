import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsScollUpService {
  private readonly scrolledUp = new BehaviorSubject<boolean>(false);
  private lastScrollTop = 0;

  constructor() {
    window.addEventListener('scroll', this.detectScrollDirection.bind(this));
  }

  get isScrolledUp(): boolean {
    return this.scrolledUp.value;
  }

  private detectScrollDirection(): void {
    let st = document.documentElement.scrollTop;
    if (st < this.lastScrollTop) {
      // Scrolled up
      this.scrolledUp.next(true);
    } else {
      // Scrolled down
      this.scrolledUp.next(false);
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }
}
