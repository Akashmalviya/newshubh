import { TestBed } from '@angular/core/testing';

import { ItemlogService } from './itemlog.service';

describe('ItemlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemlogService = TestBed.get(ItemlogService);
    expect(service).toBeTruthy();
  });
});
