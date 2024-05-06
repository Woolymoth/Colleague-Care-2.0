import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  showRegistrationForm: boolean = false;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  async login() {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Logged in successfully!', userCredential.user);
      // Redirect to the desired page after successful login
      this.router.navigate(['/display']);
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
      // Redirect to the desired page after successful registration
      this.router.navigate(['/display']);
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
  }
}