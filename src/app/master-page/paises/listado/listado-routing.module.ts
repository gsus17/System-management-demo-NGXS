import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListadoComponent } from './listado.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoRoutingModule { }
