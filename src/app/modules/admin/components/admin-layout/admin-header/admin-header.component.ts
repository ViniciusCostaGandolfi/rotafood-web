import { Component, OnInit } from '@angular/core';

import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { MerchantService } from '../../../../../core/services/merchant/merchant.service';
import { FullMerchantDto } from '../../../../../core/interfaces/merchant/full-merchant';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  merchantOpen: boolean | null = null;
  merchant: FullMerchantDto | null = null;

  constructor(
    public sideNavService: ShowAdminSideNavService,
    public windowWidth: WindowWidthService,
    private merchantService: MerchantService
  ) {}

  ngOnInit() {
    this.merchantService.get().subscribe({
      next: merchant => {
        this.merchant = merchant;
        const last = new Date(merchant.lastOpenedUtc).getTime();
        this.merchantOpen = (Date.now() - last) < 30000;
      },
      error: err => console.error('Erro ao buscar status do merchant:', err)
    });
  }



  toggleSideNav() {
    this.sideNavService.toggleNav();
  }
}
