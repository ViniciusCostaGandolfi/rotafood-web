import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import createColormap from 'colormap';
import { Merchant } from '../../../core/interfaces/merchant';
import { Coordinate, Vrp, VrpRoute } from '../../../core/interfaces/vrp';
import { LngLatLike } from 'maplibre-gl';
import { getMidCoordinate } from '../../../core/helpers/get-mid-coordinate';


@Component({
  selector: 'app-map-vrp',
  templateUrl: './map-vrp.component.html',
  styleUrls: ['./map-vrp.component.scss']
})
export class MapVrpComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  public showNav = false;
  public showMap = false
  public center: LngLatLike = { lat: -46.402459, lng: -21.571489 };
  public colormap: string[] = [];
  public merchant: Merchant | null = null;
  public selectedRoute: VrpRoute | null = null;



  @Input() public vrp: Vrp | null = null;

  toggleNav() {
    this.showNav = !this.showNav;
  }

  ngOnInit(): void {
    this.updateMap(this.vrp)
  }

  onRouteButtonClick(route: VrpRoute) {
    if (route) {
      this.selectedRoute = route;
      this.center = getMidCoordinate(this.selectedRoute.routeLine);
    }
  }


  updateMap(vrp: Vrp | null): void {
    this.showMap = false
    if (vrp) {
      setTimeout(() => {
        this.center = {
          lat: vrp.origin.address.latitude,
          lng: vrp.origin.address.longitude
        };
        this.colormap = createColormap<"hex">({
          alpha: 1,
          colormap: "rainbow",
          nshades: vrp.routes.length > 9 ? vrp.routes.length : 9,
          format: "hex",
        });

        this.showMap = true;
      }, 100);
    }
  }
}

