import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../common/material/material.module';
import { RegistrationEffects } from './redux/registration.effects';
import { EffectsModule } from '@ngrx/effects';
import { StorageServiceModule } from 'ngx-webstorage-service';
import {CookieService} from 'ngx-cookie-service';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    StorageServiceModule ,
    RegistrationRoutingModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature([RegistrationEffects]),
  ],
  providers:[
    CookieService
  ],
})
export class RegistrationModule { }
