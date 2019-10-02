import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { MasterPageState } from './store/master-page.state';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    TranslateModule,
    MasterPageRoutingModule,
    NgxsModule.forFeature([MasterPageState]),
  ]
})
export class MasterPageModule { }
