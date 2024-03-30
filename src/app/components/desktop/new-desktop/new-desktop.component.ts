import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Desktop } from '../../../models/desktop.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-desktop',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-desktop.component.html',
  styleUrl: './new-desktop.component.css',
})
export class NewDesktopComponent implements OnInit {
  DesktopForm: FormGroup = new FormGroup({
    desktopTitle: new FormControl(''),
    desktopDescription: new FormControl(''),
    desktopColor: new FormControl(''),
  });

  @Input() desktopId: number = 0;
  desktop = new Array<Desktop>();
  submitted = false;
  private readonly URL = `${environment.url}/desktops.php`;
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
    //creamos el formulario vacio para nuevo escritorio
    if (this.desktopId === 0) {
      this.DesktopForm = this.formBuilder.group({
        desktopTitle: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        desktopDescription: ['', [Validators.maxLength(150)]],
        desktopColor: [''],
      });
    } else {
      //creamos el formulario relleno con los datos del escritorio recibido su Id
      let body = new HttpParams();
      body = body.append('do', 'edit');
      body = body.append('desktop', this.desktopId);
      body = body.append('token', this.cookieSession);
      body = body.append('userId', this.userSessionId);
      this.http
        .post<Desktop[]>(this.URL, body)
        .subscribe((resultado: Desktop[]) => {
          this.desktop = resultado;
          this.DesktopForm = this.formBuilder.group({
            desktopTitle: [
              this.desktop[0].desktopTitle,
              [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
              ],
            ],
            desktopDescription: [
              this.desktop[0].desktopDescription,
              [Validators.maxLength(150)],
            ],
            desktopColor: [
              this.desktop[0].desktopColor,
            ],
          });
        });
    }
  }

  onSubmit(): void {
    let body = new HttpParams();
    if (this.desktopId === 0) {
      body = body.append('do', 'create');
    } else {
      body = body.append('do', 'update');
      body = body.append('desktopId', this.desktopId);
    }
    body = body.append('token', this.cookieSession);
    body = body.append('userId', this.userSessionId);
    body = body.append(
      'desktopTitle',
      this.DesktopForm.controls['desktopTitle'].value
    );
    body = body.append(
      'desktopDescription',
      this.DesktopForm.controls['desktopDescription'].value
    );
    body = body.append(
      'desktopColor',
      this.DesktopForm.controls['desktopColor'].value
    );
    this.http.post<boolean>(this.URL, body).subscribe((resultado: boolean) => {
      console.log (resultado);
      if (resultado) {
        this.router.navigateByUrl('/desktops');
        window.location.reload();
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.DesktopForm.reset();
  }

  //devuelve el control del formulario recibido por parametro
  get f(): { [key: string]: AbstractControl } {
    return this.DesktopForm.controls;
  }
}
