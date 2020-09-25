import { Inject,Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
token:string="";
  constructor(@Inject(LOCAL_STORAGE)  private sessionStorage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.sessionStorage.get("access_token")) {
      request = request.clone({
       
      });

    }
    else{
      request = request.clone({
        setHeaders: {
          access_token : this.sessionStorage.get("access_token") ? this.sessionStorage.get("access_token") :"" ,
          user_id : this.sessionStorage.get("user_id") ? this.sessionStorage.get("user_id").toString():""
      }
      });

    }
    
   
    return next.handle(request);
  }

  ngOnInit() {

  }
}