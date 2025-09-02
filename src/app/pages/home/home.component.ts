import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeAboutUsComponent } from './home-about-us/home-about-us.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeGoFurtherComponent } from './home-go-further/home-go-further.component';
import { HomePricingComponent } from './home-pricing/home-pricing.component';
import { HomeRoutineComponent } from './home-routine/home-routine.component';
import { HomeWhayUseComponent } from './home-whay-use/home-whay-use.component';
import { DefaultLayoutComponent } from '../../shared/default-layout/default-layout.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
    imports: [
      CommonModule,
      DefaultLayoutComponent,
      HomeAboutUsComponent,
      HomeBannerComponent,
      HomeGoFurtherComponent,
      HomePricingComponent,
      HomeRoutineComponent,
      HomeWhayUseComponent
    ]
})
export class HomeComponent {

}
