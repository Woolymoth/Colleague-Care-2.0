import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Observable<boolean>;
  userEmail: Observable<string | null>;  // Observable to track the logged in user's email

  constructor(private auth: AngularFireAuth) {
    this.isLoggedIn = this.auth.authState.pipe(
      map(user => !!user)
    );
    this.userEmail = this.auth.authState.pipe(
      map(user => user ? user.email : null)  // Map to user's email or null if no user
    );
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