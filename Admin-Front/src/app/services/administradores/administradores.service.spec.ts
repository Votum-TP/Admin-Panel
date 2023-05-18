/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminsService } from './administradores.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Eleccion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminsService,
      HttpClientModule]
    });
  });

  it('should ...', inject([AdminsService], (service: AdminsService) => {
    expect(service).toBeTruthy();
  }));
});
