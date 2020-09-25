import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

/* 
import {
  MatButtonModule, 
  MatCardModule, 
  MatToolbarModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatBottomSheetModule,
  MatTabsModule,
} from '@angular/material' */
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// import {MatTabsModule} from '@angular/material/tabs';

const moduleList = [
  CommonModule,
  MatToolbarModule,
  MatStepperModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatListModule,
  MatInputModule,
  FormsModule,
  MatBottomSheetModule,
  MatTabsModule,
  MatSelectModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatDividerModule,
  MatSnackBarModule,
  MatTooltipModule,
  
]
@NgModule({
  declarations: [],
  imports: moduleList,
exports: moduleList
})
export class MaterialModule { }
