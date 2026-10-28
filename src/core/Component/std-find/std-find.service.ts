import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TokenStoreService} from '../../Services/token-store.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StdFindService {
  private headers = new HttpHeaders();
  Authorization: any;
  idStu2: any;
  constructor(private httpClient: HttpClient
    , private tokenStoreService: TokenStoreService) {
  }
  // جستجو
  StdFindList1(JsonSerach: any) {
    JsonSerach.inMethode_Name = '/api/Education_Stu_Find_List';
    this.headers = this.headers.set('Authorization', `Bearer ${this.Authorization}`);
    return this.httpClient.post<any>('/SubSystem/Angular_Tran.aspx'
      , JsonSerach, {headers: this.headers})
      .pipe(map((response: Response) => {
        return response;
      }));
  }
}
