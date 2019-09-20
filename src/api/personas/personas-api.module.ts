import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonasApiService } from './personas-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    PersonasApiService
  ]
})
export class PersonasApiModule { }
