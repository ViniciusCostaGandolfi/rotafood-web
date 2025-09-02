import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import createColormap from 'colormap';
import { FullMerchantDto } from '../../../core/interfaces/merchant/full-merchant';
import { LngLatLike } from 'maplibre-gl';
import { Vrp, VrpRoute } from '../../../core/interfaces/vrp/vrp';


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
  public merchant: FullMerchantDto | null = null;
  public selectedRoute: VrpRoute | null = null;



  @Input() public vrp!: Vrp;

  toggleNav() {
    this.showNav = !this.showNav;
  }

  ngOnInit(): void {
    this.updateMap()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vrp'] && !changes['vrp'].isFirstChange()) {
      this.updateMap();
    }
  }

  onRouteButtonClick(route: VrpRoute) {
    this.selectedRoute = route;
    this.center = this.selectedRoute.routeLine[Math.ceil(this.selectedRoute.routeLine.length / 2)]
  }

  private updateMap(): void {
    this.showMap = false


    setTimeout(() => {
        if (this.vrp !== undefined) {
          this.center = {
            lat: this.vrp.origin.address.latitude,
            lng: this.vrp.origin.address.longitude
          };
          this.colormap = createColormap<"hex">({
            alpha: 1,
            colormap: "rainbow",
            nshades: this.vrp.routes.length > 9 ? this.vrp.routes.length + 1 : 9,
            format: "hex",
          });

        this.showMap = true;
      }
    }, 100)
  }
}

