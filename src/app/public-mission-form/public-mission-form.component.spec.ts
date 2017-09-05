import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMissionFormComponent } from './public-mission-form.component';

describe('PublicMissionFormComponent', () => {
  let component: PublicMissionFormComponent;
  let fixture: ComponentFixture<PublicMissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
