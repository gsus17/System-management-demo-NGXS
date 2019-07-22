import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PersonasModule } from '../personas.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BienComponent } from './bien/bien.component';
import { PaisesModule } from 'src/app/paises/paises.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FormularioComponent, BienComponent],
  entryComponents: [BienComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormularioRoutingModule,
    AngularMaterialModule,
    PaisesModule,
    PersonasModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ]
})
export class FormularioModule { }
