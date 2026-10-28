import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public headers = new HttpHeaders();
  public headers2 = new HttpResponse();
  public dataUrl: any;
  public fileFormat: any;
  public fileName: any;
  public auth: any;
  public param2: any;
  public param3: any;
  public check: any;
  public status: any;
  public checkIsData: any;
  JsonResult: any;
  fileBlob: any;
  showPdf: any;
  zoomPercent = 100;
  constructor(private router: Router
            , private httpClient: HttpClient
            , private routeActivatedRoute: ActivatedRoute) {
  }
  // دانلود فایل blob
  fileDownload = (infileBlob: any, infileFormat: string, infileName: string, inMatchRoot: string) => {
    const data = window.URL.createObjectURL(infileBlob);
    this.dataUrl = infileBlob;
    this.fileFormat = infileFormat;
    this.fileName = infileName;
    if (infileFormat.toUpperCase() === 'PDF' || infileFormat.toUpperCase() === 'HTML') {
      this.router.navigate(['/Reports']);
      return;
    }
    const link = document.createElement('a');
    link.href = data;
    link.download = infileName + '.' + infileFormat + '';
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
  JasperView = (JsonSave: any ) => {
    this.headers = this.headers.set('Authorization', `Bearer ${this.auth}`);
    JsonSave.inMethode_Name = '/api/App_Jasper_View';
    return this.httpClient.post('/SubSystem/Angular_Tran.aspx'
      , JsonSave, {headers: this.headers , responseType: 'blob'})
      .pipe(map((response) => {
        return response;
      }));
  }
  // دانلود فایل بدون نمایش base 64
  file_Base64Download = (infileBase64: any, infileFormat: string, infileName: string, inMatchRoot: string) => {
    const data = infileBase64;
    this.dataUrl = infileBase64;
    this.fileFormat = infileFormat;
    this.fileName = infileName;
    const link = document.createElement('a');
    link.href = data;
    link.download = infileName ;
    link.click();
  }
  // دانلود فایل بدون نمایش
  file_OnlyDownload = (infileBlob: any, infileFormat: string, infileName: string, inMatchRoot: string) => {
    const data = window.URL.createObjectURL(infileBlob);
    this.dataUrl = infileBlob;
    this.fileFormat = infileFormat;
    this.fileName = infileName;
    const link = document.createElement('a');
    link.href = data;
    link.download = infileName + '.' + infileFormat + '';
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
  // تبدیل فایل base64 به blob
  base64toBlob = (base64Data: any, contentType: any) => {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex++) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; i++, offset++) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {type: contentType});
  }
  //
  getContentType = (inHeader: string) => {
    // xls
    if (inHeader === 'data:application/vnd.ms-excel;base64') {
      return 'application/xls';
    }
    // xlsx
    if (inHeader === 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64') {
      return 'application/xlsx';
    }
    // pdf
    if (inHeader === 'data:application/pdf;base64') {
      return 'application/pdf';
    }
    // docx
    if (inHeader === 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64') {
      return 'application/docx';
    }
    // txt
    if (inHeader === 'data:text/plain;base64') {
      return 'text/json';
    }
    // zip
    if (inHeader === 'data:application/octet-stream;base64') {
      return 'application/octet-stream';
    }
    //
    return '';
  }
  //
  getFormatFile = (inHeader: string) => {
    // xls
    if (inHeader === 'data:application/vnd.ms-excel;base64') {
      return 'xls';
    }
    // xlsx
    if (inHeader === 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64') {
      return 'xlsx';
    }
    // pdf
    if (inHeader === 'data:application/pdf;base64') {
      return 'pdf';
    }
    // docx
    if (inHeader === 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64') {
      return 'docx';
    }
    // txt
    if (inHeader === 'data:text/plain;base64') {
      return 'txt';
    }
    // zip
    if (inHeader === 'data:application/octet-stream;base64') {
      return 'zip';
    }
    //
    return '';
  }
}
