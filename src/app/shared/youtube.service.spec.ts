import { TestBed, inject } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import { HttpModule } from '@angular/http';
import {} from 'jasmine';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [YoutubeService]
    });
  });

  it('should be created', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
