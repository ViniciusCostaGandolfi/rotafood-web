import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import {Location} from '@angular/common';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterModule,
    DefaultLayoutComponent,
    MatButtonModule,
    FooterComponent
],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private readonly location: Location) {}

  back() {
    this.location.back();
  }
}
