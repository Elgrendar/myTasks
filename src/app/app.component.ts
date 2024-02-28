import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TaskComponent } from './components/task/task.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from './models/user.model';

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
  providers: [LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myTasks';
  private users:Array<User> = [
    {
      userId: 0,
      userName: 'Admin',
      userPassword: 'admin',
      userEmail: 'email@email.com',
      userActive: true,
      userCreation: new Date("22/04/1996"),
      userImage: 'default.svg',
      userRol: 99,
    }
  ];
  constructor() {
    if (window.localStorage.getItem('users') == undefined) {
      window.localStorage.setItem('users', JSON.stringify(this.users));
    } else {
      this.users = JSON.parse(window.localStorage.getItem('users') || '{}');
    }
  }
}
