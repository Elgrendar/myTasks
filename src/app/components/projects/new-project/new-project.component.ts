import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css',
})
export class NewProjectComponent implements OnInit {
  ProjectForm: FormGroup = new FormGroup({
    projectTitle: new FormControl(''),
    projectDescription: new FormControl(''),
    projectActive: new FormControl(''),
  });

  @Input() desktopId: number = 0;
  @Input() projectId: number = 0;
  projects = new Array<Project>();
  submitted = false;
  private readonly URL = `${environment.url}/projects.php`;
  cookieSession: string = '';
  userSessionId: string = '';
  desktopActive: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    public body: HttpParams,
    private cookie: CookieService
  ) {
    this.cookieSession = this.cookie.get('tokenSession');
    this.userSessionId = this.cookie.get('userId');
    this.desktopActive = this.cookie.get('desktopActive');
  }

  ngOnInit(): void {
    //creamos el formulario vacio para nuevo escritorio
    if (this.projectId === 0) {
      this.ProjectForm = this.formBuilder.group({
        projectTitle: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        projectDescription: ['', [Validators.maxLength(150)]],
        projectActive: [1],
      });
    } else {
      //creamos el formulario relleno con los datos del escritorio recibido su Id
      this.body = this.body.append('do', 'edit');
      this.body = this.body.append('projectId', this.projectId);
      this.body = this.body.append('token', this.cookieSession);
      this.body = this.body.append('userId', this.userSessionId);
      this.body = this.body.append('desktopActive',this.desktopActive);
      this.http
        .post<Project[]>(this.URL, this.body)
        .subscribe((resultado: Project[]) => {
          this.projects = resultado;
          this.ProjectForm = this.formBuilder.group({
            projectTitle: [
              this.projects[0].projectTitle,
              [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
              ],
            ],
            projectDescription: [
              this.projects[0].projectDescription,
              [Validators.maxLength(150)],
            ],
            projectActive: [this.projects[0].projectActive],
          });
        });
    }
  }

  
  onSubmit(): void {
    if (this.desktopId === 0) {
      this.body = this.body.append('do', 'create');
    } else {
      this.body = this.body.append('do', 'update');
      this.body = this.body.append('projectId', this.projectId);
    }
    this.body = this.body.append('token', this.cookieSession);
    this.body = this.body.append('userId', this.userSessionId);
    this.body = this.body.append('desktopActive',this.desktopActive);
    this.body = this.body.append(
      'projectTitle',
      this.ProjectForm.controls['projectTitle'].value
    );
    this.body = this.body.append(
      'projectDescription',
      this.ProjectForm.controls['projectDescription'].value
    );
    this.body = this.body.append(
      'projectActive',
      this.ProjectForm.controls['projectActive'].value
    );

    this.http.post<boolean>(this.URL, this.body).subscribe((resultado: boolean) => {
      console.log(resultado);
      if (resultado) {
        this.router.navigateByUrl('/projects');
        window.location.reload();
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.ProjectForm.reset();
  }

  //devuelve el control del formulario recibido por parametro
  get f(): { [key: string]: AbstractControl } {
    return this.ProjectForm.controls;
  }
}
