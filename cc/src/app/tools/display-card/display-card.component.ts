import { Component } from '@angular/core';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent {
  createChoreVisible: boolean = true;
  createEventVisible: boolean = false;

  showCreateChore() {
    this.createChoreVisible = true;
    this.createEventVisible = false;
  }

  showCreateEvent() {
    this.createChoreVisible = false;
    this.createEventVisible = true;
  }
}
