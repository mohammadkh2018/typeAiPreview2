import { Injectable } from '@angular/core';
import {GeneralService} from './general.service';
interface TabTitle {
  fa: string;
  en: string;
  ar: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {
  mediaType;
  lang: any;
  constructor(public generalService: GeneralService) {
    this.mediaType = sessionStorage.getItem('mediaType');
    this.lang = localStorage.getItem('lang');
  }

  createTabData(tabId: number, title: TabTitle, hafmanCode: string, url: string) {
    console.log('postMessageData',tabId, title, hafmanCode, url);
    return {
      tabId,
      closAble: true,
      hafmanCode,
      hint: { fa: title.fa, en: title.en, ar: title.ar },
      idMenu: tabId,
      idMenu2: '8FA0344DFC7293A723D985114C3C3CDB',
      linkForce: false,
      newIs: false,
      priority: '',
      rownum: '',
      title: { fa: title.fa, en: title.en, ar: title.ar },
      url,
    };
  }

  tab = (data: any) => {
    console.log('postMessageData',data);
    window.parent.parent.parent.parent.parent.parent.parent.postMessage({
      tab_data: {
        tabId: Number(data.tabId),
        closAble: true,
        hafmanCode: data.hafmanCode,
        hint: {fa: data.title.fa , en: data.title.en, ar: data.title.ar},
        idMenu: Number(data.idMenu),
        idMenu2: '8FA0344DFC7293A723D985114C3C3CDB',
        linkForce: false,
        newIs: false,
        priority: '',
        rownum: '',
        title: {fa: data.title.fa , en: data.title.en, ar: data.title.ar},
        url: data.url,
      }, kind: 'addTab'
    }, window.location.href);
    if (this.mediaType === 'mobile') {
      console.log(this.generalService.stringToBase64('{"url": ' + '"' + data.url  + '",' + '"title":"'  + data.title[this.lang]  + '"}'));
      
      
    }
  }

//   tab = (data: any) => {
//   console.log('postMessageData', data);

//   // رفتن به بالاترین لایه ممکن بدون خطا
//   let target: Window = window;
//   while (target.parent !== target) {
//     target = target.parent;
//   }

//   target.postMessage({
//     tab_data: {
//       tabId: Number(data.tabId),
//       closAble: true,
//       hafmanCode: data.hafmanCode,
//       hint: { fa: data.title.fa, en: data.title.en, ar: data.title.ar },
//       idMenu: Number(data.idMenu),
//       idMenu2: '8FA0344DFC7293A723D985114C3C3CDB',
//       linkForce: false,
//       newIs: false,
//       priority: '',
//       rownum: '',
//       title: { fa: data.title.fa, en: data.title.en, ar: data.title.ar },
//       url: data.url,
//     },
//     kind: 'addTab'
//   }, '*');

//   if (this.mediaType === 'mobile') {
//     console.log(this.generalService.stringToBase64(
//       '{"url":"' + data.url + '","title":"' + data.title[this.lang] + '"}'
//     ));
//   }
// };

}
