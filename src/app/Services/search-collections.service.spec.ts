import { TestBed } from '@angular/core/testing';

import { SearchCollectionsService } from './search-collections.service';

describe('SearchCollectionsService', () => {
  let service: SearchCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
