import { ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ScrollService } from '../../../core/services/scroll-to/scroll.service';
import { mockLoginDtoRegister, mockDefaultRoutes} from '../../../core/mocks/default-routes';
import { distinctUntilChanged, map } from 'rxjs';
import { ScrollYService } from '../../../core/services/scroll-y/scroll-y.service';



@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [
    
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    CommonModule

  ],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent {

  public mockDefaultRoutes = mockDefaultRoutes

  public mockLoginDtoRegister = mockLoginDtoRegister

  public hasScrolled = false;

  constructor(
    private readonly scrollService: ScrollService,
    public scrollYservice: ScrollYService,
    private cdRef: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.scrollYservice.scrollY$
      .pipe(
        map(scrollY => scrollY > 50),
      )
      .subscribe(scrollPosition => {
        this.hasScrolled = scrollPosition
        this.cdRef.detectChanges()
      });
      
  }
  

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
