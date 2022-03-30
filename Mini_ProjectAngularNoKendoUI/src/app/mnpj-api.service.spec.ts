import { TestBed } from '@angular/core/testing';

import { MnpjApiService } from './mnpj-api.service';

describe('MnpjApiService', () => {
  let service: MnpjApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MnpjApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
