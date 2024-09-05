import { Injectable } from '@angular/core';
import * as datesDictionary from '../_data/dictionary.json';
import { Data, DayInfo, MonthDays } from '../interfaces/calendar-model';

@Injectable({
  providedIn: 'root',
})
export class HijriGregorianDatepickerService {
  public calendarData: Data;

  constructor() {
    this.calendarData = datesDictionary['default']; //only in publish
    console.log(this.calendarData);
  }

  parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }
    const parts = dateStr?.split('/');
    if (parts.length !== 3) {
      return null;
    }
    const [day, month, year] = parts.map(Number);
    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1
    ) {
      return null;
    }
    return new Date(year, month - 1, day);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getDayShortHand(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' });
  }

  generateDates(fD: DayInfo, lD: DayInfo, uC: number): MonthDays {
    const startDate = this.parseDate(fD?.gD);
    const endDate = this.parseDate(lD?.gD);
    const daysInMonth: MonthDays = [];
    let currentGregorianDate = new Date(startDate);
    let currentUmmAlQuraDay = parseInt(fD?.uD?.split('/')[0]);
    let currentUmmAlQuraMonth = parseInt(fD?.uD?.split('/')[1]);
    let currentUmmAlQuraYear = parseInt(fD?.uD?.split('/')[2]);
    let daysInCurrentUmmAlQuraMonth = uC;
    while (currentGregorianDate <= endDate) {
      const ummAlQuraDate = `${currentUmmAlQuraDay
        .toString()
        .padStart(2, '0')}/${currentUmmAlQuraMonth
        .toString()
        .padStart(2, '0')}/${currentUmmAlQuraYear}`;
      daysInMonth.push({
        gD: this.formatDate(currentGregorianDate),
        uD: ummAlQuraDate,
        dN: this.getDayShortHand(currentGregorianDate),
        uC: 0, // Placeholder since we are not using it in the output
      });
      // Increment the Gregorian date by one day
      currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
      currentUmmAlQuraDay += 1;
      // Check if we need to increment the Umm al-Qura month and year
      if (currentUmmAlQuraDay > daysInCurrentUmmAlQuraMonth) {
        currentUmmAlQuraDay = 1;
        currentUmmAlQuraMonth += 1;
        if (currentUmmAlQuraMonth > 12) {
          currentUmmAlQuraMonth = 1;
          currentUmmAlQuraYear += 1;
        }
        const nextMonthData =
          this.calendarData[currentUmmAlQuraYear.toString()]?.[
            currentUmmAlQuraMonth.toString()
          ];
        daysInCurrentUmmAlQuraMonth = nextMonthData ? nextMonthData.fD.uC : 30; // Default to 30 if data is missing
      }
    }
    return daysInMonth;
  }

  generateDays(): { [year: string]: { [month: string]: MonthDays } } {
    const result: { [year: string]: { [month: string]: MonthDays } } = {};
    for (const year in this.calendarData) {
      result[year] = {};
      for (const month in this.calendarData[year]) {
        const fD = this.calendarData[year][month].fD;
        const lD = this.calendarData[year][month].lD;
        const uC = this.calendarData[year][month].fD?.uC;
        result[year][month] = this.generateDates(fD, lD, uC);
      }
    }

    return result;
  }

  convertDate(dateStr: string, isGregorian: boolean): DayInfo | null {
    if (isGregorian) {
      const gregorianDate = this.parseDate(dateStr);
      const formattedDate = this.formatDate(gregorianDate);
      for (const yearKey in this.calendarData) {
        for (const monthKey in this.calendarData[yearKey]) {
          const monthData = this.calendarData[yearKey][monthKey];
          const daysInMonth = this.generateDates(
            monthData.fD,
            monthData.lD,
            monthData.fD?.uC
          );
          const dayMatch = daysInMonth.find((d) => d.gD === formattedDate);

          if (dayMatch) {
            return dayMatch;
          }
        }
      }
    } else {
      const [day, month, year] = dateStr?.split('/').map(Number);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
      }
      for (const yearKey in this.calendarData) {
        for (const monthKey in this.calendarData[yearKey]) {
          const monthData = this.calendarData[yearKey][monthKey];
          const daysInMonth = this.generateDates(
            monthData.fD,
            monthData.lD,
            monthData.fD?.uC
          );
          const dayMatch = daysInMonth.find((d) => {
            const [uDay, uMonth, uYear] = d?.uD?.split('/').map(Number);
            return uDay === day && uMonth === month && uYear === year;
          });

          if (dayMatch) {
            return dayMatch;
          }
        }
      }
    }

    return null;
  }
  getMonthData(inputDate: string, type: string): DayInfo[] | null {
    const [day, month, year] = inputDate?.split('/').map(Number);
    let isGregorian: boolean;
    // Determine if the input date is Gregorian or Um Al-Qurra
    if (type == 'greg') {
      // This is likely a Gregorian date
      isGregorian = true;
    } else {
      // This is likely an Um Al-Qurra date
      isGregorian = false;
    }
    if (isGregorian) {
      return this.getGregorianMonthData(day, month, year);
    } else {
      return this.getUmAlQurraMonthData(day, month, year);
    }
  }

  getGregorianMonthData(
    day: number,
    month: number,
    year: number
  ): DayInfo[] | null {
    const yearData = this.calendarData[year];
    if (!yearData) return null;
    const monthData = yearData[month];
    if (!monthData) return null;
    const monthArray: DayInfo[] = [];
    const endDate = new Date(year, month, 0); // Last day of the Gregorian month
    for (let d = 1; d <= endDate.getDate(); d++) {
      const offset = d - 1;

      monthArray.push({
        gD: `${d.toString().padStart(2, '0')}/${month
          .toString()
          .padStart(2, '0')}/${year}`,
        uD: this.calculateUmAlQurraDate(
          monthData.fD.uD,
          offset,
          monthData.fD.uC
        ),
        dN: this.getDayName(new Date(year, month - 1, d).getDay()),
        uC: monthData.fD.uC, // Return the uC (days in Um Al-Qurra month)
      });
    }

    return monthArray;
  }

  getUmAlQurraMonthData(
    day: number,
    month: number,
    year: number
  ): DayInfo[] | null {
    for (const gregorianYear in this.calendarData) {
      const yearData = this.calendarData[parseInt(gregorianYear)];

      for (const monthIndex in yearData) {
        const monthData = yearData[parseInt(monthIndex)];
        const [fDay, fMonth, fYear] = monthData?.fD?.uD?.split('/').map(Number);

        // Check if the input Um Al-Qurra year and month match
        if (fYear === year && fMonth === month) {
          const totalDays = monthData.fD.uC; // Number of days in the Um Al-Qurra month
          const monthArray: DayInfo[] = [];

          // Calculate the difference in days between the first day of the JSON and "01/MM/YYYY"
          const umAlQurraStartDate = `01/${month
            .toString()
            .padStart(2, '0')}/${year}`;
          const jsonUmAlQurraStartDate = monthData.fD.uD;
          const dayDifference = fDay - 1; // The difference between the JSON start date and day 1

          // Use the Gregorian start date from JSON, adjusted by the day difference
          const startGregorianDate = this.calculateGregorianDate(
            monthData.fD.gD,
            -dayDifference
          );

          // Iterate through all days in the Um Al-Qurra month starting from day 1
          for (let i = 0; i < totalDays; i++) {
            const uDate = this.calculateUmAlQurraDate(
              umAlQurraStartDate,
              i,
              totalDays
            );
            const gDate = this.calculateGregorianDate(startGregorianDate, i);

            // Determine the day name for the Gregorian date
            const [gDay, gMonth, gYear] = gDate?.split('/').map(Number);
            const dayName = this.getDayName(
              new Date(gYear, gMonth - 1, gDay).getDay()
            );

            monthArray.push({
              gD: gDate,
              uD: uDate,
              dN: dayName,
              uC: totalDays,
            });
          }

          return monthArray;
        }
      }
    }

    return null;
  }

  calculateGregorianDate(startGDate: string, offset: number): string {
    const [day, month, year] = startGDate?.split('/').map(Number);
    const newDate = new Date(year, month - 1, day + offset);

    return `${newDate.getDate().toString().padStart(2, '0')}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;
  }

  calculateUmAlQurraDate(
    startUDate: string,
    offset: number,
    uC: number
  ): string {
    const [day, month, year] = startUDate?.split('/').map(Number);

    let newDay = day + offset;
    let newMonth = month;
    let newYear = year;

    // Adjust for day overflow based on uC (actual days in the Um Al-Qurra month)
    while (newDay > uC) {
      newDay -= uC;
      newMonth += 1;
    }

    // Adjust for month overflow
    while (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    return `${newDay.toString().padStart(2, '0')}/${newMonth
      .toString()
      .padStart(2, '0')}/${newYear}`;
  }

  /// Return day names
  getDayName(dayIndex: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  }

  /// Check date is it in past or future
  checkPastOrFuture(inputDate, targetDate) {
    if (inputDate) {
      const [day, month, year] = inputDate?.split('/').map(Number);
      const dateToCheck = new Date(year, month - 1, day);
      const today = targetDate;
      today.setHours(0, 0, 0, 0);
      if (dateToCheck > today) {
        return 'Future';
      } else if (dateToCheck < today) {
        return 'Past';
      } else {
        return 'Today';
      }
    }
  }
}
