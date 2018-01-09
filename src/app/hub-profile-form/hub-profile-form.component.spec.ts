import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubProfileFormComponent } from './hub-profile-form.component';

describe('HubProfileFormComponent', () => {
  let component: HubProfileFormComponent;
  let fixture: ComponentFixture<HubProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
