import { Component , ViewChild, inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  @ViewChild("createEventForm") eventForm : any;
  firestore:Firestore = inject(Firestore);

  saveData():void{
    const acollection = collection(this.firestore,'events');
    addDoc(acollection,{
      'name' : this.eventForm.value.name,
      'description' : this.eventForm.value.description,
      'date' : this.eventForm.value.date,
      'time' : this.eventForm.value.time,
      'category' : this.eventForm.value.category, // Save category
    });
  }

  resetForm():void{
    this.eventForm.reset({
      'name':'',
      'description':'',
      'date': '',
      'time': '',
      'category': 'Fika', // Reset to default category
    });
  }

  submitForm():void{
    this.saveData();
    this.resetForm();
  }
}
