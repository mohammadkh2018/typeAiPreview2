import {Injectable, isDevMode} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  public Json_Data: any;
  public Defualt_Lang_Data: any;
  public Lang_List_Data: any;

  constructor(private http: HttpClient) {
  }

  public Get_Gson_Data_Set(Value: string) {
    this.Json_Data = Value;
  }

  Defualt_Lang_Data_Set = (inlang: any) => {
    this.Defualt_Lang_Data = inlang;
  }

  Lang_List_Data_Set = (inlangList: any) => {
    this.Lang_List_Data = inlangList;
  }

  public getJSON = (lang: string, inForm: string) => {
    if ((inForm === 'Dashboard' || inForm === 'chat') && !isDevMode()) {
      return this.http.get('./Hermes_Web/Dashboard/assets/' + inForm + '/Object-' + lang + '.json');
    } else {
      return this.http.get('./assets/' + inForm + '/Object-' + lang + '.json');
    }
  }

  public getJSONPromise = (lang: string, inForm: string) => {
    if ((inForm === 'Dashboard' || inForm === 'chat') && !isDevMode()) {
      return this.http.get('./Hermes_Web/Dashboard/assets/' + inForm + '/Object-' + lang + '.json').toPromise();
    } else {
      return this.http.get('./assets/' + inForm + '/Object-' + lang + '.json').toPromise();
    }
  }

}
