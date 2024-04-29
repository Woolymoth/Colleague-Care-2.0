import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../tools/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AngularFireAuth, private authService: AuthService, private router: Router) {}

  async login() {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/display']);
      console.log('Logged in successfully!', userCredential.user);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Login error:', error);
      this.email = '';
      this.password = '';
    }
  }
}
