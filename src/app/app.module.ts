import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app.rootredux';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './common/material/material.module';
import { RouterEffects } from './common/router/redux/router.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthInterceptor} from './core/httpinterceptor/auth.interceptor';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
// import {  NbChatModule } from '@nebular/theme';
  import { ChatsComponent } from './chats/chats.component';
//  import {LayoutModule} from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
      ChatsComponent,
  ],
  // entryComponents:[ChatsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    CoreModule,
    
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MaterialModule,
   
   

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([RouterEffects]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
    // NbChatModule,
   
  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true
     },
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
