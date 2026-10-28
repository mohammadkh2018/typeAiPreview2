import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() {
  }

  GetSession(Key: string): any {
    const data = window.sessionStorage.getItem(Key);
    return data;
    // if (data) {
    //   return JSON.parse(data);
    // } else {
    //   return null;
    // }

  }

  SetSession(inkey: string, inValue: any): void {
    window.sessionStorage.setItem(inkey, inValue);
  }

  removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }


  GetLocal(key: string): any {
    const data = window.localStorage.getItem(key);
    return data;
    // if (data) {
    //   return JSON.parse(data);
    // } else {
    //   return null;
    // }
  }

  SetLocal(key: string, value: string): void {
    console.log('SetLocal داره تو سرویس استوریج تب میسازه' , key , value );
    
    window.localStorage.setItem(key, value);
  }

  removeLocal(key: string): void {
    window.localStorage.removeItem(key);
  }

}
