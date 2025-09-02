import { Component, Input } from '@angular/core';
import { AdminRoute } from '../../../../../../core/interfaces/shared/admin-route';
import { WindowWidthService } from '../../../../../../core/services/window-width/window-width.service';
import { ShowAdminSideNavService } from '../../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';


@Component({
  selector: 'app-admin-drawer-list',
  templateUrl: './admin-drawer-list.component.html',
  styleUrl: './admin-drawer-list.component.scss'
})
export class AdminDrawerListComponent {
  @Input() adminRoute!: AdminRoute

  constructor(
    private readonly windowWidth: WindowWidthService,
    private readonly showSideBar: ShowAdminSideNavService
  ) { }

  onClick() {

    this.windowWidth.isMobile().subscribe(isMobile => {
      if (isMobile) {
        this.showSideBar.toggleNav()
      }
    })

  }

}
