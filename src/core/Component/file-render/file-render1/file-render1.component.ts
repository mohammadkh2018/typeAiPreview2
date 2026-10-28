import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ReportService } from '../../../Services/report.service';
import { Location } from '@angular/common';
import { LangService } from '../../../Services/lang.service';
import { GeneralService } from '../../../Services/general.service';
import { HttpErrorManageService } from '../../../Services/http-error-manage.service';
@Component({
  selector: 'app-file-render1',
  templateUrl: './file-render1.component.html',
  styleUrls: ['./file-render1.component.css']
})
export class FileRender1Component implements OnInit {
  dataUrl: any;
  IsImagePdf = false;
  Format: any;
  ObjectJson: any;
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
  constructor(public reportService: ReportService
    , private location: Location
    , private renderer: Renderer2
    , private httpErrorManageService: HttpErrorManageService
    , private generalService: GeneralService
    , public langService: LangService
  ) {
  }
  public b64DecodeUnicode(str: string): string | null {
    if (window
      && 'atob' in window
      && 'decodeURIComponent' in window) {
      return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } else {
      console.warn('b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions');
      return null;
    }
  }
  public b64EncodeUnicode(str: string): string | null {
    if (window
      && 'btoa' in window
      && 'encodeURIComponent' in window) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(('0x' + p1) as any);
      }));
    } else {
      console.warn('b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions');
      return null;
    }
  }
  ngOnInit(): void {
    this.Format = this.reportService.fileFormat.toString().toUpperCase();
    if (this.Format === 'PDF' || this.Format === 'PNG' || this.Format === 'JPG') {
      this.IsImagePdf = true;
      const ivImageWrap = document.getElementById('pdfShow');
      const iframe = document.createElement('iframe');
      iframe.id = 'pdf_show';
      iframe.style.width = '100%';
      iframe.style.height = '100vh';
      iframe.src = window.URL.createObjectURL(this.reportService.dataUrl);
      this.renderer.appendChild(ivImageWrap, iframe);
    }
    if (this.Format === 'HTML') {
      const fr = new FileReader();
      fr.onload = () => {
        if (fr.result) this.dataUrl = this.b64DecodeUnicode(fr.result.toString().replace('data:application/html;base64,', ''));
      };
      fr.readAsDataURL(this.reportService.dataUrl);
    }
  }
  // پی دی اف
  converterPDFBase64ParaBlob = (inBlob: any) => {
    //  const arrBuffer = this.base64ToArrayBuffer(this.getImagemAtual());
    const newBlob = new Blob(inBlob, { type: 'application/pdf' });
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(newBlob);
    //   return;
    // }
    return window.URL.createObjectURL(newBlob);
  }
}
