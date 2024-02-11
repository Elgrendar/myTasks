import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BackComponent } from '../../back/back.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [HeaderComponent, BackComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasks = [
    {
      id: 1,
      description: 'Descripción de la tarea 0',
      author: 'Rafa Campanero',
    },
    { id: 2, description: 'Descripción de la tarea 1', author: 'R. Campanero' },
    { id: 3, description: 'Descripción de la tarea 2', author: 'JC' },
    { id: 4, description: 'Descripción de la tarea 3', author: 'Raúl' },
  ];

  ngOnInit() {
    for (let i = 0; i < this.tasks.length; i++) {
      window.localStorage.setItem(
        'Project_' + i,
        JSON.stringify(this.tasks[i])
      );
    }
    for (let i = 0; i < this.tasks.length; i++) {
      console.log(window.localStorage.getItem('Project_' + i));
    }
    //remove un solo item
    window.localStorage.removeItem('Project_1');

    //limpiar todos los items
    window.localStorage.clear();
  }
}
