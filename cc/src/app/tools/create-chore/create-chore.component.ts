import { Component , ViewChild, inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-create-chore',
  templateUrl: './create-chore.component.html',
  styleUrl: './create-chore.component.css'
})
export class CreateChoreComponent {


  @ViewChild("createChoreForm") choreForm : any;
  firestore:Firestore = inject(Firestore);

    saveData():void{
      const acollection = collection(this.firestore,'chores');
      addDoc(acollection,{
        'chore_name' : this.choreForm.value.chore_name,
        'description' : this.choreForm.value.description,
        'category' : this.choreForm.value.category,
      });
    }
    resetForm():void{
      this.choreForm.reset({
        'chore-name':'',
        'description':'',
        'category': 'Cleaning',
      })
    }
    submitForm():void{
    alert(this.choreForm.value.chore_name);
    this.saveData();
    this.resetForm();
    }
    
}
