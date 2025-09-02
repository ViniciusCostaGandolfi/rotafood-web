import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShowCatalogOnlineSideNavService } from '../../../core/services/show-catalog-online-side-nav/show-catalog-online-side-nav.service';
import { FullMerchantDto } from '../../../core/interfaces/merchant/full-merchant';
import { ShiftDto } from '../../../core/interfaces/shared/shift';
import { getHasOpened } from '../../../core/helpers/get-has-opened';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-online-header',
  templateUrl: './catalog-online-header.component.html',
  styleUrl: './catalog-online-header.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CatalogOnlineHeaderComponent {

  @Input()
  merchant: FullMerchantDto | undefined = undefined;

  @Input()
  hasOpened = false;

  constructor(
    public sideNavService: ShowCatalogOnlineSideNavService
  ) {}

  toggleSideNav() {
    this.sideNavService.toggleNav();
  }

  getFormattedOpeningHours(shifts: ShiftDto[]) {
    const daysMap = {
      monday: "Segunda",
      tuesday: "Terça",
      wednesday: "Quarta",
      thursday: "Quinta",
      friday: "Sexta",
      saturday: "Sábado",
      sunday: "Domingo"
    } as const;
  
    return shifts
      .map(shift => {
        const days = (Object.keys(daysMap) as Array<keyof typeof daysMap>)
          .filter(day => shift[day])
          .map(day => daysMap[day]);
  
        if (days.length) {
          return {
            days: days.join(", "),
            startTime: shift.startTime,
            endTime: shift.endTime
          };
        }
        return null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }
}
