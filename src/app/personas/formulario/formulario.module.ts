import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PersonasModule } from '../personas.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BienComponent } from './bien/bien.component';

@NgModule({
  declarations: [FormularioComponent, BienComponent],
  entryComponents: [BienComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    AngularMaterialModule,
    PersonasModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ]
})
export class FormularioModule { }
