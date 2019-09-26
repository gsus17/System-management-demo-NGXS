import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesApiModule } from 'src/api/paises/paises-api.module';
import { CountryFormularioComponent } from './formulario/formulario.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaisesRoutingModule } from './paises-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CountryState } from './paises.state';

@NgModule({
  declarations: [CountryFormularioComponent],
  imports: [
    PaisesApiModule,
    TranslateModule,
    AngularMaterialModule,
    PaisesRoutingModule,
    CommonModule,
    NgxsModule.forFeature([CountryState]),
  ],
  exports: [CountryFormularioComponent],
  entryComponents: [CountryFormularioComponent],
  providers: []
})
export class PaisesModule { }
