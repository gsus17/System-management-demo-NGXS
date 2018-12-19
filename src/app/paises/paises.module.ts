import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesService } from './paises.service';
import { PaisesApiModule } from 'src/api/paises/paises-api.module';

@NgModule({
  declarations: [],
  imports: [
    PaisesApiModule,
    CommonModule
  ],
  providers: [
    PaisesService
  ]
})
export class PaisesModule { }
