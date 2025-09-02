import { Component, Input, OnInit } from '@angular/core';
import { VrpOrigin } from '../../../../core/interfaces/vrp/vrp';

@Component({
  selector: 'app-map-vrp-merchant',
  templateUrl: './map-vrp-merchant.component.html',
  styleUrl: './map-vrp-merchant.component.scss'
})
export class MapVrpMerchantComponent implements OnInit  {
  
  public point:[number, number] = [-46.402459, -21.571489]
  
  @Input() public base!: VrpOrigin; 
  
  ngOnInit(): void {
    this.point = [this.base.address.longitude, this.base.address.latitude]
  }
}
