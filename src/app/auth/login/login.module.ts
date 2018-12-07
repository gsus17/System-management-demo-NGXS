import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
