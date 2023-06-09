import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onSubmitTest(ev) {
    console.log('App component ', ev);
  }

  onChangeTest(ev) {
    console.log('App component ', ev);
  }

  onMonthChangeTest(ev) {
    console.log('App component ', ev);
  }

  onYearChangeTest(ev) {
    console.log('App component ', ev);
  }
}
