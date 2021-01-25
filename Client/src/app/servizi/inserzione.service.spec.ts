import { TestBed } from '@angular/core/testing';

import { InserzioneService } from './inserzione.service';

describe('InserzioneService', () => {
  let service: InserzioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InserzioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
