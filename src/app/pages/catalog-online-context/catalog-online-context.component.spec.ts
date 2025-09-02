import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogOnlineContextComponent } from './catalog-online-context.component';

describe('CatalogOnlineContextComponent', () => {
  let component: CatalogOnlineContextComponent;
  let fixture: ComponentFixture<CatalogOnlineContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogOnlineContextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogOnlineContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
