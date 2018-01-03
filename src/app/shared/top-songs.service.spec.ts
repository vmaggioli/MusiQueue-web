import { TestBed, inject } from '@angular/core/testing';

import { TopSongsService } from './top-songs.service';

describe('TopSongsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopSongsService]
    });
  });

  it('should be created', inject([TopSongsService], (service: TopSongsService) => {
    expect(service).toBeTruthy();
  }));
});
