import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsTableComponent } from './enrollments-table.component';

describe('EnrollmentsTableComponent', () => {
  let component: EnrollmentsTableComponent;
  let fixture: ComponentFixture<EnrollmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
