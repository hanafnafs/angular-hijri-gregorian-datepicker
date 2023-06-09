import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';

describe('HijriGregorianDatepickerComponent', () => {
  let component: HijriGregorianDatepickerComponent;
  let fixture: ComponentFixture<HijriGregorianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HijriGregorianDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HijriGregorianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
