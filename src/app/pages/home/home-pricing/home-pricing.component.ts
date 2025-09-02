import { Component } from '@angular/core';
import { rotafoodServices } from '../../../core/mocks/rotafood-services';
import { treeMonthFree } from '../../../core/mocks/thee-month-free';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-pricing',
  templateUrl: './home-pricing.component.html',
  styleUrl: './home-pricing.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomePricingComponent {
    public rotafoodServices = rotafoodServices
    public treeMonthFree = treeMonthFree
}
