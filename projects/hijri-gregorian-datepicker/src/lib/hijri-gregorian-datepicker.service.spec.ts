import { TestBed } from '@angular/core/testing';

import { HijriGregorianDatepickerService } from './hijri-gregorian-datepicker.service';

describe('HijriGregorianDatepickerService', () => {
  let service: HijriGregorianDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HijriGregorianDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
