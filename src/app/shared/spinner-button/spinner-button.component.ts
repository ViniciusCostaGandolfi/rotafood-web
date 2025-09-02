import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-button',
  standalone: true,
  imports: [
    MatButton,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './spinner-button.component.html',
  styleUrl: './spinner-button.component.scss'
})
export class SpinnerButtonComponent {
  @Input() isLoading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary'|'accent' = 'primary';
  @Input() class: string = ''; 
  @Input() disabled: boolean = false
  @Output() click = new EventEmitter<Event>();

  handleClick(event: Event) {
    event.stopPropagation();
    this.click.emit(event);
  }


}
