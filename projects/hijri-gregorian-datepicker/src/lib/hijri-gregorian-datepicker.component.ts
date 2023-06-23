import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment-hijri';
import * as momentJs from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Day } from '../interfaces/day-model';

@Component({
  selector: 'hijri-gregorian-datepicker',
  templateUrl: './hijri-gregorian-datepicker.component.html',
  styleUrls: ['./hijri-gregorian-datepicker.component.scss'],
})
export class HijriGregorianDatepickerComponent implements OnInit {
  //Inputs
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() selectToday: boolean = true; /// NOT YET
  @Input() canChangeMode: boolean = true;
  @Input() todaysDateSection: boolean = true;
  @Input() futureValidation: boolean = true;
  @Input() disableYearPicker: boolean = false;
  @Input() disableMonthPicker: boolean = false;
  @Input() disableDayPicker: boolean = false;
  @Input() multiple: boolean = false;
  @Input() mode: string = 'greg';
  @Input() dir: string = 'ltr';
  @Input() locale: string = 'en';
  @Input() submitTextButton: string = 'Confirm';
  @Input() todaysDateText: string = "Today's Date";
  @Input() hijriDateText: string = 'Hijri Date';
  @Input() pastYearsLimit: number = 90;
  @Input() futureYearsLimit: number = 0;

  //Outputs
  @Output() onSubmit = new EventEmitter<object>();
  @Output() onDaySelect = new EventEmitter<object>();
  @Output() onMonthChange = new EventEmitter<object>();
  @Output() onYearChange = new EventEmitter<object>();

  hijriMonths = [
    { nameAr: 'محرم', nameEn: 'Muharram', value: 1 },
    { nameAr: 'صفر', nameEn: 'Safar', value: 2 },
    { nameAr: 'ربيع الأول', nameEn: 'Rabi al-Awwal', value: 3 },
    { nameAr: 'ربيع الثاني', nameEn: 'Rabi al-Thani', value: 4 },
    { nameAr: 'جمادى الأولى', nameEn: 'Jumada al-Awwal', value: 5 },
    { nameAr: 'جمادى الآخرة', nameEn: 'Jumada al-Thani', value: 6 },
    { nameAr: 'رجب', nameEn: 'Rajab', value: 7 },
    { nameAr: 'شعبان', nameEn: 'Shaban', value: 8 },
    { nameAr: 'رمضان', nameEn: 'Ramadan', value: 9 },
    { nameAr: 'شوال', nameEn: 'Shawwal', value: 10 },
    { nameAr: 'ذو القعدة', nameEn: 'Dhu al-Qadah', value: 11 },
    { nameAr: 'ذو الحجة', nameEn: 'Dhu al-Hijjah', value: 12 },
  ];
  gregMonths = [
    { nameAr: 'يناير', nameEn: 'January', value: 1 },
    { nameAr: 'فبراير', nameEn: 'February', value: 2 },
    { nameAr: 'مارس', nameEn: 'March', value: 3 },
    { nameAr: 'ابريل', nameEn: 'April', value: 4 },
    { nameAr: 'مايو', nameEn: 'May', value: 5 },
    { nameAr: 'يوليو', nameEn: 'June', value: 6 },
    { nameAr: 'يونيه', nameEn: 'July', value: 7 },
    { nameAr: 'اغسطس', nameEn: 'August', value: 8 },
    { nameAr: 'سبتمبر', nameEn: 'September', value: 9 },
    { nameAr: 'اكتوبر', nameEn: 'October', value: 10 },
    { nameAr: 'نوفمبر', nameEn: 'November', value: 11 },
    { nameAr: 'ديسمبر', nameEn: 'December', value: 12 },
  ];
  toggle: boolean = false;
  hijriYear: number;
  gregYear: number;
  hijriMonth: number;
  gregorianMonth: number;
  years = [] as any;
  days = [] as any;
  months = [] as any;
  weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaysAr = ['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'اثنين', 'أحد'];
  selectedYearAndMonth = { year: {}, month: {} } as any;
  todaysDate = {} as Day;
  selectedDate;
  currentDate;
  currentSysDate = new Date();
  periodForm: FormGroup;
  dateBeforeToggle = {} as any;
  multipleSelectedDates = [] as Day[];
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    momentJs.locale(this.locale);
    this.initalizeForm();
    this.getTodaysDateInfo();
    this.calendarInitialization();
  }

