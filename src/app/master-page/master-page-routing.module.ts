import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './master-page.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: 'personas',
        loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule)
      },
      {
        path: 'paises',
        loadChildren: () => import('./paises/paises.module').then(m => m.PaisesModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
