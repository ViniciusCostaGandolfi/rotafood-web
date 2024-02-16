import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { homePersons } from '../../../core/mocks/persons';

@Component({
  selector: 'app-home-about-us',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './home-about-us.component.html',
  styleUrl: './home-about-us.component.scss'
})
export class HomeAboutUsComponent {

  public homePersons = homePersons

}
