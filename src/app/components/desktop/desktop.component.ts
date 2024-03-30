import { Component } from '@angular/core';
import { Desktop } from '../../models/desktop.model';
import { ProjectsComponent } from '../projects/projects.component';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { BackComponent } from '../shared/back/back.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NewDesktopComponent } from './new-desktop/new-desktop.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    ProjectsComponent,
    DesktopComponent,
    UserComponent,
    NewDesktopComponent,
    HeaderComponent,
    NgFor,
    NgIf,
    BackComponent,
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
  desktops = new Array<Desktop>();
  hide: boolean = true;
  desktopEdit: number = 0;
  private readonly URL = `${environment.url}/desktops.php`;
  cookieSession: string = '';
  userSessionId: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    private cookie: CookieService
  ) {
    this.cookieSession = this.cookie.get('tokenSession');
    this.userSessionId = this.cookie.get('userId');
    let body = new HttpParams();
    body = body.append('do', 'get');
    body = body.append('token', this.cookieSession);
    body = body.append('userId', this.userSessionId);
    this.http
      .post<Desktop[]>(this.URL, body)
      .subscribe((resultado: Desktop[]) => {
        this.desktops = resultado;
      });
  }

  addDesktop() {
    this.hide = !this.hide;
  }

  delDesktop(id: number): void {
    if (confirm(`¿Estás seguro de eliminar este escritorio?`)) {
      let body = new HttpParams();
      body = body.append('do', 'delete');
      body = body.append('user', id);
      body = body.append('userId', this.userSessionId);
      body = body.append('token', this.cookieSession);
      this.http
        .post<boolean>(this.URL, body)
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this.router.navigateByUrl('/desktops');
            window.location.reload();
          }
        });
    }
  }

  editDesktop(id: number): void {
    this.hide = !this.hide;
    this.desktopEdit = id;
  }
}
