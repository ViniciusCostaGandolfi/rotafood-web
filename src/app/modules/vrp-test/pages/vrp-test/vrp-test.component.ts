import { Component } from '@angular/core';
import { Vrp } from '../../../../core/interfaces/vrp';

@Component({
  selector: 'app-vrp-test',
  templateUrl: './vrp-test.component.html',
  styleUrl: './vrp-test.component.scss'
})
export class VrpTestComponent {
  public vrp: Vrp | null = null;
  handleVrpData(vrpData: Vrp) {
    this.vrp = null
    if (vrpData != null) {
      this.vrp = vrpData

      console.log(this.vrp)
    }
  }

  getTotalOrders(): number {
    if (!this.vrp || !this.vrp.routes) {
      return 0;
    }
    
    return this.vrp.routes.reduce((total, route) => total + route.orders.length, 0);

  }
}