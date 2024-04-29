import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-display',
  templateUrl: './week-display.component.html',
  styleUrl: './week-display.component.css'
})
export class WeekDisplayComponent implements OnInit {
  currentWeek: number= 0;

  constructor() { }

  ngOnInit(): void {
    this.currentWeek = this.getWeekNumber(new Date());
  }

  getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 3600 * 1000));
    const correctedDay = date.getDay() === 0 ? 7 : date.getDay(); // Adjusting Sunday to 7
    return Math.ceil((correctedDay + numberOfDays) / 7);
}
}