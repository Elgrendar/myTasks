import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,public router: Router) {}

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
      acceptTerms: [false, Validators.requiredTrue],
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
    if(this.form.controls['acceptTerms'].value){
      const usuario=this.form.controls['username'].value;
      const password=this.form.controls['password'].value;
      const users = JSON.parse(window.localStorage.getItem('users') || '{}');
      users.forEach((user: User) => {
        if(password === user['user_pass'] && usuario=== user['user_name']){
          window.localStorage.setItem('token','dkffñklghfñklghfdf');
          this.router.navigateByUrl("/home");
        }
      });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
