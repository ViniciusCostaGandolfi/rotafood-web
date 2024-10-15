import { Component, Input, OnInit } from '@angular/core';
import { Coordinate, VrpRoute } from '../../../../core/interfaces/vrp';

@Component({
  selector: 'app-map-vrp-route',
  templateUrl: './map-vrp-route.component.html',
  styleUrl: './map-vrp-route.component.scss'
})
export class MapVrpRouteComponent implements OnInit {
  public geometry: GeoJSON.GeometryObject = {
    type: 'LineString',
    coordinates: [
      [-47.402459, -22.571489],
    ],
  };


  @Input() public route!: VrpRoute;
  @Input() public color!: string;

  public paint: any;

  ngOnInit(): void {
    const coordinates = this.route.routeLine.map((coord: Coordinate) => [coord.lng, coord.lat])
    this.geometry = {
      type: 'LineString',
      coordinates: coordinates,
    };
    this.paint = {
      'line-color': this.color,
      'line-width': 3,
      'line-opacity': 0.5
  }
  
  }

}
