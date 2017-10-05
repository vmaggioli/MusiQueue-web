import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { JoinHubComponent } from '../../src/app/join-hub/join-hub.component';

describe('JoinComponent', () => {
  let component: JoinHubComponent;
  let fixture: ComponentFixture<JoinHubComponent>;

  beforeEach(async => {
    TestBed.configureTestingModule({
      declarations: [ JoinHubComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

});
