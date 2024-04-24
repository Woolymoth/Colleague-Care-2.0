import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-events',
  templateUrl: './fetch-events.component.html',
  styleUrls: ['./fetch-events.component.css']
})
export class FetchEventsComponent implements OnInit {
  events$ = collectionData(collection(this.firestore, 'events')) as Observable<Events[]>;
  sortedEvents: Events[] = [];
  currentPage = 0;
  pageSize = 5;

  constructor(private readonly firestore: Firestore) {}

  ngOnInit(): void {
    this.events$.subscribe(events => {
      this.sortedEvents = this.sortEventsByDate(events);
    });
  }

  sortEventsByDate(events: Events[]): Events[] {
    const currentDate = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.date + ' ' + event.time);
      return eventDate.getTime() > currentDate.getTime();
    }).sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
  }

  toggleDetails(event: Events): void {
    event.expanded = !event.expanded;
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.sortedEvents.length / this.pageSize);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  getDisplayedEvents(): Events[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.sortedEvents.slice(startIndex, startIndex + this.pageSize);
  }
}

export interface Events {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  expanded?: boolean;
}
