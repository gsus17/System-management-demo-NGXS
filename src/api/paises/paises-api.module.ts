import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaisesApiService } from './paises-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    PaisesApiService
  ]
})
export class PaisesApiModule { }
