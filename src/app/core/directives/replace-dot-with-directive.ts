import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appReplaceDotWithComma]',
  standalone: true,
})
export class ReplaceDotWithCommaDirective {
  @Input() prefix: string = '';
  @Input() decimalPlaces: number = 2;
  private previousValue: string = '';

  constructor(@Optional() @Self() private readonly control?: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart ?? 0;

    if (
      (event.key === 'Backspace' && cursorPosition <= this.prefix.length) ||
      (event.key === 'Delete' && cursorPosition <= this.prefix.length) ||
      (event.key === 'Backspace' && input.value[cursorPosition - 1] === ',') ||
      (event.key === 'Delete' && input.value[cursorPosition] === ',')
    ) {
      event.preventDefault();
    }

    if (
      !/[0-9]/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    let value = target.value.replace(new RegExp(`[^0-9]`, 'g'), '');

    if (value.length <= this.decimalPlaces) {
      value = value.padStart(this.decimalPlaces + 1, '0');
    }

    const integerPart = value.slice(0, value.length - this.decimalPlaces);
    const decimalPart = value.slice(-this.decimalPlaces);

    const formattedValue = `${this.prefix}${parseInt(integerPart, 10)},${decimalPart}`;

    if (this.previousValue === formattedValue) {
      return;
    }

    this.previousValue = formattedValue;

    if (this.control && this.control.control) {
      this.control.control.setValue(formattedValue, { emitEvent: false });
    } else {
      target.value = formattedValue;
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    if (!target.value || target.value.trim() === this.prefix) {
      const defaultValue = `${this.prefix}0,${'0'.repeat(this.decimalPlaces)}`;
      this.previousValue = defaultValue;
      if (this.control && this.control.control) {
        this.control.control.setValue(defaultValue, { emitEvent: false });
      } else {
        target.value = defaultValue;
      }
    }
  }
}
