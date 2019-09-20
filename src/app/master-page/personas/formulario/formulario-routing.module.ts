import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasFormularioComponent } from './formulario.component';

const routes: Routes = [
  {
    path: '',
    component: PersonasFormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
