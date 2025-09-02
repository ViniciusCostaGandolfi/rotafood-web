import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NumberFormatService {
  constructor() {}

  numberToString(value: number | null | undefined, decimal = 2, prefix = ''): string {
    if (value === null || value === undefined) {
      return `${prefix}0,00`;
    }

    return `${prefix}${value.toLocaleString('pt-BR', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    })}`;
  }

  stringToNumber(value: string | null | undefined): number {
    if (!value) return 0;
    if (typeof value === 'number') return value;

    const sanitized = value.replace(/[^0-9,]/g, '').replace(',', '.');
    const parsed = parseFloat(sanitized);
    return isNaN(parsed) ? 0 : parsed;
  }

  stringMaxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = this.stringToNumber(control.value);
      return value > max ? { max: { requiredMax: max, actual: value } } : null;
    };
  }

  stringMinValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = this.stringToNumber(control.value);
      return value < min ? { min: { requiredMin: min, actual: value } } : null;
    };
  }
}
