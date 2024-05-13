import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.css'
})
export class DisplayPageComponent {
  constructor(private renderer: Renderer2) { }
  ngOnInit() {
    this.renderer.setStyle(document.body, 'background', 'url(../../../assets/images/together.svg) no-repeat center center fixed');
    this.renderer.setStyle(document.body, 'background-size', 'cover');

  }
  
}
