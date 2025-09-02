// context-modifiers-form.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import {
  CatalogContext,
  catalogContextToString
} from '../../../../../core/enums/catalog-context';
import { Status } from '../../../../../core/enums/status';
import { ContextModifierDto } from '../../../../../core/interfaces/catalog/context-modifier';
import {
  numberToString,
  stringToNumber
} from '../../../../../core/helpers/string-number-parser';

@Component({
  selector: 'app-context-modifiers-form',
  templateUrl: './context-modifiers-form.component.html',
  styleUrl: './context-modifiers-form.component.scss'
})
export class ContextModifiersComponent
  implements OnInit, OnChanges, OnDestroy
{

  @Input() initialModifiers: ContextModifierDto[] | null = null;

  @Output() valueChange = new EventEmitter<ContextModifierDto[]>();


  contextModifiersForm!: FormGroup;

  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialModifiers'] && !changes['initialModifiers'].firstChange) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  getNormalizedValue(): ContextModifierDto[] {
    return this.getContextModifiersFormArray().value.map((c: any) => ({
      ...c,
      status: c.status ? Status.AVAILIABLE : Status.UNAVAILABLE,
      price: {
        ...c.price,
        value: stringToNumber(c.price.value),
        originalValue: stringToNumber(c.price.originalValue)
      }
    }));
  }

  getContextModifiersFormArray(): FormArray {
    return this.contextModifiersForm.get('contextModifiers') as FormArray;
  }

  contextLabel(catalog: CatalogContext) {
    return catalogContextToString[catalog];
  }

  syncPriceBetweenContexts() {
    const formArray = this.getContextModifiersFormArray();
  
    formArray.controls.forEach((control, changedIndex) => {
      const priceControl = control.get('price.value');
  
      priceControl?.valueChanges.subscribe((newValue: string) => {
        if (!newValue) return;
  
        const parsedValue = stringToNumber(newValue);
  
        if (parsedValue === 0) return;
  
        formArray.controls.forEach((otherControl, otherIndex) => {
          if (otherIndex !== changedIndex) {
            const otherPrice = otherControl.get('price.value');
            const otherValue = stringToNumber(otherPrice?.value);
  
            if (otherValue === 0) {
              otherPrice?.setValue(newValue);
            }
          }
        });
      });
    });
  }


  buildForm(): void {
    const mods =
      this.initialModifiers && this.initialModifiers.length
        ? this.initialModifiers
        : this.defaultContextModifiers();

    this.destroy$.next();

    this.contextModifiersForm = new FormGroup({
      contextModifiers: new FormArray(mods.map((m) => this.createFormGroup(m)))
    });

    this.contextModifiersForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.valueChange.emit(this.getNormalizedValue()));

    this.valueChange.emit(this.getNormalizedValue());
  }

  createFormGroup(m?: ContextModifierDto): FormGroup {
    return new FormGroup({
      id: new FormControl(m?.id),
      catalogContext: new FormControl(m?.catalogContext ?? '', Validators.required),
      status: new FormControl(m?.status ?? true, Validators.required),
      price: new FormGroup({
        id: new FormControl(m?.price?.id),
        value: new FormControl(
          numberToString(m?.price?.value, 2, 'R$: '),
          Validators.required
        ),
        originalValue: new FormControl(
          numberToString(m?.price?.originalValue, 2, 'R$: ')
        ),
        hasDiscount: new FormControl<boolean>((m?.price?.originalValue ?? 0) > 0)
      })
    });
  }

  defaultContextModifiers(): ContextModifierDto[] {
    return [
      {
        catalogContext: CatalogContext.TABLE,
        status: Status.AVAILIABLE,
        price: { value: 0, originalValue: 0 }
      },
      {
        catalogContext: CatalogContext.DELIVERY,
        status: Status.AVAILIABLE,
        price: { value: 0, originalValue: 0 }
      },
      {
        catalogContext: CatalogContext.IFOOD,
        status: Status.AVAILIABLE,
        price: { value: 0, originalValue: 0 }
      }
    ];
  }
}
