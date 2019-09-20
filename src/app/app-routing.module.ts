import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './auth/login/login.module';
import { PersonasModule } from './master-page/personas/personas.module';
import { LoginComponent } from './auth/login/login.component';

// Configuracion de rutas de la aplicacion implementando lazy loading.
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'master-page',
    loadChildren: () => import('./master-page/master-page.module').then(m => m.MasterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    LoginModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
