import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsAuthenticated() {
    if(localStorage.getItem('token')!=null || localStorage.getItem('token')!=undefined){
      return true;
    }
    return false;
  }

  constructor() { }
}
