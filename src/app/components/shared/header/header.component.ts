import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public router: Router, private cookie: CookieService){

  }
  logout(){
    this.cookie.deleteAll();
    this.router.navigateByUrl("/login");
  }

}
