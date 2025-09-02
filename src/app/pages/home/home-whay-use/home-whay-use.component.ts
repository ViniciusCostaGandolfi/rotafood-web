import { Component } from '@angular/core';
import { whayRoutineBeneficts } from '../../../core/mocks/whay-routine-benedicts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-whay-use',
  templateUrl: './home-whay-use.component.html',
  styleUrl: './home-whay-use.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeWhayUseComponent {
  public whayRoutineBeneficts = whayRoutineBeneficts;
}