  initalizeForm() {
    //Initialize form control for month and year select
    this.periodForm = this.formBuilder.group({
      years: [{ value: '', disabled: this.disableYearPicker }, []],
      months: [{ value: '', disabled: this.disableMonthPicker }, []],
    });
  }

  calendarInitialization() {
    //Calendar initialization
    this.years = [];
    this.initializeYearsAndMonths();
    let c_year: number, c_month: number, hijriDate, month, day;
    if (this.mode == 'greg') {
      if (this.selectToday) {
        c_year = this.currentSysDate.getFullYear();
        c_month = this.currentSysDate.getMonth() + 1;
      } else {
        c_year = this.dateBeforeToggle['gregorian'].split('/')[0];
        c_month = Number(this.dateBeforeToggle['gregorian'].split('/')[1]);
      }
      this.gregorianMonth = c_month;
      this.days = this.generateDays(c_year, c_month, '0');
    } else {
      if (this.selectToday) {
        c_year = this.parseArabic(moment(this.currentSysDate).format('iYYYY'));
        c_month = this.parseArabic(moment(this.currentSysDate).format('iMM'));
      } else {
        c_year = this.dateBeforeToggle['hijri'].split('/')[0];
        c_month = Number(this.dateBeforeToggle['hijri'].split('/')[1]);
      }
      this.hijriMonth = c_month;
      hijriDate = moment(c_year + '/' + c_month + '/1', 'iYYYY/iM/iD');
      day = hijriDate['_i'].split('-')[2];
      month = this.parseArabic(
        moment(hijriDate)
          .format('iYYYY/iM/iD[is]YYYY/M/D')
          .split('is')[1]
          .split('/')[1]
      );
      this.days = this.generateDays(
        this.selectToday
          ? this.currentSysDate.getFullYear()
          : this.dateBeforeToggle['gregorian'].split('/')[0],
        month,
        0,
        -day
      );
    }
    if (this.dateBeforeToggle) {
      this.onDayClicked(this.dateBeforeToggle, true);
    }
    if (this.multipleSelectedDates.length) {
      console.log(this.multipleSelectedDates);
    }
    this.years.map((year: any) => {
      if (year.value == c_year) {
        this.selectedYearAndMonth['year'] = year;
        this.periodForm.controls['years'].setValue(year);
      }
    });
    this.months.map((month: any) => {
      if (month.value == c_month) {
        this.selectedYearAndMonth['month'] = month;
        this.periodForm.controls['months'].setValue(month);
      }
    });
  }

