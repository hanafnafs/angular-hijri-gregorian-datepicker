import { Component } from '@angular/core';
import { DayInfo } from 'projects/hijri-gregorian-datepicker/src/interfaces/calendar-model';
// import { Day } from '../assets/fonts/SDB-Regular.ttf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggle: boolean = false;
  selectedDate = {} as DayInfo;
  selectedDates = [] as DayInfo[];
  stylesConfig = {
    backgroundColor: '#E3F6F5',
    primaryColor: '#272343',
    secondaryColor: '#272343',
    todaysDateBgColor: '#272343',
    todaysDateTextColor: 'white',
    confirmBtnTextColor: '#ffffff',
    disabledDayColor: 'silver',
    dayNameColor: '#0d7f91',
    fontFamily: 'Default-Regular',
  } as any;
  mode = 'greg';
  constructor() {}

  onSubmitTest(ev: any) {
    console.log('App component ', ev);
  }

  onChangeTest(eventData: any) {
    console.log('App component ', eventData);
    if (!Array.isArray(eventData)) {
      this.selectedDate = eventData;
    } else {
      this.selectedDates = eventData;
    }
  }

  onMonthChangeTest(ev: any) {
    console.log('Month Changed: ', ev);
  }

  onYearChangeTest(ev: any) {
    console.log('Year Changed ', ev);
  }

  onOpenCalendarClicked() {
    this.toggle = !this.toggle;
  }

  toggleMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
  }
}
