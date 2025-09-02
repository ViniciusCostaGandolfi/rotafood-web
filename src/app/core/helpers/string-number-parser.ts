import { DecimalPipe } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



export function numberToString(value: number | null | undefined, decimal: number = 2, prefix: string = ''): string {
  if (value === null || value === undefined) {
    return `${prefix} 0,00`;
  }

  return `${prefix}${value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  })}`;
}


export function stringMaxValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Remove caracteres não numéricos ou vírgula
    const sanitizedValue = control.value?.replace(/[^0-9,]/g, '');
    const value = parseFloat(sanitizedValue?.replace(',', '.'));

    if (!isNaN(value) && value > max) {
      return { max: { requiredMax: max, actual: value } };
    }
    return null;
  };
}

export function stringMinValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Remove caracteres não numéricos ou vírgula
    const sanitizedValue = control.value?.replace(/[^0-9,]/g, '');
    const value = parseFloat(sanitizedValue?.replace(',', '.'));

    if (!isNaN(value) && value < min) {
      return { min: { requiredMin: min, actual: value } };
    }
    return null;
  };
}

export function stringToNumber(value: string | null | undefined): number {
  if (!value) {
    return 0;
  }
  if (typeof value === 'number') {
    return value
  }


  // Remove caracteres não numéricos ou vírgula
  const sanitizedValue = value.replace(/[^0-9,]/g, '');
  const formattedValue = sanitizedValue.replace(',', '.');
  const parsedValue = parseFloat(formattedValue);

  return isNaN(parsedValue) ? 0 : parsedValue;
}
