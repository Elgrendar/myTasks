import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TaskComponent } from './components/task/task.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { CanActivate } from './services/auth.guard';

export const routes: Routes = [
    {
        path:'login', component: LoginComponent
    },
    {
        path:'projects', component: ProjectsComponent, canActivate:[CanActivate]
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'desktops',
        component:DesktopComponent, canActivate:[CanActivate]
    },
    {
        path:'tasks',
        component:TaskComponent, canActivate:[CanActivate]
    },
    {
        path:'users',
        component:UserComponent, canActivate:[CanActivate]
    },
    {
        path:'',redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'**',
        component:Page404Component
    }
];
