import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-routine',
  templateUrl: './home-routine.component.html',
  styleUrl: './home-routine.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeRoutineComponent {

}
