import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { StoreModule } from '@ngrx/store';
import * as MasterPageNgrx from './ngrx/master-page.reducer';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    MasterPageRoutingModule,
    // Se registra el reducer correspondiente a MasterPage.
    StoreModule.forFeature('masterPage', MasterPageNgrx.reducer)
  ]
})
export class MasterPageModule { }
