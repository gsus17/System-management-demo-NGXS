import { Routes } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';
import { LoginComponent } from './auth/login/login.component';

// Configuracion de rutas de la aplicacion implementando lazy loading.
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'master-page',
    component: MasterPageComponent,
    children: [
      {
        path: 'personas/listado',
        loadChildren: () => import('./personas/listado/listado.module').then(m => m.ListadoModule)
      },
      {
        path: 'personas/add',
        loadChildren: () => import('./personas/formulario/formulario.module').then(m => m.FormularioModule),
      },
      {
        path: 'personas/formulario/:id',
        loadChildren: () => import('./personas/formulario/formulario.module').then(m => m.FormularioModule),
      },
      {
        path: 'paises/listado',
        loadChildren: () => import('./paises/listado/listado.module').then(m => m.ListadoModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
