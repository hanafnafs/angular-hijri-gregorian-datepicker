[![Build](https://img.shields.io/badge/build-passing-green.svg)](https://www.npmjs.com/package/hijri-greg-calendar)
[![Dependencies](https://img.shields.io/badge/dependencies-uptodate-green.svg)](https://www.npmjs.com/package/hijri-greg-calendar)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://www.npmjs.com/package/hijri-greg-calendar)

<br />

# Angular Hijri Gregorian Calendar(Datepicker)
<br />
<b> Robust</b> and <b>tested</b> code angular hijri/gregorian calendar component for Angular 7 - 12, 14+ projects.<br />
Ionic 3, 4, 5 + is supported, can be used in iOS and Android.<br />

<b> Star it to inspire us to build the best component! </b>

<br />

## Preview 

<p>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/1.png" width="25%" />
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/2.png" width="25%"/>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/3.png" width="25%"/>
  <img src="https://github.com/hanafnafs/angular-hijri-gregorian-datepicker/blob/master/src/assets/imgs/4.png" width="25%"/>
</p>

<br />

## Examples/Demo

Online demo can be found [here](https://hanafnafs.github.io/angular-hijri-gregorian-datepicker/) 

<br />

## Features

* Easy to switch between  **Gregorian** and **Hijri** calendars.
* Ability to specify the default calendar type either **Gregorian** or **Hijri**.
* Converting dates when changing type of calendar.
* Ability to specify min and max value for **Gregorian** and **Hijri**.
* Ability to make it required , readonly or disabled.

<br />

## Supported platforms

<b>Angular</b> 7, 8, 9, 10, 11, 12, 14 +<br />
<b>Ionic</b>3, 4, 5 +<br />
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
  [multiple]="false"
  [mode]="'hijri'"
  [dir]="'rtl'"
  [locale]="'ar'"
  [pastYearsLimit]="20"
  [futureYearsLimit]="10"
  (onSubmit)="onSubmitTest($event)"
  (onChange)="onChangeTest($event)"
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
| <b>`mode`</b> | string | `greg` | Calendar mode, either `hijri` or `greg` |
| <b>`dir`</b> | string | `ltr` | Layout direction, either `ltr` or `rtl` |
| <b>`locale`</b> | string | `en` | The language of the calendar layout, either `ar` or `en` |
| <b>`pastYearsLimit`</b> | number | `90` | indicates for the past years number you want to allow user to select from |
| <b>`futureYearsLimit`</b> | number | `0` | indicates for the future years number you want to allow user to select from |



<br />

## @Outputs()

| Output  | Description        |
|----------|--------------------|
| `onSubmit` | Will be called every time when a user submits a selected date |
| `onChange` | Will be called every time when a user selects new date |
| `onMonthChange` | Will be called every time the month value changes |
| `onYearChange` | Will be called every time the year value changes |


<br />

## Dependencies

Angular hijri gregorian based on `moment-hijri` that supports coversion between Gregorian and Hijri calendars.

<br />

## Contributing

Contributions are more than welcome!

<br />

## License

MIT License

Copyright (c) 2022 Muhammad Hanafi