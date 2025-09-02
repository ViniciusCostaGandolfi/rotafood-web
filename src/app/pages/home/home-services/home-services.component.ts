import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { rotafoodServices } from '../../../core/mocks/rotafood-services';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrl: './home-services.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeServicesComponent {

  public rotafoodServices = rotafoodServices

}
