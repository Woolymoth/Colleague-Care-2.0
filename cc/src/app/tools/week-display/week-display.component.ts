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
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}