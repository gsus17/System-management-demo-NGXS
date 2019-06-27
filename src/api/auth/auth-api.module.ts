import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';
import { ApiModule } from '../api.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpClientModule,
    CommonModule,
    ApiModule
  ],
  providers: [
    AuthApiService
  ]
})
export class AuthApiModule { }
