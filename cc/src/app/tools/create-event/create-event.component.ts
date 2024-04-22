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
        'date' : this.eventForm.value.date
      });
    }
    resetForm():void{
      this.eventForm.reset({
        'name':'',
        'description':'',
        'date': '',
      })
    }
    submitForm():void{
    alert(this.eventForm.value.name);
    this.saveData();
    this.resetForm();
    }
    
}
