import { Component, OnInit} from '@angular/core';
import { collection, collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-events',
  templateUrl: './fetch-events.component.html',
  styleUrl: './fetch-events.component.css'
})
export class FetchEventsComponent implements OnInit {
  events$ = collectionData(collection(this.firestore, 'events')) as Observable<Events[]>;
  constructor(private readonly firestore: Firestore) {}

  ngOnInit(): void {
    
  }

}

export interface Events {
  id: string;
  name: string;
  description: string;
  date:String;
  time:String;
}
