import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsOnlineComponent } from './catalogs-online.component';

describe('CatalogsOnlineComponent', () => {
  let component: CatalogsOnlineComponent;
  let fixture: ComponentFixture<CatalogsOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogsOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogsOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
