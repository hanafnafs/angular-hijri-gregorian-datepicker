import { Injectable } from '@angular/core';
import { Day } from '../interfaces/calendar';

@Injectable({
  providedIn: 'root'
})
export class HijriGregorianDatepickerService {

  constructor() { }


  generateDates(startDateObj: any, endDateObj: any): { gregorianDate: string, umAlQurraDate: string, dayName: string }[] {
    let startDateStr = startDateObj?.gD;
    let endDateStr = endDateObj?.gD;
    if (startDateStr && endDateStr) {
      const startDate = new Date(this.formatDateForJS(startDateStr));
      const endDate = new Date(this.formatDateForJS(endDateStr));
      const dates: { gregorianDate: string, umAlQurraDate: string, dayName: string }[] = [];
      const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      let currentDate = startDate;
      // Extract day name from start and end date objects
      const startDayName = startDateObj.dN;
      const endDayName = endDateObj.dN;

      // Assuming `umAlQurraDate` format is similar to `gregorianDate` and starts at the same index
      const umAlQurraStart = startDateObj.uD;
      const umAlQurraEnd = endDateObj.uD;

      while (currentDate <= endDate) {
        const formattedDate = this.formatDate(currentDate);
        const dayName = weekdaysEn[currentDate.getDay()];

        // Calculate umAlQurraDate assuming a simple date increment (you need to adjust based on your actual logic)
        // This part depends on how you calculate `umAlQurraDate` from `gregorianDate`. Adjust accordingly.
        const umAlQurraDate = this.calculateUmAlQurraDate(currentDate, umAlQurraStart, umAlQurraEnd);

        dates.push({
          gregorianDate: formattedDate,
          umAlQurraDate: umAlQurraDate,
          dayName: dayName
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    }
  }

  // Dummy method to format dates
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Dummy method to convert string date to Date object
  formatDateForJS(dateStr: string): string {
    // Format the input dateStr (MM/DD/YYYY) to YYYY-MM-DD for JavaScript Date object
    const [day, month, year] = dateStr.split('/').map(Number);
    return `${year}-${month}-${day}`;
  }

  // Dummy method to calculate UmAlQurra date (you need to implement your own logic here)
  calculateUmAlQurraDate(currentDate: Date, umAlQurraStart: string, umAlQurraEnd: string): string {
    // Placeholder implementation
    // You need to convert `currentDate` to the corresponding UmAlQurra date.
    return umAlQurraStart; // Return some value or calculate it accordingly
  }


  // generateDates(startDateObj: any, endDateObj: any): string[] {
  //   let startDateStr = startDateObj?.gD;
  //   let endDateStr = endDateObj?.gD;
  //   if (startDateStr && endDateStr) {
  //     const startDate = new Date(this.formatDateForJS(startDateStr));
  //     const endDate = new Date(this.formatDateForJS(endDateStr));
  //     const dates: any[] = [];
  //     const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  //     let currentDate = startDate;
  //     while (currentDate <= endDate) {
  //       const formattedDate = this.formatDate(currentDate);
  //       dates.push({ gregorianDate: formattedDate });
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }

  //     return dates;
  //   }

  // }

  // private formatDateForJS(dateStr: string): string {
  //   // Convert dd/mm/yyyy to yyyy-mm-dd
  //   const [day, month, year] = dateStr.split('/').map(Number);
  //   return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  // }

  // private formatDate(date: Date): string {
  //   // Format date as dd/mm/yyyy
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
}
