# Angular Hijri Gregorian Calendar(Datepicker)

[![Build](https://img.shields.io/badge/build-passing-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-datepicker)
[![Dependencies](https://img.shields.io/badge/dependencies-uptodate-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-datepicker)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-datepicker)

* Most accurate Hijri, Gregorian caleandar(datepicker) on NPM store with 100% accuracy percentage.
* Robust and tested code angular hijri/gregorian calendar/datepicker component for Angular 10 - 16, 17+ projects.
* Ionic 3 - 4, 5, 6 + is supported, can be used in iOS and Android.
* `Zero` dependents  package.

## Dependents

Angular hijri gregorian with `Zero` dependents that supports coversion between Gregorian and Hijri calendars.

<br />


## Preview 

<p>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/1.png" width="25%"/>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/2.png" width="25%"/>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/3.png" width="25%"/>
</p>

## Background

The Umm al-Qura calendar is the lunar Hijri calendar officially adopted by Saudi Arabia for administrative purposes. It was originated from Umm al-Qura newspaper, the official newspaper of government of Saudi Arabia. The newspaper is published weekly and its first issue was on Friday, 15 Jumada al-Ula 1343 AH (12 December 1924 CE). However, the calendar has been printed and distributed separately by the Saudi government since 1346 AH (1927 CE).

The calendar is widely used in Saudi Arabia, especially by the public sector. Official documents, political letters, health care records, and education certificates, are just examples of many other documents that are dated by the Hijri calendar.

However, the Gregorian calendar is the calendar used in most of the world, and it has been implemented as the default calendar in nearly every computer and database.


## Examples/Demo

Online demo can be found:
 
[Stackblitz](https://stackblitz.com/~/github.com/hanafnafs/angular-hijri-gregorian-datepicker/) 

[Github Pages](https://hanafnafs.github.io/angular-hijri-gregorian-datepicker/) 

<b> Star it to inspire us to build the best component! </b>

<br />

## Features

* Can be used as a calendar or a datepicker.
* **RTL** and **LTR** support
* Easy to switch between  **Gregorian** and **Hijri** calendars.
* Ability to specify the default calendar type either **Gregorian** or **Hijri**.
* Converting dates when changing type of calendar.
* Ability to specify min and max value for **Gregorian** and **Hijri**.
* Ability to make it required or readonly.
* Very easy to customize.
* Can select **Multiple** dates.
* **Event listeners** for all datepicker events.
* Can customize future and past years number.
* **Responsive** desing for web and mobile.

<br />

## Supported platforms

<b>Angular</b> 10 - 16, 17 +<br />
<b>Ionic</b> 3 - 4, 5, 6 +<br />
Mobile browsers and WebViews on: <b>Android</b> and <b>iOS</b><br />
Desktop browsers: <b>Chrome, Firefox, Safari, Edge v.79 +</b><br />
Other browsers:  <b>Edge v.41 - 44</b> (without code hidden feature)

<br />

## Installation

    $ npm install angular-hijri-gregorian-datepicker


<br />

## Usage

Import `HijriGregorianDatepickerModule` in your app module or page module:

```ts
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-datepicker';

@NgModule({
  imports: [
    // ...
    HijriGregorianDatepickerModule
  ]
})
```

```html
<hijri-gregorian-datepicker
    [canChangeMode]="true"
    [todaysDateSection]="true"
    [futureValidation]="true"
    [disableYearPicker]="false"
    [disableMonthPicker]="false"
    [disableDayPicker]="false"
    [multiple]="true"
    [isRequired]="false"
    [showConfirmButton]="true"
    [markToday]="true"
    [mode]="'greg'"
    [dir]="'ltr'"
    [locale]="'en'"
    [submitTextButton]="'Confirm'"
    [todaysDateText]="'Today\'s Date'"
    [ummAlQuraDateText]="'التاريخ الهجرى'"
    [yearSelectLabel]="'Year'"
    [monthSelectLabel]="'Month'"
    [futureValidationMessageEn]="'Selected date cannot be in the future!'"
    [futureValidationMessageAr]="
    'التاريخ المحدد لا يمكن ان يكون في المستقبل!'
    "
    [pastYearsLimit]="90"
    [futureYearsLimit]="0"
    [styles]="stylesConfig"
    (onSubmit)="onSubmit($event)"
    (onDaySelect)="onChange($event)"
    (onMonthChange)="onMonthChangeTest($event)"
    (onYearChange)="onYearChangeTest($event)"
></hijri-gregorian-datepicker>

```

Inside your component.ts:

```ts
  // this called every time when user confirms a selected date
    onSubmitEvent(code: string) {
    }

    // this called only every time the use selects a date
    onChangeEvent(code: string) {
    }

    // this called every time the month value channges
    onMonthChangeEvent(code: string) {
    }

    // this called every time the year value channges
    onYearChangeEvent(code: string) {
    }
```
<br />

## @Inputs()

| Property  | Type   | Default |  Description |
|----------|:-------:|:-----:|----------|
| <b>`canChangeMode`</b> | boolean | `true` | When `true` the user can toggle calendar modes, if `false` the user has only one calendar mode |
| <b>`todaysDateSection`</b> | boolean | `true` | When `true` the section with current today date will be shown, if `false` it will be hidden |
| <b>`futureValidation`</b> | boolean | `true` | When `true` the user cannot choose any future dates, if `false` user can select future dates |
| <b>`disableYearPicker`</b> | boolean | `false` | When `true` the user cannot select different years, if `false` year select will be enabled  |
| <b>`disableMonthPicker`</b> | boolean | `false` | When `true` the user cannot select different months, if `false` month select will be enabled |
| <b>`disableDayPicker`</b> | boolean | `false` | When `true` the user cannot select days, if `false` days select will be enabled | 
| <b>`multiple`</b> | boolean | `false` | When `true` the user can select multiple days, if `false` only one date can be selected | 
| <b>`isRequired`</b> | boolean | `true` | When `true` the confirm button will be disabled until user selects a date, if `false` the button will be enabled | 
| <b>`showConfirmButton`</b> | boolean | `true` | When `true` the confirm button will be displayed, if `false` it will be hidden | 
| <b>`markToday`</b> | boolean | `true` | When `true` today date will be marked(bordered), if `false` it will not be marked |
| <b>`mode`</b> | string | `greg` | Calendar mode, either `ummAlQura` or `greg` |
| <b>`dir`</b> | string | `ltr` | Layout direction, either `ltr` or `rtl` |
| <b>`locale`</b> | string | `en` | The language of the calendar layout, either `ar` or `en` |
| <b>`submitTextButton`</b> | string | `Confirm` | Confirm button text value |
| <b>`todaysDateText`</b> | string | `Todays\'s Date` | Today's date text in `todaysDateSection` |
| <b>`ummAlQuraDateText`</b> | string | `التاريخ الهجرى` | Text next to checkbox to toggle date `todaysDateSection` |
| <b>`yearSelectLabel`</b> | string | `Year` | Label of the year select option  |
| <b>`monthSelectLabel`</b> | string | `Month` | Label of the month select option  |
| <b>`futureValidationMessageEn`</b> | string | `Selected date cannot be in the future!` | English future validation message if `futureValidation` is set to `true`  |
| <b>`futureValidationMessageAr`</b> | string | `التاريخ المحدد لا يمكن ان يكون في المستقبل!` | Arabic future validation message if `futureValidation` is set to `true`  |
| <b>`pastYearsLimit`</b> | number | `90` | indicates for the past years number you want to allow user to select from |
| <b>`futureYearsLimit`</b> | number | `0` | indicates for the future years number you want to allow user to select from |
| <b>`styles`</b> | object | `{}` | Styles for the calendar look and feel |

## Styles

| Property  | Type   | Default |  Description |
|----------|:-------:|:-----:|----------|
| <b>`backgroundColor`</b> | string | `#E3F6F5` | Background of the calendar |
| <b>`primaryColor`</b> | string | `#272343` | Color of the today's date, year and month texts |
| <b>`secondaryColor`</b> | string | `#272343` | Background of submit button and selected days in calendar |
| <b>`todaysDateBgColor`</b> | string | `#272343` | Background of "today's date" date section |
| <b>`todaysDateTextColor`</b> | string | `#fff` | Color of "today's date" date section text |
| <b>`confirmBtnTextColor`</b> | string | `#fff` | Color of "Confirm" button text |
| <b>`disabledDayColor`</b> | string | `#C0C0C0` | Disabled days text color |
| <b>`dayNameColor`</b> | string | `#0d7f91` | Day names text color |
| <b>`dayColor`</b> | string | `#000` | Enabled days text color |
| <b>`fontFamily`</b> | string | `Default-Regular` | Font family of the font used globally and pre defined within project |



<br />

## @Outputs()

| Output  | Description        |
|----------|--------------------|
| `onSubmit` | Will be called every time when a user submits a selected date |
| `onDaySelect` | Will be called every time when a user selects new date |
| `onMonthChange` | Will be called every time the month value changes |
| `onYearChange` | Will be called every time the year value changes |


<br />


## Helper Functions

import { HijriGregorianDatepickerService } from 'angular-hijri-gregorian-datepicker';

```ts
  constructor(private calendarService: HijriGregorianDatepickerService) {

  }

```

| Output  | Description        |
|----------|--------------------|
| <b>`convertDate`</b> | Converts dates from Gregorian to Umm Al Qura and vice versa |
| <b>`checkPastOrFuture`</b> | Checks date whether it's future or past date('Future', 'Past', 'Today') |
| <b>`formatDate`</b> | Converts date from human-readable string representation(ex. Mon Sep 05 2023 15:30:45 GMT+0200) to seperated "/" string(ex. 05/09/2023) |
| <b>`parseDate`</b> | The opposite of `formateDate` function |
| <b>`getGregorianMonthData`</b> | Generates an array of objects of Gregorian month passed to it |
| <b>`getUmAlQurraMonthData`</b> | Generates an array of objects of Umm Al Qura month passed to it |


<br />


## Contributing

Contributions are more than welcome!

<br />

## License

MIT License

Copyright (c) 2022 Muhammad Hanafi