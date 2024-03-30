import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { BackComponent } from '../shared/back/back.component';
import { Task } from '../../models/task.model';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

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
  tasks = new Array<Task>();
  url = environment.url + '/tasks.php';
  cookieSession: string = '';
  userSessionId: string = '';

  constructor(public http: HttpClient, private cookie: CookieService) {
    this.cookieSession = this.cookie.get('tokenSession');
    this.userSessionId = this.cookie.get('userId');
    let body = new HttpParams();
    body = body.append('do', 'get');
    body = body.append('token', this.cookieSession);
    body = body.append('userId', this.userSessionId);
    this.http.post<Task[]>(this.url, body).subscribe((resultado: Task[]) => {
      this.tasks = resultado;
    });
  }
}
