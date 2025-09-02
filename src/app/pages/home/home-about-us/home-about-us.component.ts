import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { homePersons } from '../../../core/mocks/persons';

@Component({
  selector: 'app-home-about-us',
  templateUrl: './home-about-us.component.html',
  styleUrl: './home-about-us.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class HomeAboutUsComponent {

  public homePersons = homePersons

}
