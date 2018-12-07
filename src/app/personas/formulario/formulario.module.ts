import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [FormularioComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    AngularMaterialModule
  ]
})
export class FormularioModule { }
