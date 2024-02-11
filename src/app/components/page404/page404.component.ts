import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BackComponent } from '../../back/back.component';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [HeaderComponent, BackComponent],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css',
})
export class Page404Component {}
