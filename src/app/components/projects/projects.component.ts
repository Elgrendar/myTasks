import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BackComponent } from '../shared/back/back.component';
import { environment } from '../../../environments/environment.development';
import { Project } from '../../models/project.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgFor, NgIf } from '@angular/common';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, BackComponent, NgIf, NgFor, NewProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects = new Array<Project>();
  hide: boolean = true;
  projectEdit: number = 0;
  private readonly URL = `${environment.url}/projects.php`;
  cookieSession: string = '';
  userSessionId: string = '';
  desktopActive: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    private cookie: CookieService,
    public body: HttpParams
  ) {
    //Borramos los restos de alguna id de tareas anteriores
    this.cookie.delete("taskActive");
    
    this.cookieSession = this.cookie.get('tokenSession');
    this.userSessionId = this.cookie.get('userId');
    this.desktopActive = this.cookie.get('desktopActive');

    body = body.append('do', 'get');
    body = body.append('token', this.cookieSession);
    body = body.append('userId', this.userSessionId);
    body = body.append('desktopActive', this.desktopActive);
    this.http
      .post<Project[]>(this.URL, body)
      .subscribe((resultado: Project[]) => {
        this.projects = resultado;
      });
  }

  addProject() {
    this.hide = !this.hide;
  }
  delProject(id: number): void {
    if (confirm(`¿Estás seguro de eliminar este proyecto?`)) {
      this.body = this.body.append('do', 'delete');
      this.body = this.body.append('projectId', id);
      this.http
        .post<boolean>(this.URL, this.body)
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this.router.navigateByUrl('/projects');
            window.location.reload();
          }
        });
    }
  }

  editProject(id: number): void {
    this.hide = !this.hide;
    this.projectEdit = id;
  }

  openProject(id: number): void {
    this.cookie.set('projectActive', id.toString());
    this.cookie.delete('taskActive');
    this.router.navigateByUrl('/tasks');
  }
}
