import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private readonly router: Router) {}
  scrollToElementById(id: string) {
    const element = this.__getElementById(id);
    this.scrollToElement(element);
  }

  private __getElementById(id: string): HTMLElement | null{
    const element = document.getElementById(id);
    return element;
  }

  scrollToElement(element: HTMLElement | null) {
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}