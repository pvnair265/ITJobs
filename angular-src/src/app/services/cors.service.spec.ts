import { TestBed, inject } from '@angular/core/testing';

import { CorsService } from './cors.service';

describe('CorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorsService]
    });
  });

  it('should ...', inject([CorsService], (service: CorsService) => {
    expect(service).toBeTruthy();
  }));
});
