import { TestBed } from '@angular/core/testing';

import { DemoDerbyClientService } from './demo-derby-client.service';

describe('DemoDerbyClientService', () => {
  let service: DemoDerbyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoDerbyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
