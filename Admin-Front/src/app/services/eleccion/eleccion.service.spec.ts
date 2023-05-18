/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EleccionService } from './eleccion.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Eleccion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EleccionService,
      HttpClientModule]
    });
  });

  it('should ...', inject([EleccionService], (service: EleccionService) => {
    expect(service).toBeTruthy();
  }));
});
