import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }             from '@angular/common';
import { BehaviorSubject, fromEvent, map, throttleTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollYService {

  private readonly scrollYSource = new BehaviorSubject<number>(0);
  readonly  scrollY$             = this.scrollYSource.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {

    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(
          throttleTime(50),
          map(() => window.scrollY)
        )
        .subscribe(pos => this.scrollYSource.next(pos));
    }
  }
}
