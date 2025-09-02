import { Component } from '@angular/core';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    DefaultHeaderComponent,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
