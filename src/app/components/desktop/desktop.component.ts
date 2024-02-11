import { Component } from '@angular/core';
import { Desktop } from '../../models/desktop.model';
import { User } from '../../models/user.model';
import { ProjectsComponent } from '../projects/projects.component';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
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
    BackComponent
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
  public users:Array<User>;
  public desktops:Array<Desktop>;

  constructor(){
    this.users=JSON.parse(window.localStorage.getItem('users')||"{}");
    this.desktops=JSON.parse(window.localStorage.getItem('desktops')||"{}");
  }

  DoMouseOver(desktop: Desktop){
    console.log('Has pasado por el titulo '+desktop.getTitle()+' del propietario ');
  }
}