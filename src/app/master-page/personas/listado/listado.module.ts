import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRoutingModule } from './listado-routing.module';
import { PersonasListadoComponent } from './listado.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PersonasModule } from '../personas.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PersonasListadoComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ListadoRoutingModule,
    PersonasModule,
    AngularMaterialModule,
  ],
  exports: [PersonasListadoComponent]
})
export class PersonasListadoModule { }
