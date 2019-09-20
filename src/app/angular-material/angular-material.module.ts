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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';

const MODULES = [
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
  MatPaginatorModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDividerModule,
  MatMenuModule,
  MatRippleModule,
  CdkTableModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
  MatTooltipModule,
  LayoutModule
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES
})
export class AngularMaterialModule { }
