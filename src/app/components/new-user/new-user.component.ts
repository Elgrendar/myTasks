import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, public router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const usuario = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    const email = this.form.controls['email'].value;
    if (
      confirmPassword === password &&
      password.length >= 5 &&
      usuario.length >= 5 &&
      usuario != '' &&
      email != ''
    ) {
      const users = JSON.parse(window.localStorage.getItem('users') || '{}');
      users.push(new User(usuario, password, email));
      window.localStorage.removeItem('users');
      window.localStorage.setItem('users', JSON.stringify(users));
      this.router.navigateByUrl('/users');
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
