import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasApiModule } from 'src/api/personas/personas-api.module';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasServiceSingleton } from './personas.service';
import { PersonasState } from './store/personas.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonasApiModule,
    PersonasRoutingModule,
    NgxsModule.forFeature([PersonasState]),
  ],
  providers: [
    // Fix singleton service when we working with lazy loading.
    PersonasServiceSingleton
  ]
})
export class PersonasModule { }
