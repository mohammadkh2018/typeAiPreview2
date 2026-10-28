import {Component, OnInit} from '@angular/core';
import {DigitCodeService} from './digit-code.service';
import {LangService} from '../../Services/lang.service';
import {HttpErrorManageService} from '../../Services/http-error-manage.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TokenStoreService} from '../../Services/token-store.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-digit-code',
  templateUrl: './digit-code.component.html',
  styleUrls: ['./digit-code.component.css']
})
export class DigitCodeComponent implements OnInit {

  public loadIs = false;
  public isVerify = false;
  public isShowSendBtn = false;
  objectJson: any;
  public clientD: any;
  public serverD:any;
  public digitCheckis = {email: false, sms: false};

  constructor(private digitCodeService: DigitCodeService
            , private langService: LangService
            , private httpErrorManageService: HttpErrorManageService
            , private snackBar: MatSnackBar
            , private router: Router
            , private location: Location
            , private tokenStoreService: TokenStoreService
  ) {
    // چک کردن آیتم ها

    this.digitCodeService.digit_CheckIs().subscribe((responseCheck: any) => {
        const myjsonCheck = JSON.parse(JSON.stringify(responseCheck));
        if (myjsonCheck !== null) {
          if (myjsonCheck.hasOwnProperty('outNumber')) {
            if (myjsonCheck.outNumber !== 0) {

              this.digitCodeService.DigitCodeCheckIsData = myjsonCheck;
              this.router.navigate(['/Access_Denied'], {state: {Message: myjsonCheck.outMessage}});
              return;
            }
          }

          this.digitCodeService.Authorization = myjsonCheck.accessToken;
          this.digitCodeService.DigitCodeCheckIsData = myjsonCheck;
          this.digitCheckis = myjsonCheck;
          this.langService.Defualt_Lang_Data_Set(myjsonCheck.language);

          // زبان
          this.langService.getJSON(myjsonCheck.language, 'digitCode').subscribe((data) => {
            const myJson1 = JSON.parse(JSON.stringify(data));
            this.objectJson = myJson1;
            this.loadIs = true;
            window.parent.postMessage({statuse: false, kind: 'loader'}, window.location.href);

          });

        }

      }, error1 => {
        this.httpErrorManageService.Http_Control(error1);

      }
    );

  }

  //
  onShowSendBtn = () => {
    this.isShowSendBtn = false;
    this.isVerify = false;
  }

  // تائید
  onSubmit = () => {
    this.digitCodeService.Digitcode_Verify(this.clientD, this.serverD).subscribe((response: any) => {
        const Json = JSON.parse(JSON.stringify(response));
        if (Json != null) {
          if (Json.hasOwnProperty('outNumber')) {
            if (Json.outNumber === 0) {
              // this.location.back();
              // window.parent.location.reload();
              this.tokenStoreService.Set_token_fields(Json.outInfoJson, 'hash1');
              this.location.back();
            } else {
              this.openSnackBar(Json.outMessage, '');
              return;
            }

          }

        }

      }, error => {
        this.httpErrorManageService.Http_Control(error);
      },
    );
  }

  // ارسال کد امنیتی
  onResent = (inKind: string) => {
    this.digitCodeService.Digitcode_Send(inKind).subscribe((response: any) => {
        const Json = JSON.parse(JSON.stringify(response));
        if (Json != null) {
          if (Json.hasOwnProperty('outNumber')) {

            this.openSnackBar(Json.outMessage, '');
            if (Json.outNumber === 0) {
              this.isVerify = true;
              this.isShowSendBtn = true;
              this.serverD = Json.outInfoJson;
            }
            return;
          }

        }

      }, error => {
        this.httpErrorManageService.Http_Control(error);
      },
    );
  }


  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
  }
}
