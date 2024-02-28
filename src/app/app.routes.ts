import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TaskComponent } from './components/task/task.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path:'login', component: LoginComponent
    },
    {
        path:'projects', component: ProjectsComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'desktops',
        component:DesktopComponent
    },
    {
        path:'tasks',
        component:TaskComponent
    },
    {
        path:'users',
        component:UserComponent
    },
    {
        path:'',redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'**',
        component:Page404Component
    }
];
