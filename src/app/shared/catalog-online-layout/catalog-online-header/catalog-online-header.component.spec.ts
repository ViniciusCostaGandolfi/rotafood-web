import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogOnlineHeaderComponent } from './catalog-online-header.component';

describe('CatalogOnlineHeaderComponent', () => {
  let component: CatalogOnlineHeaderComponent;
  let fixture: ComponentFixture<CatalogOnlineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogOnlineHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogOnlineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
