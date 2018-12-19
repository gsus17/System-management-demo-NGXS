import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PaisesModule } from '../paises.module';
import { FormularioComponent } from '../formulario/formulario.component';

@NgModule({
  declarations: [ListadoComponent, FormularioComponent],
  entryComponents: [FormularioComponent],
  imports: [
    CommonModule,
    PaisesModule,
    ListadoRoutingModule,
    AngularMaterialModule
  ]
})
export class ListadoModule { }
