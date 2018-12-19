import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PaisesApiService } from './paises-api.service';
import { ApiModule } from '../api.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    ApiModule
  ],
  providers: [
    PaisesApiService
  ]
})
export class PaisesApiModule { }
