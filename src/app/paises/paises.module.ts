import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesApiModule } from 'src/api/paises/paises-api.module';

@NgModule({
  declarations: [],
  imports: [
    PaisesApiModule,
    CommonModule
  ],
  providers: []
})
export class PaisesModule { }
