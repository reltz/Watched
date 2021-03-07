import { TestBed } from '@angular/core/testing';

import { FirebaseAdapterService } from './firebase-adapter.service';

describe('FirebaseAdapterService', () => {
  let service: FirebaseAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
