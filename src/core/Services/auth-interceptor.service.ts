import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { TokenStoreService } from './token-store.service';
import { catchError, finalize, tap, timeout } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { isDevMode } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  isHttps = false;
  domainUrl: any;
  httpCount = 0;
  constructor(private tokenStoreService: TokenStoreService
    , private loaderService: LoaderService
    , private generalService: GeneralService
  ) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // توکن
    const accessToken = this.tokenStoreService.get_token_Value('hash1');

    // let hash4 = "";
    // if(sessionStorage.getItem("hash4")) {
    //   hash4 = sessionStorage.getItem("hash4") ;
    // }

    let hash4: string = "";
    const value = sessionStorage.getItem("hash4");
    if (value !== null) {
      hash4 = value;
    }

    this.isHttps = this.generalService.isHttps;
    this.domainUrl = window.location.origin;
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set('Authentication', `Bearer ${accessToken}`).set("mainHafmancode2", hash4)
      });
    }
    if (request.responseType === 'json' && !isDevMode()) {
      request = request.clone({
        headers: request.headers.set('Cache-Control', 'no-cache')
      });
    }
    if (this.isHttps && !isDevMode()) {
      request = request.clone({
        url: request.url.replace('http://', 'https://')
      });
    }
    let url;

    url = this.domainUrl;

    if (request.body && request.body.inMethode_Name !== undefined && request.body.inMethode_Name !== '/api/Core_Menu_Run' && request.body.inMethode_Name !== '/api/Core_Menu_Run1') {
      if (url) {
        request = request.clone({
          url: url + request.body.inMethode_Name
        });
      }
    }
    this.showLoader();
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
        (err: any) => {
          this.onEnd();
        })

    );
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.httpCount++;
    if (this.httpCount === 1) {
    }
  }
  private hideLoader(): void {
    this.httpCount--;
    if (this.httpCount === 0) {
    }
  }
}
