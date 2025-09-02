import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }               from '@angular/common';
import { BehaviorSubject, Observable, fromEvent, of } from 'rxjs';
import { map, distinctUntilChanged, startWith }       from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WindowWidthService {

  private readonly width$: Observable<number>;

  private readonly isMobileSubject: BehaviorSubject<boolean>;

  constructor() {
    const platformId   = inject(PLATFORM_ID);
    const isBrowser    = isPlatformBrowser(platformId);

    const firstWidth   = isBrowser ? window.innerWidth : 1024;

    /* stream                                            */
    this.width$ = isBrowser
      ? fromEvent(window, 'resize').pipe(
          map(ev => (ev.target as Window).innerWidth),
          startWith(firstWidth),
          distinctUntilChanged()
        )
      : of(firstWidth)

    this.isMobileSubject = new BehaviorSubject<boolean>(firstWidth <= 600);

    if (isBrowser) {
      this.width$.subscribe(w => this.isMobileSubject.next(w <= 600));
    }
  }

  getWindowWidth(): Observable<number> {
    return this.width$
  };

  isMobile(): Observable<boolean> {
    return this.isMobileSubject.asObservable()
  };
}
