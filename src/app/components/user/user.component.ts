import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BackComponent } from '../shared/back/back.component';
import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { NewUserComponent } from './new-user/new-user.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    BackComponent,
    NgFor,
    NgIf,
    NgClass,
    NewUserComponent,
    KeyValuePipe,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  private readonly URL = `${environment.url}/users.php`;
  users = new Array<User>();
  hide: boolean = true;
  userEdit: number = 0;
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
    this.http.post<User[]>(this.URL, body).subscribe((resultado: User[]) => {
      this.users = resultado;
    });
  }

  delUser(id: number): void {
    if (confirm(`¿Estás seguro de eliminar este usuario?`)) {
      let body = new HttpParams();
      body = body.append('do', 'delete');
      body = body.append('user', id);
      body = body.append('userId', this.userSessionId);
      body = body.append('token', this.cookieSession);
      this.http
        .post<boolean>(this.URL, body)
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this.router.navigateByUrl('/users');
            window.location.reload();
          }
        });
    }
  }
  editUser(id: number): void {
    this.hide = !this.hide;
    this.userEdit = id;
  }
  addUser(): void {
    this.hide = !this.hide;
  }
}
