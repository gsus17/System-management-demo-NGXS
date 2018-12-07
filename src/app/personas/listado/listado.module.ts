import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [ListadoComponent],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    AngularMaterialModule
  ]
})
export class ListadoModule { }
