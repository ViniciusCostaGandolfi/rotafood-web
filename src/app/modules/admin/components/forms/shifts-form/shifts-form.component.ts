import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ShiftDto } from '../../../../../core/interfaces/shared/shift';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { timeOptions } from '../../../../../core/mocks/time-options';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-shifts-form',
  templateUrl: './shifts-form.component.html',
  styleUrl: './shifts-form.component.scss'
})
export class ShiftsFormComponent 
  implements OnInit, OnChanges, OnDestroy
  {
  
    timeOptions: string[] = timeOptions;
  
    @Input() shifts: ShiftDto[] | undefined =
      undefined;
  
  
    @Output() valueChange = new EventEmitter<ShiftDto[]>();
  
  
    form!: FormGroup;
  
    private destroy$ = new Subject<void>();
  
  
    ngOnInit(): void {
      this.buildForm();
    }
  
    ngOnChanges(ch: SimpleChanges): void {
      if (ch['initial'] && !ch['initial'].firstChange) {
        this.buildForm();
      }
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
    
    get shiftsArray(): FormArray {
      return this.form.get('shifts') as FormArray;
    }
  
    addShift(): void {
      this.shiftsArray.push(this.createShiftGroup({} as ShiftDto));
      this.emitValue();
    }
  
    removeShift(idx: number): void {
      this.shiftsArray.removeAt(idx);
      this.emitValue();
    }
  
  
    private buildForm(): void {
      this.destroy$.next();
  

      const shifts = this.shifts ?? [];
      const always       = shifts.length === 0;   

  
      this.form = new FormGroup({
        alwaysAvailable: new FormControl(always),
        shifts: new FormArray(shifts.map((s) => this.createShiftGroup(s)))
      });
      
  
      this.form.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.emitValue());
  
      this.emitValue();
    }
  
    private createShiftGroup(shift?: ShiftDto): FormGroup {
      return new FormGroup({
        id: new FormControl(shift?.id),
        startTime: new FormControl(shift?.startTime ?? '', Validators.required),
        endTime: new FormControl(shift?.endTime ?? '', Validators.required),
        monday: new FormControl(shift?.monday ?? false),
        tuesday: new FormControl(shift?.tuesday ?? false),
        wednesday: new FormControl(shift?.wednesday ?? false),
        thursday: new FormControl(shift?.thursday ?? false),
        friday: new FormControl(shift?.friday ?? false),
        saturday: new FormControl(shift?.saturday ?? false),
        sunday: new FormControl(shift?.sunday ?? false)
      });
    }

    onChangeAlwaysAvailable(change: MatCheckboxChange) {

      if (change.checked) {
        this.shiftsArray.clear();      
        this.emitValue(); 
      }

    }
  
    private emitValue(): void {
      this.valueChange.emit(this.shiftsArray.value as ShiftDto[]);
    }
  }