import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStoreService } from '../../Services/token-store.service';

@Injectable({
  providedIn: 'root'
})
export class DigitCodeService {
  private headers = new HttpHeaders();
  public parentDigitAuthorization: any;
  public Authorization: any;
  public DigitCodeCheckIsData: any;

  constructor(private httpClient: HttpClient, private tokenStoreService: TokenStoreService) {
  }
 
  // چک کردن آیتم ها
  digit_CheckIs = () => {
    this.headers = this.headers.set('Authorization', `Bearer ${this.parentDigitAuthorization}`);
    return this.httpClient.post<any>('/SubSystem/Angular_Tran.aspx'
      , {inMethode_Name: '/api/App_Digitcode_CheckIs'}, {headers: this.headers})
      .pipe(map((response: Response) => {
        return response;
      }));
  }

  // ارسال کد
  Digitcode_Send = (inKind: string) => {
    const json = {kind: inKind, inMethode_Name: '/api/App_Digitcode_Send'};
    this.headers = this.headers.set('Authorization', `Bearer ${this.Authorization}`);
    return this.httpClient.post<any>('/SubSystem/Angular_Tran.aspx'
      , json, {headers: this.headers})
      .pipe(map((response: Response) => {
        return response;
      }));
  }

  // تایید کد
  Digitcode_Verify = (inClientD: string, inServerD: string)  => {
    const json = {clientD: inClientD, serverD: inServerD, inMethode_Name: '/api/App_Digitcode_Verify'};
    this.headers = this.headers.set('Authorization', `Bearer ${this.Authorization}`);
    return this.httpClient.post<any>('/SubSystem/Angular_Tran.aspx'
      , json, {headers: this.headers})
      .pipe(map((response: Response) => {
        return response;
      }));
  }

}
