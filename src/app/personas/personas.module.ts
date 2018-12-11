import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasService } from './personas.service';
import { PersonasApiModule } from 'src/api/personas/personas-api.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonasApiModule
  ],
  providers: [
    PersonasService
  ]
})
export class PersonasModule { }
