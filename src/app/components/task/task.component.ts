import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BackComponent } from '../../back/back.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgFor,
    NgIf,
    NgClass,
    HeaderComponent,
    BackComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  faPencil = faPencil;
  faPlus = faPlus;
  tasks: Task[]=[];

  constructor(public http: HttpClient) {
    this.http.get<Task[]>('assets/data/tasks.json').subscribe((resultado) => {
      this.tasks = resultado;
      console.log(resultado);
    });
  }
}
