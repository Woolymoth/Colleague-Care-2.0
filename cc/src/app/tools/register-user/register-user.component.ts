import { Component , ViewChild, inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {


  @ViewChild("createUserForm") userForm : any;
  firestore:Firestore = inject(Firestore);

    saveData():void{
      const acollection = collection(this.firestore,'colleagues');
      addDoc(acollection,{
        'first_name' : this.userForm.value.first_name,
        'last_name' : this.userForm.value.last_name,
        'email' : this.userForm.value.email,
        'date_of_birth' : this.userForm.value.date_of_birth
      });
    }
    resetForm():void{
      this.userForm.reset({
        'first_name':'',
        'last_name':'',
        'email': '',
        'date_of_birth': ''
      })
    }
    submitForm():void{
    alert(this.userForm.value.name);
    this.saveData();
    this.resetForm();
    }
    
}