  initializeYearsAndMonths() {
    //Initialize years and months for calendar
    if (this.mode == 'greg') {
      this.gregYear =
        this.futureYearsLimit == 0
          ? this.currentSysDate.getFullYear()
          : this.currentSysDate.getFullYear() + this.futureYearsLimit;
      for (let i = 0; i < this.gregYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.gregYear--;
          this.years.push({ text: val, value: val });
        } else {
          break;
        }
      }
      this.months = this.gregMonths;
    } else {
      this.hijriYear =
        this.futureYearsLimit == 0
          ? Number(
              this.parseArabic(moment(this.currentSysDate).format('iYYYY'))
            )
          : Number(
              this.parseArabic(moment(this.currentSysDate).format('iYYYY'))
            ) + this.futureYearsLimit;
      for (let i = 0; i < this.hijriYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.hijriYear--;
          this.years.push({ text: val, value: val });
        } else {
          break;
        }
      }
      this.months = this.hijriMonths;
    }
  }

  private getIncrement(year: number, month: number): number {
    //Specify whether year is leap or non leap
    let date = new Date('' + year + '-' + month + '-1');
    let increment = date.getDay() > 0 ? date.getDay() - 2 : 5;
    return increment;
  }

  private getDate(
    week: number,
    dayWeek: number,
    year: number,
    month: any,
    increment: number,
    exactDay?: any
  ) {
    //Get each date
    let date: any;
    let day = week * 7 + dayWeek - increment;
    let fechaAuxiliar;
    if (this.mode == 'greg') {
      exactDay = '1';
    }
    if (day <= 0) {
      fechaAuxiliar = new Date('' + year + '/' + month + '/' + 1);
      date = new Date(
        fechaAuxiliar.getTime() + (day - 1) * 24 * 60 * 60 * 1000
      );
    } else {
      if (this.mode == 'greg') {
        date = new Date('' + year + '/' + month + '/' + day);
        if (isNaN(date.getTime())) {
          fechaAuxiliar = new Date('' + year + '/' + month + '-1');
          date = new Date(
            fechaAuxiliar.getTime() + (day - 1) * 24 * 60 * 60 * 1000
          );
        }
      } else {
        date = new Date(
          '' + year + '/' + month + '/' + (day + parseInt(exactDay))
        );
        if (isNaN(date.getTime())) {
          fechaAuxiliar = new Date('' + year + '/' + month.toString() + '-1');
          date = new Date(
            fechaAuxiliar.getTime() + (day - 1) * 24 * 60 * 60 * 1000
          );
        }
      }
    }
    let hijri = moment(date).format('iYYYY/iMM/iDD');
    return {
      date: date,
      gregorianMonth: date.getMonth() + 1,
      hijriMonth: parseInt(this.parseArabic(hijri?.split('/')[1])),
      hijri: hijri,
      gregorian: moment(date).format('YYYY/MM/DD'),
    };
  }

  private generateDays(year: number, month: number, day?: any, inc?: any) {
    //Generate days function
    momentJs.locale('en');
    const increment = inc ? inc : this.getIncrement(year, month);
    const days = [] as any;
    [0, 1, 2, 3, 4, 5].forEach((x, index) => {
      days.push([]);
      for (let y = 0; y < 7; y++) {
        days[index].push(this.getDate(x, y, year, month, increment, day));
      }
      if (this.mode == 'hijri') {
        days[index] = days[index].filter(
          (day: Day) => day?.hijriMonth == this.hijriMonth
        );
      } else {
        days[index] = days[index].filter(
          (day: Day) => day?.gregorianMonth == this.gregorianMonth
        );
      }
    });
    var englishDate = momentJs(days[0][0].date).format('ddd');
    var monthStartDate = this.weekdaysEn.findIndex(
      (item) => item == englishDate
    );
    days[0] = [...Array(monthStartDate).fill({}), ...days[0]];
    return this.arrangeCalendarDays(days);
  }

  arrangeCalendarDays(days: Day[]) {
    //Arrange days of the month to the table view(HTML)
    let daysContainerArr = [] as Day[];
    for (let i = 0; i <= 4; i++) {
      daysContainerArr = daysContainerArr.concat(days[i]);
      if (this.mode == 'greg') {
        daysContainerArr.sort((a: Day, b: Day) => {
          return parseFloat(a.day) - parseFloat(b.day);
        });
      }
    }
    let subArrays,
      finalArray = [];
    while (daysContainerArr.length > 0) {
      subArrays = daysContainerArr.splice(0, 7);
      finalArray.push(subArrays);
    }
    if (
      finalArray[finalArray.length - 1] &&
      finalArray[finalArray.length - 1].length < 7
    ) {
      finalArray[finalArray.length - 1] = [
        ...finalArray[finalArray.length - 1],
        ...Array(7 - finalArray[finalArray.length - 1].length).fill({}),
      ];
    }
    days = finalArray;
    return days;
  }

  parseArabic(arabicNum: any) {
    //Convert arabic numbers to english equivalent
    return arabicNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d: string) {
      return d.charCodeAt(0) - 1632;
    });
  }

  onPeriodChange(type: string) {
    //Fires each time a user make a change to the year or month select
    if (type == 'year') {
      this.selectedYearAndMonth['year'] =
        this.periodForm.controls['years'].value;
      this.onMonthChange.emit(this.selectedYearAndMonth['year']);
    } else {
      this.selectedYearAndMonth['month'] =
        this.periodForm.controls['months'].value;
      this.gregorianMonth = this.selectedYearAndMonth['month'].value;
      this.onMonthChange.emit(this.selectedYearAndMonth['month']);
    }
    if (this.mode == 'greg') {
      this.days = this.generateDays(
        this.selectedYearAndMonth['year'].value,
        this.selectedYearAndMonth['month'].value
      );
    } else {
      //Get corresponding date in hijri
      let year, month, day, hijriDate;
      hijriDate = moment(
        this.selectedYearAndMonth['year'].value +
          '/' +
          this.selectedYearAndMonth['month'].value +
          '/1',
        'iYYYY/iM/iD'
      );
      day = hijriDate['_i'].split('-')[2];
      year = hijriDate['_i'].split('-')[0];
      this.hijriMonth = this.selectedYearAndMonth['month'].value;
      month = this.parseArabic(
        moment(hijriDate)
          .format('iYYYY/iM/iD[is]YYYY/M/D')
          .split('is')[1]
          .split('/')[1]
      );
      this.days = this.generateDays(year, month, 0, -day);
    }
  }

  getTodaysDateInfo() {
    //Initialize moment locale and get today date info(Hijri and Gregorian)
    momentJs.locale('en');
    if (this.mode == 'hijri') {
      this.toggle = true;
      this.currentDate = moment().format('iYYYY/iM/iD');
    } else {
      this.toggle = false;
      this.currentDate = moment().format('ll');
    }
    this.todaysDate.gregorian = moment().format('YYYY/MM/DD').toString();
    this.todaysDate.hijri = moment().format('iYYYY/iM/iD').toString();
  }

  changeCalendarMode() {
    //toggle => hijri
    //!toggle => gregorian
    this.toggle = !this.toggle;
    momentJs.locale(this.locale);
    if (this.selectedDate) {
      //If there's already selected date before toggle
      this.dateBeforeToggle = this.selectedDate;
      this.multipleSelectedDates = [];
      this.multipleSelectedDates.push(this.dateBeforeToggle);
      this.selectedDate = undefined;
      this.selectToday = false;
    }
    if (this.toggle) {
      this.mode = 'hijri';
      this.currentDate = moment().format('iYYYY/iM/iD');
    } else {
      this.mode = 'greg';
      this.currentDate = moment().format('ll');
    }
    this.calendarInitialization();
  }


  onDayClicked(day: Day, isDateBeforeToggle?: boolean) {
    //Fires when user clicks on a specific date
    if (day.date) {
      for (let i = 0; i < this.days.length; i++) {
        for (let j = 0; j < this.days[i].length; j++) {
          if (!this.multiple) {
            if (this.days[i][j].selected) {
              this.days[i][j].selected = false;
            }
          }
          if (isDateBeforeToggle && day.gregorian == this.days[i][j].gregorian) {
            this.days[i][j].selected = true;
            this.onDaySelect.emit(this.days[i][j].selected);
            if (this.multiple) {
              this.multipleSelectedDates.push(this.days[i][j]);
            }
          }
        }
      }
      if (day.selected) {
        day.selected = false;
        if (this.multiple) {
          this.multipleSelectedDates = this.multipleSelectedDates.filter(
            (selectedDate) => selectedDate.date !== day.date
          );
        }
      } else {
        let temp = day.date;
        if (this.futureValidation) {
          if (moment(temp).isAfter(new Date(), 'day') == false) {
            day.selected = true;
            this.selectedDate = day;
            this.onDaySelect.emit(this.selectedDate);
            if (this.multiple) {
              this.multipleSelectedDates.push(day);
            }
          } else {
            this.selectedDate = undefined;
          }
        } else {
          day.selected = true;
          this.selectedDate = day;
          this.onDaySelect.emit(this.selectedDate);
          if (this.multiple) {
            this.multipleSelectedDates.push(day);
          }
        }
      }
    }
  }

  onConfirmClicked() {
    //On confirm button clicked
    if (this.multiple) {
      this.onSubmit.emit(this.multipleSelectedDates);
    } else {
      this.onSubmit.emit(this.selectedDate);
    }
  }

  checkFutureValidation(day: Day) {
    //Check if the day whether in future or past
    if (moment(day.date).isAfter(new Date(), 'day') == true) {
      return true;
    }
  }
}
