import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError} from "rxjs/internal/operators";
import {map} from "rxjs/internal/operators";
import { throwError } from 'rxjs';
import { finalize  } from 'rxjs/operators';
import { HttpClient,HttpHandler,HttpHeaders } from '@angular/common/http';
import {LoaderService} from '../loader/loader.service';

@Injectable()
export class HttpService extends HttpClient {
    // url="https://aimseduonline.com/api/v1/stats/test/"
   
   
    public static service: HttpService;

    /**
     * Build full URL for request.
     * @param str
     * @returns {string}
     */
    static getFullUrl(str): string {
        //  return AppConstants.WEB_MODULE + str;
       return "https://aimseduonline.com"+str;
      //  return str;   
      
    }

    constructor(handler: HttpHandler,private loaderService: LoaderService ) {
        super(handler);
        HttpService.service = this;
      
    }


    /**
     * @param url
     * @returns {Observable<>}
     */
    gets(url: string,displayLoader = false,loaderType?: string): Observable<any> {
       const fullUrl = HttpService.getFullUrl(url);
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            super.get(fullUrl)
            .pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data) {
                        return data;
                    }
                    return {};
                }) 
            ).subscribe((res:any) => {
                    observer.next(res);
                    observer.complete();
                }, (error: any) => {
                   
                    this.onSubscribeError(error,observer);
                });
        });
        return observable;
    }
    // getList()
    // {
    //  return this.http.get(this.url);
    // }
    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @returns {Observable<>}
     */
    posts(url: string, body: any,postHeaders:HttpHeaders,displayLoader = false,loaderType?: string): Observable<any> {
        const fullUrl = HttpService.getFullUrl(url);
        const observable = new Observable((observer) => {
            let options;
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            if(postHeaders){
                options = {
                    headers: postHeaders
                };
            }
            else{
               options = {
                headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
                };
            }
            super.post(fullUrl, body,options)
            .pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data) {
                        return data;
                    }
                    return {};
                }) 
            ).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                }, (error: any) => {
                   
                    this.onSubscribeError(error,observer);
                });
        });
        return observable;
    }


     /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @returns {Observable<>}
     */

    puts(url: string, body: any,displayLoader = false,loaderType?: string): Observable<any> {
        const fullUrl = HttpService.getFullUrl(url);
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            super.put(fullUrl, body)
            .pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data) {
                        return data;
                    }
                    return {};
                }) 
            ).subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (error: any) => {
                   
                    this.onSubscribeError(error,observer);
                });
        });
        return observable;
    }


    /**
     * Performs a request with `delete` http method.
     * @param url
     * @returns {Observable<>}
     */
    
    deletes(url: string,displayLoader = false,loaderType?: string): Observable<any> {
        const fullUrl = HttpService.getFullUrl(url);
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            super.delete(fullUrl)
            .pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data) {
                        return data;
                    }
                    return {};
                }) 
            ).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                }, (error: any) => {
                    
                    this.onSubscribeError(error,observer);
                });
        });
        return observable;
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any): Observable<any> {
        console.log('error', error);
        return throwError(error);
    }

    private onFinally(loaderType = LoaderService.FULL_LOADER): void {
        this.responseInterceptor(loaderType);
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any,observer): void {
        
        if (error.status === 404) 
            console.log(error);
    else 
            console.log(error);
        observer.complete();
    }

     /**
     * Request interceptor.
     */
    public requestInterceptor(loaderType = LoaderService.FULL_LOADER): void {
        this.loaderService.showLoader(loaderType);
    }

    /**
     * Response interceptor.
     */
    public responseInterceptor(loaderType = LoaderService.FULL_LOADER): void {
        this.loaderService.hideLoader(loaderType);
    }
 
}


