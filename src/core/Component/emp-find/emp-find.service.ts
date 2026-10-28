import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TokenStoreService} from '../../Services/token-store.service';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpFindService {
  private headers = new HttpHeaders();
  Authorization: any;
  constructor(private httpClient: HttpClient
            , private tokenStoreService: TokenStoreService) {
  }
  // جستجو
  EmpFindList1 = (JsonSerach: any) => {
    JsonSerach.inMethode_Name = '/api/Core_Emp_Find_List';
    this.headers = this.headers.set('Authorization', `Bearer ${this.Authorization}`);
    return this.httpClient.post<any>('/SubSystem/Angular_Tran.aspx'
      , JsonSerach, {headers: this.headers})
      .pipe(map((response: Response) => {
        return response;
      }));
  }
}
