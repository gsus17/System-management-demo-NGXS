import { Routes } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginModule'
  },
  {
    path: 'master-page',
    component: MasterPageComponent,
    children: [
      {
        path: 'personas/listado',
        loadChildren: './personas/listado/listado.module#ListadoModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
