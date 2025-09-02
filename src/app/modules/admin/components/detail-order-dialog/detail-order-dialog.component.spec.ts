import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderDialogComponent } from './detail-order-dialog.component';

describe('DetailOrderDialogComponent', () => {
  let component: DetailOrderDialogComponent;
  let fixture: ComponentFixture<DetailOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOrderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
