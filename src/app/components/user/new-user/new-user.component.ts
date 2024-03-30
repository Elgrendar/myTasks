import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent implements OnInit {
  UserForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    userRol: new FormControl(''),
    userEmail: new FormControl(''),
    userActive: new FormControl(''),
    userAlias: new FormControl(''),
    //userImage: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  @Input() userId: number = 0;
  user = new Array<User>();
  submitted = false;
  private readonly URL = `${environment.url}/users.php`;
  cookieSession: string = '';
  userSessionId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private cookie: CookieService
  ) {
    this.cookieSession = this.cookie.get('tokenSession');
    this.userSessionId = this.cookie.get('userId');
  }

  ngOnInit(): void {
    //creamos el formulario vacio para nuevo usuario
    if (this.userId === 0) {
      this.UserForm = this.formBuilder.group({
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        userPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        userRol: ['usuario', []],
        userEmail: ['', [Validators.required, Validators.email]],
        userActive: [true, []],
        userAlias: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        //userImage: ['', []],
        acceptTerms: ['', [Validators.requiredTrue]],
      });
    } else {
      //creamos el formulario relleno con los datos del usuario recibido el Id
      let body = new HttpParams();
      body = body.append('do', 'edit');
      body = body.append('user', this.userId);
      body = body.append('token', this.cookieSession);
      body = body.append('userId', this.userSessionId);
      this.http.post<User[]>(this.URL, body).subscribe((resultado: User[]) => {
        this.user = resultado;
        this.UserForm = this.formBuilder.group({
          userName: [
            this.user[0].userName,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20),
            ],
          ],
          userPassword: [
            { value: '', disabled: true },
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(30),
            ],
          ],
          confirmPassword: [
            { value: '', disabled: true },
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(30),
            ],
          ],
          userRol: [this.user[0].userRol, []],
          userEmail: [
            this.user[0].userEmail,
            [Validators.required, Validators.email],
          ],
          userActive: [this.user[0].userActive, []],
          userAlias: [
            this.user[0].userAlias,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(30),
            ],
          ],
          //userImage: ['', []],
          acceptTerms: [true, [Validators.requiredTrue]],
        });
      });
    }
  }

  onSubmit(): void {
    let body = new HttpParams();
    if (this.userId === 0) {
      if (
        this.UserForm.controls['userPassword'].value ===
        this.UserForm.controls['confirmPassword'].value
      ) {
        body = body.append('do', 'create');
      }
    } else {
      body = body.append('do', 'update');
    }
    body = body.append('token', this.cookieSession);
    body = body.append('userId', this.userSessionId);
    body = body.append('user', this.userId);
    body = body.append('userName', this.UserForm.controls['userName'].value);
    body = body.append(
      'userPassword',
      this.UserForm.controls['userPassword'].value
    );
    body = body.append('userEmail', this.UserForm.controls['userEmail'].value);
    body = body.append('userRol', this.UserForm.controls['userRol'].value);
    body = body.append(
      'userActive',
      this.UserForm.controls['userActive'].value
    );
    //body = body.append('userImage', this.UserForm.controls['userImage'].value);
    body = body.append('userImage', '');
    body = body.append(
      'acceptTerms',
      this.UserForm.controls['acceptTerms'].value
    );
    body = body.append('userAlias', this.UserForm.controls['userAlias'].value);

    //Enviamos los datos al servidor.
    this.http.post<boolean>(this.URL, body).subscribe((resultado: boolean) => {
      if (resultado) {
        this.router.navigateByUrl('/users');
        window.location.reload();
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.UserForm.reset();
  }

  //devuelve el control del formulario recibido por parametro.
  get f(): { [key: string]: AbstractControl } {
    return this.UserForm.controls;
  }
}
