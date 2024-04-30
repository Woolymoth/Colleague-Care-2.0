import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../tools/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AngularFireAuth, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background', 'url(https://mnd-assets.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_1782/a2i7v0esw1hag0nql553) no-repeat center center fixed');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
  }

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
