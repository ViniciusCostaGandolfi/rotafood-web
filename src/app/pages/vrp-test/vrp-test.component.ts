import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapVrpModule } from '../../modules/map-vrp/map-vrp.module';
import { DefaultLayoutComponent } from '../../shared/default-layout/default-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { VrpTestFormComponent } from './vrp-test-form/vrp-test-form.component';
import { Vrp } from '../../core/interfaces/vrp/vrp';

@Component({
  selector: 'app-vrp-test',
  templateUrl: './vrp-test.component.html',
  styleUrl: './vrp-test.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MapVrpModule,
    DefaultLayoutComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    VrpTestFormComponent
  ]
})
export class VrpTestComponent {
  
  public vrp: Vrp | null = null;

  ngOnInit() {
  }

  handleVrpData(vrpData: Vrp) {
    this.vrp = null
    if (vrpData != null) {
      this.vrp = vrpData
    }
  }
}