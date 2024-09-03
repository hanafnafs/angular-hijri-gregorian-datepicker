import { Component } from '@angular/core';
import { DayInfo } from 'projects/hijri-gregorian-datepicker/src/interfaces/calendar-model';
import { stylesConfig } from 'projects/hijri-gregorian-datepicker/src/interfaces/styles-config-model';
// import { Day } from '../assets/fonts/SDB-Regular.ttf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggle: boolean = false;
  selectedDate: DayInfo;
  stylesConfig: stylesConfig = {
    backgroundColor: '#E3F6F5',
    primaryColor: '#272343',
    secondaryColor: '#272343',
    todaysDateBgColor: '#272343',
    todaysDateTextColor: 'white',
    confirmBtnTextColor: '#ffffff',
    disabledDayColor: 'silver',
    dayNameColor: '#0d7f91',
    fontFamily: 'Default-Regular',
  };
  mode = 'greg';
  constructor() {}

  onSubmit(ev: any) {
    console.log('On Submit ', ev);
  }

  onChange(eventData: any) {
    console.log('On Change ', eventData);
    if (!Array.isArray(eventData)) {
      this.selectedDate = eventData;
    }
  }

  onMonthChangeTest(ev: any) {
    console.log('Month Changed: ', ev);
  }

  onYearChangeTest(ev: any) {
    console.log('Year Changed ', ev);
  }

  toggleMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
  }
}
