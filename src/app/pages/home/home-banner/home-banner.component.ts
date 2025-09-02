import { Component } from '@angular/core';
import { mockLoginDtoRegister } from '../../../core/mocks/default-routes';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
    standalone: true,
    imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule
    ]
})
export class HomeBannerComponent {
  public mockLoginDtoRegister = mockLoginDtoRegister
}
