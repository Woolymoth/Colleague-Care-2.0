import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-display',
  templateUrl: './week-display.component.html',
  styleUrls: ['./week-display.component.css']
})
export class WeekDisplayComponent implements OnInit {
  currentWeek: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.currentWeek = this.getWeekNumber(new Date());
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return weekNumber;
  }
}