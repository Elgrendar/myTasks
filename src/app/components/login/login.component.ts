import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Login } from '../../models/login.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  errorSession: boolean = false;
  errorMessage: string = '';
  loginForm!: FormGroup;
  login!: Login;
  remember: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  sendLogin(): void {
    this.errorSession = false;
    const { user, password } = this.loginForm.value;
    this.authService.sendCredentials(user, password).subscribe(
      (responseOk) => {
        const{tokenSession} = responseOk;
        if (tokenSession === undefined) {
          this.errorSession = true;
          this.errorMessage = 'Hubo un problema con tu usuario y contraseña';
        }
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }
}
