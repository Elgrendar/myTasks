import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css',
})
export class BackComponent {
  constructor(private location: Location) {}
  back() {
    this.location.back();
  }
}
