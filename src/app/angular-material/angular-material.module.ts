import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    ScrollDispatchModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    ScrollDispatchModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule { }
