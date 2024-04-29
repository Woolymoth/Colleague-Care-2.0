import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../tools/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  navigateToForm() {
    this.router.navigate(['/form']);
  }

  navigateToLoginOrLogout() {
    if (this.isLoggedIn) {
      this.authService.logout(); // Call logout method from AuthService
    } else {
      this.router.navigate(['/login']);
    }
  }
}
