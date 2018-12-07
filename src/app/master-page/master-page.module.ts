import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { MasterPageService } from './master-page.service';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    CommonModule
  ],
  providers: [
    MasterPageService
  ]
})
export class MasterPageModule { }
