import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EduToolbarComponent } from './edu-toolbar/edu-toolbar.component';
import { EduPageContainerComponent } from './edu-page-container/edu-page-container.component';
import { EduFormCardComponent } from './edu-form-card/edu-form-card.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { EduPageContentComponent } from './edu-page-content/edu-page-content.component';
import { EduRegistrationFormComponent } from './edu-registration-form/edu-registration-form.component';
import { EduLoginFormComponent } from './edu-login-form/edu-login-form.component';
import { AppHeaderComponent} from './edu-header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  RouterModule } from '@angular/router';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { OrderBidRejectedComponent } from './order-bid-rejected/order-bid-rejected.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [EduToolbarComponent, EduPageContainerComponent, EduFormCardComponent, 
    EduPageContentComponent, EduRegistrationFormComponent, EduLoginFormComponent,
    AppHeaderComponent,
    MyDialogComponent,
    DialogsComponent,
    OrderBidRejectedComponent,
    EditComponent],
  imports: [
  
  CommonModule,
  RouterModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[EduToolbarComponent, EduPageContainerComponent, EduFormCardComponent, EduPageContentComponent , 
    EduRegistrationFormComponent , EduLoginFormComponent,AppHeaderComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
})
export class ComponentsModule { }
