import { TestBed } from '@angular/core/testing';

import { CardRatingService } from './card-rating.service';

describe('CardRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardRatingService = TestBed.get(CardRatingService);
    expect(service).toBeTruthy();
  });
});
