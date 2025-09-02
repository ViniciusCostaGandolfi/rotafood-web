import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsListPageComponent } from './commands-list-page.component';

describe('CommandsListPageComponent', () => {
  let component: CommandsListPageComponent;
  let fixture: ComponentFixture<CommandsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
