import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceConnectedFormComponent } from './france-connected-form.component';

describe('FranceConnectedFormComponent', () => {
  let component: FranceConnectedFormComponent;
  let fixture: ComponentFixture<FranceConnectedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranceConnectedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranceConnectedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
