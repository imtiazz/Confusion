import { TestBed } from '@angular/core/testing';

import { FeaturedLeaderService } from './featured-leader.service';

describe('FeaturedLeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturedLeaderService = TestBed.get(FeaturedLeaderService);
    expect(service).toBeTruthy();
  });
});
