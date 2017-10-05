import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HubUsersComponent } from './hub-users.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HubUsersComponent', () => {
  let component: HubUsersComponent;
  let fixture: ComponentFixture<HubUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubUsersComponent ],
      imports: [
        AngularFireDatabaseModule,
        YoutubePlayerModule,
        RouterTestingModule
      ],
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
