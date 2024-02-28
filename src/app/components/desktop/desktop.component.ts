import { Component } from '@angular/core';
import { Desktop } from '../../models/desktop.model';
import { User } from '../../models/user.model';
import { ProjectsComponent } from '../projects/projects.component';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { BackComponent } from '../../back/back.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    ProjectsComponent,
    DesktopComponent,
    UserComponent,
    HeaderComponent,
    NgFor,
    NgIf,
    BackComponent,
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
addDesktop() {
throw new Error('Method not implemented.');
}
  users: User[];
  desktops: Desktop[];
  owner: string = sessionStorage.getItem('user_name') || '';

  constructor() {
    this.users = JSON.parse(window.localStorage.getItem('users') || '{}');
    this.desktops = JSON.parse(window.localStorage.getItem('desktops') || '{}');
  }

  DoMouseOver() {
    console.log(
      'Has pasado por el titulo  del propietario '
    );
  }
}
