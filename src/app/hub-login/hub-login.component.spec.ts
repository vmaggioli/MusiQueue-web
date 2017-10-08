import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubLoginComponent } from './hub-login.component';

describe('HubLoginComponent', () => {
  let component: HubLoginComponent;
  let fixture: ComponentFixture<HubLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
