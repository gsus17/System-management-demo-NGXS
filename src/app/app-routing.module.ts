import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Configuracion de rutas de la aplicacion implementando lazy loading.
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'master-page',
    loadChildren: () => import('./master-page/master-page.module').then(m => m.MasterPageModule)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'personas'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
