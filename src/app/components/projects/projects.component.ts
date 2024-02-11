import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BackComponent } from '../../back/back.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, BackComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {}
