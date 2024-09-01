import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { stylesConfig } from '../interfaces/styles-config-model';
import { HijriGregorianDatepickerService } from '../_services/hijri-gregorian-datepicker.service';
import { TodayDate, DayInfo } from '../interfaces/calendar-model';

@Component({
  selector: 'hijri-gregorian-datepicker',
  templateUrl: './hijri-gregorian-datepicker.component.html',
  styleUrls: ['./hijri-gregorian-datepicker.component.scss'],
})
export class HijriGregorianDatepickerComponent implements OnInit {
  //Inputs
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() markToday: boolean = true; // NOT YET
  @Input() canChangeMode: boolean = true;
  @Input() todaysDateSection: boolean = true;
  @Input() futureValidation: boolean = true;
  @Input() disableYearPicker: boolean = false;
  @Input() disableMonthPicker: boolean = false;
  @Input() disableDayPicker: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showConfirmButton: boolean = true;
  @Input() futureValidationMessage: boolean = false;
  @Input() mode: string = 'greg';
  @Input() dir: string = 'ltr';
  @Input() locale: string = 'en';
  @Input() submitTextButton: string = 'Confirm';
  @Input() todaysDateText: string = "Today's Date";
  @Input() ummAlQuraDateText: string = 'Hijri Date';
  @Input() monthSelectLabel: string = 'Month';
  @Input() yearSelectLabel: string = 'Year';
  @Input() minHijri: string; //NOT YET
  @Input() maxHijri: string; //NOT YET
  @Input() minGreg: string; //NOT YET
  @Input() maxGreg: string; //NOT YET
  @Input() pastYearsLimit: number = 90;
  @Input() futureYearsLimit: number = 0;
  @Input() styles: stylesConfig;
  @Input() futureValidationMessageEn: string;
  @Input() futureValidationMessageAr: string;
  //Outputs
  @Output() onSubmit = new EventEmitter<object>();
  @Output() onDaySelect = new EventEmitter<object>();
  @Output() onMonthChange = new EventEmitter<object>();
  @Output() onYearChange = new EventEmitter<object>();

