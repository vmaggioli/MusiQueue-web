import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { UserHubViewComponent } from '../../src/app/user-hub-view/user-hub-view.component';

describe('UserHubViewComponent', () => {
  let component: UserHubViewComponent;
  let fixture: ComponentFixture<UserHubViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHubViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
