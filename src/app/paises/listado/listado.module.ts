import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PaisesModule } from '../paises.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListadoComponent],
  imports: [
    CommonModule,
    TranslateModule,
    PaisesModule,
    ListadoRoutingModule,
    AngularMaterialModule
  ]
})
export class ListadoModule { }
