import { Component } from '@angular/core';
import { rotafoodServices } from '../../../core/mocks/rotafood-services';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-go-further',
  templateUrl: './home-go-further.component.html',
  styleUrl: './home-go-further.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeGoFurtherComponent {

  rotafoodServices = rotafoodServices

}
