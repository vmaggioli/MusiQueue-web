import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { HubMainComponent } from '../../src/app/hub-main/hub-main.component';

describe('HubMainComponent', () => {
  let component: HubMainComponent;
  let fixture: ComponentFixture<HubMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
