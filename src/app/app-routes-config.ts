import { Routes } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';

// Configuracion de rutas de la aplicacion implementando lazy loading.
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
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
