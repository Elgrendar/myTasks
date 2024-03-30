import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class sessionGuard implements CanActivate {
  private readonly URL = `${environment.url}/login.php`;
  constructor(
    private cookie: CookieService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    try {
      const token: boolean = this.cookie.check('tokenSession');
      const userId: boolean = this.cookie.check('userId');
      if (!token || !userId) {
        this.router.navigate(['/', 'login']);
      }
      if (
        this.verificarToken(
          this.cookie.get('tokenSession'),
          this.cookie.get('userId')
        )
      ) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch (e) {
      console.log('Algo sucedio' + e);
      return false;
    }
  }

  verificarToken(token: string, userId: string) {
    //pendiente de verificar en el login del lado servidor ahora mismo
    //devuelve true si son distintos de null
    if(token!=null && userId != null){
      return true;
    }else{
      return false;
    }
  }
}
