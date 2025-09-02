import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Status } from '../../../../core/enums/status';

@Component({
  selector: 'app-status-slide-toggle',
  templateUrl: './status-slide-toggle.component.html',
  styleUrl: './status-slide-toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StatusToggleComponent,
      multi: true,
    },
  ],
})
export class StatusToggleComponent implements ControlValueAccessor {
  @Input()
  value: Status = Status.AVAILIABLE;

  readonly Status = Status;

  private onChange: (value: Status) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Status): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Status) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onToggleChange(event: any): void {
    this.value = event.checked ? Status.AVAILIABLE : Status.UNAVAILABLE;
    this.onChange(this.value);
    this.onTouched();
  }
}