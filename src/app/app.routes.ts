import { Routes } from '@angular/router';

import { ProjectsComponent } from './components/projects/projects.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TaskComponent } from './components/task/task.component';
import { Page404Component } from './components/shared/page404/page404.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { sessionGuard } from './core/guards/session.guard';

export const routes: Routes = [
    {
        path:'login', component: LoginComponent
    },
    {
        path:'projects', component: ProjectsComponent, canActivate:[sessionGuard]
    },
    {
        path:'desktops',
        component:DesktopComponent, canActivate:[sessionGuard]
    },
    {
        path:'tasks',
        component:TaskComponent, canActivate:[sessionGuard]
    },
    {
        path:'users',
        component:UserComponent, canActivate:[sessionGuard]
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
