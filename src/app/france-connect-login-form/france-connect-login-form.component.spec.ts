import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceConnectLoginFormComponent } from './france-connect-login-form.component';

describe('FranceConnectLoginFormComponent', () => {
  let component: FranceConnectLoginFormComponent;
  let fixture: ComponentFixture<FranceConnectLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranceConnectLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranceConnectLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
