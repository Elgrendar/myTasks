import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  remember: number = 1;
  private readonly URL = `${environment.url}/login.php`;
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {}

  sendCredentials(user: string, password: string): Observable<Login> {
    const body = {
      do: 'login',
      user: user,
      password: password,
    };
    return this.http.post<Login>(this.URL, body).pipe(
      tap((responseOk) => {
        responseOk;
        const { tokenSession,id } = responseOk;
        this.cookie.set('tokenSession', tokenSession, this.remember, '/');
        this.cookie.set('userId', id.toString(), this.remember, '/');
        this.router.navigate(['/', 'desktops']);
      })
    );
  }
}
