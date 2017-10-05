import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { QueueService } from '../../src/app/shared/queue.service';

describe('QueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueueService]
    });
  });

  it('should be created', inject([QueueService], (service: QueueService) => {
    expect(service).toBeTruthy();
  }));
});
