import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    MasterPageRoutingModule
  ]
})
export class MasterPageModule { }