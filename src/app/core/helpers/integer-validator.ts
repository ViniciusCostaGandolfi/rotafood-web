import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || Number.isInteger(value)) {
      return null; // Valor válido
    }
    return { notInteger: true }; // Erro: não é inteiro
  };
};
