import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes-config';
import { MasterPageModule } from './master-page/master-page.module';
import { LoginModule } from './auth/login/login.module';

@NgModule({
  imports: [
    LoginModule,
    MasterPageModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
