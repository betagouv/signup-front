import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalitySlotComponent } from './seasonality-slot.component';

describe('SeasonalitySlotComponent', () => {
  let component: SeasonalitySlotComponent;
  let fixture: ComponentFixture<SeasonalitySlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonalitySlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonalitySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