  ummAlQuraMonths = [
    { labelAr: 'محرم', labelEn: 'Muharram', value: 1 },
    { labelAr: 'صفر', labelEn: 'Safar', value: 2 },
    { labelAr: 'ربيع الأول', labelEn: 'Rabi al-Awwal', value: 3 },
    { labelAr: 'ربيع الثاني', labelEn: 'Rabi al-Thani', value: 4 },
    { labelAr: 'جمادى الأولى', labelEn: 'Jumada al-Awwal', value: 5 },
    { labelAr: 'جمادى الآخرة', labelEn: 'Jumada al-Thani', value: 6 },
    { labelAr: 'رجب', labelEn: 'Rajab', value: 7 },
    { labelAr: 'شعبان', labelEn: 'Shaban', value: 8 },
    { labelAr: 'رمضان', labelEn: 'Ramadan', value: 9 },
    { labelAr: 'شوال', labelEn: 'Shawwal', value: 10 },
    { labelAr: 'ذو القعدة', labelEn: 'Dhu al-Qadah', value: 11 },
    { labelAr: 'ذو الحجة', labelEn: 'Dhu al-Hijjah', value: 12 },
  ];
  gregMonths = [
    { labelAr: 'يناير', labelEn: 'January', value: 1 },
    { labelAr: 'فبراير', labelEn: 'February', value: 2 },
    { labelAr: 'مارس', labelEn: 'March', value: 3 },
    { labelAr: 'ابريل', labelEn: 'April', value: 4 },
    { labelAr: 'مايو', labelEn: 'May', value: 5 },
    { labelAr: 'يونيو', labelEn: 'June', value: 6 },
    { labelAr: 'يوليو', labelEn: 'July', value: 7 },
    { labelAr: 'اغسطس', labelEn: 'August', value: 8 },
    { labelAr: 'سبتمبر', labelEn: 'September', value: 9 },
    { labelAr: 'اكتوبر', labelEn: 'October', value: 10 },
    { labelAr: 'نوفمبر', labelEn: 'November', value: 11 },
    { labelAr: 'ديسمبر', labelEn: 'December', value: 12 },
  ];
  ummAlQuraYear: number;
  gregYear: number;
  years = [] as any;
  weeks = [] as any;
  months = [] as any;
  weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaysAr = ['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'اثنين', 'أحد'];
  todaysDate = {} as TodayDate;
  selectedDay;
  periodForm: UntypedFormGroup;
  dateBeforeToggle = {} as any;
  multipleSelectedDates = [] as DayInfo[];
  constructor(
    public formBuilder: UntypedFormBuilder,
    private _dateUtilsService: HijriGregorianDatepickerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTodaysDateInfo();
    this.initializeYearsAndMonths();
  }

  initializeForm() {
    //Initialize form control for month and year select
    this.periodForm = this.formBuilder.group({
      year: [{ value: '', disabled: this.disableYearPicker }, []],
      month: [{ value: '', disabled: this.disableMonthPicker }, []],
    });
  }

  initializeYearsAndMonths() {
    //Initialize years and months for calendar
    if (this.mode == 'greg') {
      this.gregYear =
        this.futureYearsLimit == 0
          ? Number(this.todaysDate.gregorian.split('/')[2])
          : Number(this.todaysDate.gregorian.split('/')[2]) +
            this.futureYearsLimit;
      for (let i = 0; i < this.gregYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.gregYear--;
          this.years.push(val);
        } else {
          break;
        }
      }
      this.months = this.gregMonths;
    } else {
      this.ummAlQuraYear =
        this.futureYearsLimit == 0
          ? Number(this.todaysDate.ummAlQura.split('/')[2])
          : Number(this.todaysDate.ummAlQura.split('/')[2]) +
            this.futureYearsLimit;
      for (let i = 0; i < this.ummAlQuraYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.ummAlQuraYear--;
          this.years.push(val);
        } else {
          break;
        }
      }
      this.months = this.ummAlQuraMonths;
    }
    this.years.map((year: any) => {
      if (
        year ==
        (this.mode == 'greg'
          ? this.todaysDate.gregorian.split('/')[2]
          : this.todaysDate.ummAlQura.split('/')[2])
      ) {
        this.periodForm.controls['year'].setValue(year);
      }
    });
    this.months.map((month: any) => {
      if (
        month.value ==
        (this.mode == 'greg'
          ? this.todaysDate.gregorian.split('/')[1]
          : this.todaysDate.ummAlQura.split('/')[1])
      ) {
        this.periodForm.controls['month'].setValue(month.value);
      }
    });
  }

  parseArabic(arabicNum: any) {
    //Convert arabic numbers to english equivalent
    return arabicNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d: string) {
      return d.charCodeAt(0) - 1632;
    });
  }

  onPeriodChange(type: string) {
    if (type == 'year') {
      this.onYearChange.emit(this.periodForm.controls['year'].value);
    } else {
      this.onMonthChange.emit(this.periodForm.controls['month'].value);
    }

    const days = this._dateUtilsService.getMonthData(
      '01/' +
        this.periodForm.controls['month'].value +
        '/' +
        this.periodForm.controls['year'].value,
      this.mode
    );
    this.weeks = this.generateWeeksArray(days);
  }

  getTodaysDateInfo() {
    this.todaysDate.gregorian = this._dateUtilsService.formatDate(new Date());
    this.todaysDate.ummAlQura = this._dateUtilsService.convertDate(
      this.todaysDate.gregorian,
      true
    ).uD;
    const days = this._dateUtilsService.getMonthData(
      this.todaysDate.gregorian,
      this.mode
    );
    console.log(days, 'days');
    this.weeks = this.generateWeeksArray(days);
  }

  generateWeeksArray(daysArray) {
    console.log('generateWeeksArray', daysArray);
    const firstDayName = daysArray[0]?.dN;
    const startIndex = this.weekdaysEn.indexOf(firstDayName);
    const weeks = [[]];
    let currentWeek = 0;
    let currentDayIndex = startIndex;

    daysArray?.forEach((day) => {
      if (!weeks[currentWeek]) {
        weeks[currentWeek] = [];
      }

      weeks[currentWeek][currentDayIndex] = day;
      currentDayIndex++;

      if (currentDayIndex === 7) {
        currentDayIndex = 0;
        currentWeek++;
      }
    });
    weeks.forEach((week) => {
      while (week.length < 7) {
        week.push({});
      }
    });

    // console.log('Weeks:', weeks);
    return weeks;
  }

  changeCalendarMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
    this.initializeYearsAndMonths();
    const days = this._dateUtilsService.getMonthData(
      '01/' +
        this.periodForm.controls['month'].value +
        '/' +
        this.periodForm.controls['year'].value,
      this.mode
    );
    this.weeks = this.generateWeeksArray(days);
    console.log('this.mode', this.mode);
  }

  onDayClicked(day: DayInfo) {
    if (day.gD) {
      if (this.futureValidation) {
        if (this.checkFutureValidation(day)) {
          this.futureValidationMessage = true;
        } else {
          this.futureValidationMessage = false;
          this.markDaySelected(day);
        }
      } else {
        this.markDaySelected(day);
      }
    }
  }

  markDaySelected(day: DayInfo) {
    if (day.selected) {
      day.selected = false;
    } else {
      this.weeks.forEach((week: any) => {
        week.forEach((day: DayInfo) => {
          day.selected = false;
        });
      });
      day.selected = true;
      this.selectedDay = day;
    }
  }

  onConfirmClicked() {
    //On confirm button clicked
    if (this.multiple) {
      this.onSubmit.emit(this.multipleSelectedDates);
    } else {
      this.onSubmit.emit(this.selectedDay);
    }
  }

  checkFutureValidation(day: DayInfo) {
    if (this._dateUtilsService.isFutureDate(day?.gD) == 'Future') {
      return true;
    }
  }

  checkTodaysDate(day: DayInfo) {
    //Check if passed day is today or not
    return (
      this.todaysDate?.gregorian == day?.gD ||
      this.todaysDate?.ummAlQura == day?.uD
    );
  }

  parseEnglish(hijriDate: string) {
    if (hijriDate) {
      const arabicNumbers =
        '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
      return new String(hijriDate).replace(/[0123456789]/g, (d) => {
        if (arabicNumbers[d] != null) {
          return arabicNumbers[d];
        }
      });
    }
  }

  convertToHijri(date, to?) {
    date = new Date(date);
    let hijri = date
      .toLocaleDateString(`${to}`, {
        timeZone: 'UTC',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })
      .split(' ')[0]
      .split('/');
    let res = hijri[2] + '/' + hijri[0] + '/' + hijri[1];
    return res;
  }
}
