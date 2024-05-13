import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  birthday: Date | null = null;
  showRegistrationForm: boolean = false;

  constructor(
    private auth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  async login() {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Logged in successfully!', userCredential.user);
      if (userCredential.user) {
        this.router.navigate(['/display']);
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Login error:', error);
      this.email = '';
      this.password = '';
    }
  }

  async register() {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Registered successfully!', userCredential.user);

      if (userCredential.user) {
        await this.firestore.collection('colleagues').doc(userCredential.user.uid).set({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday
        });
        this.router.navigate(['/display']);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error('Registration error:', error);
      this.email = '';
      this.password = '';
    }
  }

  toggleRegistrationForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.birthday = null;
  }
}
