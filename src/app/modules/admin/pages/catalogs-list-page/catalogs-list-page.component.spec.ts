import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsListPageComponent } from './catalogs-list-page.component';

describe('CatalogsListPageComponent', () => {
  let component: CatalogsListPageComponent;
  let fixture: ComponentFixture<CatalogsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
