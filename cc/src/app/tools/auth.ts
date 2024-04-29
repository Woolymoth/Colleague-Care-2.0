import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Observable<boolean>; // Observable to track authentication state

  constructor(private auth: AngularFireAuth) {
    this.isLoggedIn = this.auth.authState
      .pipe(map(user => !!user)); // Using pipe and map from RxJS
  }

  async logout() {
    try {
      await this.auth.signOut();
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
