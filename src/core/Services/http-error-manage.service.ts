import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorManageService {

  constructor(private router: Router
    , private httpClient: HttpClient) {
  }

  private source = interval(3000);

  Http_Control(error: any) {
    window.parent.postMessage({statuse: false, kind: 'loader'}, window.location.href);
    this.router.navigate(['/ReConnect']);
  }

  Http_Ping() {
  }
}
