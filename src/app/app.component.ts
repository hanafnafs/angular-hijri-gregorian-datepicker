import { Component } from '@angular/core';
import { Day } from 'projects/hijri-gregorian-datepicker/src/interfaces/day-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggle: boolean = false;
  selectedDate = {} as Day;
  selectedDates = [] as Day[];
  stylesConfig = {
    backgroundColor: '#E3F6F5',
    primaryColor: '#272343',
    secondaryColor: '#272343',
    todaysDateBgColor: '#272343',
    todaysDateTextColor: 'white',
    confirmBtnTextColor: '#ffffff',
    disabledDayColor: 'silver',
  } as any;
  onSubmitTest(ev: any) {
    console.log('App component ', ev);
  }

  onChangeTest(eventData: any) {
    // console.log('App component ', ev);
    console.log('App component ', eventData);
    if (!Array.isArray(eventData)) {
      this.selectedDate = eventData;
    } else {
      this.selectedDates = eventData;
    }
  }

  onMonthChangeTest(ev: any) {
    console.log('App component ', ev);
  }

  onYearChangeTest(ev: any) {
    console.log('App component ', ev);
  }

  onOpenCalendarClicked() {
    this.toggle = !this.toggle;
  }
}
