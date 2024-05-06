import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, deleteDoc, doc, query, where, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-events',
  templateUrl: './fetch-events.component.html',
  styleUrls: ['./fetch-events.component.css']
})
export class FetchEventsComponent implements OnInit {
  events$ = collectionData(collection(this.firestore, 'events'), { idField: 'id' }) as Observable<Events[]>;
  sortedEvents: Events[] = [];
  currentPage = 0;
  pageSize = 5;

  constructor(private readonly firestore: Firestore) {}

  eventToday: Events | null = null;

  ngOnInit(): void {
    this.events$.subscribe(events => {
      this.sortedEvents = this.sortEventsByDate(events);
      this.updateEventToday();
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

  deleteEvent(event: Events): void {
    if (!event || !event.id) {
      console.error('Invalid event:', event);
      return;
    }
  
    if (confirm('Are you sure you want to delete this event?')) {
      const eventRef = doc(this.firestore, 'events', event.id);
      deleteDoc(eventRef)
        .then(() => {
          console.log('Event deleted successfully.');
          this.updateEventToday(); // Update eventToday after deletion
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    }
  }

  editEvent(event: Events): void {
    // Prompt the user to enter new values for name, description, date, and time
    const newName = prompt('Enter new name:', event.name);
    const newDescription = prompt('Enter new description:', event.description);
    const newDate = prompt('Enter new date (YYYY-MM-DD):', event.date);
    const newTime = prompt('Enter new time (HH:MM):', event.time);
  
    // If the user cancels or enters empty values, do nothing
    if (newName === null || newDescription === null || newDate === null || newTime === null ||
        newName === '' || newDescription === '' || newDate === '' || newTime === '') {
      return;
    }
  
    // Convert the new date string to Date format
    const parsedDate = new Date(newDate);
  
    // Update the event data in Firestore
    const eventRef = doc(this.firestore, 'events', event.id);
    updateDoc(eventRef, {
      name: newName,
      description: newDescription,
      date: parsedDate.toISOString().split('T')[0], // Convert date to ISO string format (YYYY-MM-DD)
      time: newTime
    })
    .then(() => {
      console.log('Event updated successfully.');
      // Optionally, update the local events array if needed
      const updatedEventIndex = this.sortedEvents.findIndex(e => e.id === event.id);
      if (updatedEventIndex !== -1) {
        this.sortedEvents[updatedEventIndex].name = newName;
        this.sortedEvents[updatedEventIndex].description = newDescription;
        this.sortedEvents[updatedEventIndex].date = parsedDate.toISOString().split('T')[0];
        this.sortedEvents[updatedEventIndex].time = newTime;
      }
    })
    .catch(error => {
      console.error('Error updating event:', error);
    });
  }

  updateEventToday(): void {
    const currentDate = new Date();
    this.eventToday = this.sortedEvents.find(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === currentDate.toDateString();
    }) || null;
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
