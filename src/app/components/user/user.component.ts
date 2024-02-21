import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BackComponent } from '../../back/back.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { NewUserComponent } from '../new-user/new-user.component';

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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users = new Array<User>();
  hide: boolean = true;

  constructor() {
    this.users = JSON.parse(window.localStorage.getItem('users') || '{}');
  }

  delUser(id: number): void {
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    users.forEach((user: User) => {
      if (user.id_user == id) {
        if (confirm('Estas seguro de borrar el usuario ' + user.user_name)) {
          const indice = users.indexOf(user);
          users.splice(indice, 1);
          window.localStorage.removeItem('users');
          window.localStorage.setItem('users', JSON.stringify(users));
          window.location.reload();
          alert('Hemos borrado a ' + user.user_name);
        }
      }
    });
  }
  editUser(id: number): void {
    console.log('Has editado el usuario ' + id);
  }
  addUser(): void {
    this.hide = !this.hide;
  }
}
