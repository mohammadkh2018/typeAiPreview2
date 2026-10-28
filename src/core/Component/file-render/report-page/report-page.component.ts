import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ReportService} from '../../../Services/report.service';
import {HttpErrorManageService} from '../../../Services/http-error-manage.service';
import {GeneralService} from '../../../Services/general.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html'
})
export class ReportPageComponent implements OnInit {
  status: any;
  JsonResult: any;
  fileBlob: any;
  public JsonOutput = {
    fromRecord: 1
    , toRecord: 100
    , language: ''
    , rarIs: false
    , exportView: false
    , exportKind: ''
    , exportLang: ''
    , exportList: ''
    , subject: ''
  };
  ObjectJson: any;
  constructor(  public sanitizer: DomSanitizer
              , public reportService: ReportService
              , private httpErrorManageService: HttpErrorManageService
              , public generalService: GeneralService) {
    const json = {
      outInfoJson: this.reportService.status
    };
    this.reportService.JasperView(json).subscribe((response: any) => {
      if (response.size <= 210) {
        setTimeout(() => {
          const text = (new Response(response)).json().then(data => {
            this.JsonResult = data;
            const Json = JSON.parse(JSON.stringify(this.JsonResult));
            if (Json != null) {
              if (Json.hasOwnProperty('outNumber')) {
                  this.generalService.openSnackBar(Json.outMessage, '', 'top', 'left', 'error-snackbar', 'rtl');
                  return;
              }
            }
          });
        }, 200);
      } else {
        if (this.JsonOutput.rarIs) {
          this.fileBlob = new Blob([response], {type: 'application/zip'});
          this.reportService.fileDownload(this.fileBlob, 'zip', this.ObjectJson.Page_Title, '');
        } else {
          this.fileBlob = new Blob([response], {type: 'application/' + this.reportService.param2 + ''});
          this.reportService.fileDownload(this.fileBlob, this.reportService.param2, this.reportService.param3, '');
        }
      }
    }, error1 => {
      this.httpErrorManageService.Http_Control(error1);
    });
  }

  ngOnInit(): void {
  }
}
