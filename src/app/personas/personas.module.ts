import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasService } from './personas.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    PersonasService
  ]
})
export class PersonasModule { }
