import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  navigateToDisplay() {
    this.router.navigate(['/display']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  

}
