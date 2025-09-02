import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateProductPackaging(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const packagingType = group.get('packagingType')?.value;
      const productPackaging = group.get('packaging');
      if (packagingType === 'PACKAGING' && productPackaging) return { invalidSideBag: true };
      return null;
    };
  }