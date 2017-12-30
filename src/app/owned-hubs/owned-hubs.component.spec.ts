import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedHubsComponent } from './owned-hubs.component';

describe('OwnedHubsComponent', () => {
  let component: OwnedHubsComponent;
  let fixture: ComponentFixture<OwnedHubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnedHubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedHubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
