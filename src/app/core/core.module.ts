import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';
import { CommonModule } from '@angular/common';  
import {LoaderService} from './loader/loader.service';
@NgModule({
    declarations: [
     

    ],
    imports: [
        HttpClientModule,
        CommonModule
    ],
    exports: [
    ],
    providers: [
        LoaderService,
        HttpService,
        HttpClient
    ]
})
export class CoreModule { }

