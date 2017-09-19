import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubUsersComponent } from './hub-users.component';

describe('HubUsersComponent', () => {
  let component: HubUsersComponent;
  let fixture: ComponentFixture<HubUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
