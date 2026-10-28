import {BrowserStorageService} from './browser-storage.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  private remember = 'SS_reminder_me';

  constructor(private browserStorageService: BrowserStorageService) {
  }

  SetReminderMe(invalue: any): void {
    if (invalue === undefined || invalue === 'undefined') {
      this.browserStorageService.SetLocal(this.remember, 'False');
    } else {
      if (invalue === true) {
        this.browserStorageService.SetLocal(this.remember, 'True');
      }
      if (invalue === false) {
        this.browserStorageService.SetLocal(this.remember, 'False');
      }
    }
  }

  rememberMe(): boolean {
    return this.browserStorageService.GetLocal(this.remember) === 'True';
  }

  hasToken_Access(): boolean {
    if (this.rememberMe()) {
      const myaccessToken = this.browserStorageService.GetLocal('hash1');

      if (myaccessToken !== '' && myaccessToken != null && myaccessToken !== 'undefined') {
        return true;
      } else {
        return false;
      }
    } else {
      const myaccessToken = this.browserStorageService.GetSession('hash1');
      if (myaccessToken !== '' && myaccessToken != null && myaccessToken !== 'undefined') {
        return true;
      } else {
        return false;
      }
    }

  }

  get_token_Value(inkey: string): string {
    if (this.rememberMe()) {
      const myaccessToken = this.browserStorageService.GetLocal(inkey);
      return myaccessToken;
    } else {
      const myaccessToken = this.browserStorageService.GetSession(inkey);
      return myaccessToken;
    }
  }

  Set_token_fields(mytoken: string, inKey: string): void {

    if (mytoken == null) {
      throw new Error('پاسخ مناسبی یافت نشد');
    }

    if (this.rememberMe()) {
      this.browserStorageService.SetLocal(inKey, mytoken);
    } else {
      this.browserStorageService.SetSession(inKey, mytoken);
    }
  }

  sethash2(mytoken: string, inKey: string): void {
    this.browserStorageService.SetSession(inKey, mytoken);
  }

  gethash2(inKey: string): void {
    return this.browserStorageService.GetSession(inKey);
  }

  Kill_Token() {
    this.browserStorageService.removeLocal('hash1');
    this.browserStorageService.removeSession('hash1');

    this.browserStorageService.removeLocal('SS_reminder_me');
  }


}
