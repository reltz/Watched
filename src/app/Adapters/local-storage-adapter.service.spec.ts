import { TestBed } from '@angular/core/testing';

import { LocalStorageAdapterService } from './local-storage-adapter.service';

describe('LocalStorageAdapterService', () => {
  let service: LocalStorageAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
