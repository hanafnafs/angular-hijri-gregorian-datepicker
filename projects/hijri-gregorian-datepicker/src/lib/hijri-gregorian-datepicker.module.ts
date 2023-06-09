import { NgModule } from '@angular/core';
import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HijriGregorianDatepickerComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule],
  exports: [HijriGregorianDatepickerComponent],
})
export class HijriGregorianDatepickerModule {}
