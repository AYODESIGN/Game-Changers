import { TestBed } from '@angular/core/testing';

import { CardLikeService } from './card-like.service';

describe('CardLikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardLikeService = TestBed.get(CardLikeService);
    expect(service).toBeTruthy();
  });
});
