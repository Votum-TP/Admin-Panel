/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VotantesService } from './votantes.service';

describe('Service: Votantes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotantesService]
    });
  });

  it('should ...', inject([VotantesService], (service: VotantesService) => {
    expect(service).toBeTruthy();
  }));
});
