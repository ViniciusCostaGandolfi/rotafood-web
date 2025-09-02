import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LngLatLike, MapMouseEvent, StyleSpecification } from 'maplibre-gl';
import { CurrentUserService } from '../../../../core/services/current-user/current-user.service';
import { FullMerchantDto } from '../../../../core/interfaces/merchant/full-merchant';
import { LogisticSettingDto } from '../../../../core/interfaces/merchant/merchant-logistic-setting';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';

@Component({
  selector: 'app-logistic-settings-page',
  templateUrl: './logistic-settings-page.component.html',
  styleUrls: ['./logistic-settings-page.component.scss']
})
export class LogisticSettingsPageComponent implements OnInit {
  public merchant?: FullMerchantDto;
  public merchantCenter?: LngLatLike;
  public radiusCenter?: LngLatLike;
  public isLoading = false;
  public selectingCenter = false
  public logisticsForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    minDeliveryFee: new FormControl(5),
    deliveryFeePerKm: new FormControl(1.5),
    maxDeliveryRadiusKm: new FormControl(2.5),
    isFreeDeliveryRadiusEnabled: new FormControl(false),
    freeDeliveryRadiusKm: new FormControl(0),
    latitude: new FormControl<number|null>(0),
    longitude: new FormControl<number|null>(0),

  });

  public radiusOptions = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 15];

  public deliveryRadiusGeoJson: any = null;

  constructor(
    private currentUser: CurrentUserService,
    private merchantservice: MerchantService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser.getCurrentUser() && this.merchantservice.get().subscribe({
      next: response => {
        this.merchant = response;
        this.merchantCenter = {
          lat: response.address.latitude as number,
          lng: response.address.longitude as number
        };
        this.radiusCenter = { 
          lat: response.logisticSetting?.latitude ?? response.address.latitude as number,
          lng: response.logisticSetting?.longitude ?? response.address.longitude as number
         };
        this.patchForm(response.logisticSetting);
        this.updateRadius();
      }
    });
  }

  enableCenterSelection() {
    this.selectingCenter = true;
    this.snackbar.open('Clique no mapa para escolher novo centro do raio', 'OK', { duration: 3000 });
  }

  onMapClick(e: MapMouseEvent) {
    if (!this.selectingCenter) return;
    const [lng, lat] = e.lngLat.toArray();
    this.radiusCenter = { lat, lng };
    this.logisticsForm.patchValue({
      latitude: lat,
      longitude: lng
    })
    this.selectingCenter = false;
    this.updateRadius();

  }

  updateRadius() {
    const radiusKm = this.logisticsForm.get('maxDeliveryRadiusKm')?.value || 5;
    const radiusMeters = radiusKm * 1000;
    this.deliveryRadiusGeoJson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [ this.generateCircle(this.radiusCenter as LngLatLike, radiusMeters) ]
        }
      }]
    };
  }

  generateCircle(center: LngLatLike, radius: number): number[][] {
    const points = 64;
    const coords: number[][] = [];
    const earth = 6371000;
    const lat0 = (center as any).lat * Math.PI / 180;
    const lng0 = (center as any).lng * Math.PI / 180;

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const dx = (radius * Math.cos(angle)) / earth;
      const dy = (radius * Math.sin(angle)) / earth;
      const lat = lat0 + dy;
      const lng = lng0 + dx / Math.cos(lat0);
      coords.push([ (lng * 180) / Math.PI, (lat * 180) / Math.PI ]);
    }
    coords.push(coords[0]);
    return coords;
  }

  private patchForm(setting?: LogisticSettingDto) {
    if (!setting) return;
    this.logisticsForm.patchValue({
      id: setting.id,
      minDeliveryFee: setting.minDeliveryFee,
      deliveryFeePerKm: setting.deliveryFeePerKm,
      maxDeliveryRadiusKm: setting.maxDeliveryRadiusKm,
      isFreeDeliveryRadiusEnabled: setting.freeDeliveryRadiusKm > 0,
      freeDeliveryRadiusKm: setting.freeDeliveryRadiusKm,
      latitude: setting.latitude ?? this.merchant?.address.latitude,
      longitude: setting.longitude ?? this.merchant?.address.longitude,
    });
  }

  saveLogisticsSettings() {
    if (!this.merchant) return;
    this.isLoading = true;
    const dto = {
      ...this.logisticsForm.value,

    } as LogisticSettingDto;
    this.merchantservice.update({ ...this.merchant, logisticSetting: dto })
      .subscribe({
        next: () => {
          this.snackbar.open('Dados atualizados', 'Fechar', { duration: 2000 });
          this.isLoading = false;
        },
        error: err => {
          this.snackbar.open(`Erro: ${err}`, 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }
}