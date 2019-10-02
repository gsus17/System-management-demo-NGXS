import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { PersonasFormularioComponent } from './formulario.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PersonasModule } from '../personas.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BienComponent } from './bien/bien.component';
import { PaisesModule } from 'src/app/master-page/paises/paises.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  declarations: [PersonasFormularioComponent, BienComponent],
  entryComponents: [BienComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormularioRoutingModule,
    AngularMaterialModule,
    PaisesModule,
    PersonasModule,
    NgxsFormPluginModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  exports: [PersonasFormularioComponent]
})
export class PersonasFormularioModule { }
