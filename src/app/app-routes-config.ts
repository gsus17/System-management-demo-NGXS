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
      },
      {
        path: 'personas/add',
        loadChildren: './personas/formulario/formulario.module#FormularioModule',
      },
      {
        path: 'personas/formulario/:id',
        loadChildren: './personas/formulario/formulario.module#FormularioModule',
      },
      {
        path: 'paises/listado',
        loadChildren: './paises/listado/listado.module#ListadoModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
