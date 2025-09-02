import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.scss']
})
export class PriceInputComponent {

  @Input()
  price: number = 0;

  @Input()
  title = ''

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  control = new FormControl()

  get formattedValue(): string {
    return this.formatPrice(this.price);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let rawValue = inputElement.value;

    rawValue = rawValue.replace(/[^\d,]/g, '');

    rawValue = rawValue.replace(',', '.');

    let numericValue = parseFloat(rawValue) || 0;

    this.price = numericValue;
    this.valueChange.emit(this.price);
  }

  formatPrice(value: number): string {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}
