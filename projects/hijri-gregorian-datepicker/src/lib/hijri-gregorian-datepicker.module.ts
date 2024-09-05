import { NgModule } from '@angular/core';
import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HijriGregorianDatepickerComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [HijriGregorianDatepickerComponent],
})
export class HijriGregorianDatepickerModule {}
