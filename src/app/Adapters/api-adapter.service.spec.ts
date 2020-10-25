import { TestBed } from '@angular/core/testing';

import { ApiAdapterService } from './api-adapter.service';

describe('ApiAdapterService', () => {
  let service: ApiAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
