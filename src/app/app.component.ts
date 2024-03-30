import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/shared/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TaskComponent } from './components/task/task.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ProjectsComponent,
    TaskComponent,
    DesktopComponent,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myTasks';
  constructor() {}
}
