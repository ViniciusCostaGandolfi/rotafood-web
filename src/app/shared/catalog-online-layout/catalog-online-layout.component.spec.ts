import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogOnlineLayoutComponent } from './catalog-online-layout.component';

describe('CatalogOnlineLayoutComponent', () => {
  let component: CatalogOnlineLayoutComponent;
  let fixture: ComponentFixture<CatalogOnlineLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogOnlineLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogOnlineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
