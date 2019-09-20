import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        loadChildren: () => import('./listado/listado.module').then(m => m.PersonasListadoModule)
      },
      {
        path: 'formulario/:id',
        loadChildren: () => import('./formulario/formulario.module').then(m => m.PersonasFormularioModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
