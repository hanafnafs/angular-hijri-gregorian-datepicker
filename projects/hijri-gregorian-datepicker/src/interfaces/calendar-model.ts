export interface MonthInfo {
  fD: DayInfo; // First day of the month
  lD: DayInfo; // Last day of the month
}

export interface YearData {
  [month: string]: MonthInfo;
}

export interface Data {
  [year: string]: YearData;
}

export interface DayInfo {
  gD: string; // Gregorian date
  uD: string; // Um al-Qurra date
  dN: string; // Day name shorthand
  uC: number; // Placeholder since we are not using it in the output
  selected?: boolean;
}

export interface TodayDate {
  gregorian?: string;
  ummAlQura?: string;
}

export type MonthDays = DayInfo[];
