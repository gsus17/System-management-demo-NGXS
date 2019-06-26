import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesApiModule } from 'src/api/paises/paises-api.module';
import { FormularioCountryComponent } from './formulario/formulario.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [FormularioCountryComponent],
  imports: [
    PaisesApiModule,
    AngularMaterialModule,
    CommonModule
  ],
  exports: [FormularioCountryComponent],
  entryComponents: [FormularioCountryComponent],
  providers: []
})
export class PaisesModule { }
