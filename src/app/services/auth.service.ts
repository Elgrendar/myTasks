import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsAuthenticated() {
    if(sessionStorage.getItem('token')!=null || sessionStorage.getItem('token')!=undefined){
      return true;
    }
    return false;
  }

  constructor() { }
}
