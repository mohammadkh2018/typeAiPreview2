import {Injectable} from '@angular/core';
import {TokenStoreService} from './token-store.service';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  public webSocket: any;
  private audio: any;
  private wsMessage = new Subject<any>();
  wsObservable = this.wsMessage.asObservable();
  public isOpenChat = false;
  public IsDisconnect = false;
  public isSound = false;
  public tryCount = 0;
  constructor(private tokenStoreService: TokenStoreService) {
  }
  wait(ms: any) {
    let start;
    let end;
    start = new Date().getTime();
    end = start;
    while (end <= start + ms) {
      end = new Date().getTime();
    }
  }
  // برقراری اتصال
  connectWs() {
    this.isSound = true;
    let Authentication;
    let Authorization;
    try {
      if (window.location.protocol === 'http:') {
        this.webSocket = new WebSocket('ws://' + window.location.host
          + '/SubSystem/Socket.ashx?Authentication=' + Authentication
          + '&Authorization=' + Authorization);
      } else {
        this.webSocket = new WebSocket('wss://' + window.location.host
          + '/SubSystem/Socket.ashx?Authentication=' + Authentication
          + '&Authorization=' + Authorization);
      }
      this.webSocket.onopen = (event: any) => {
        const action = 'ping';
        const type = 'chat';
        this.webSocket.send('{action:"' + action + '",type:"' + type + '"}');
      };
      this.webSocket.onmessage = (event: any) => {
        setTimeout(() => {
          const msg = event.data;
          const jsonOb = JSON.parse(msg);
          if (jsonOb !== null && jsonOb !== undefined) {
            // chat
            if (jsonOb.type === 'chat') {
              // پیام جدید
              if (jsonOb.action === 'newMessage') {
                this.wsMessage.next(jsonOb);
              }
              // حالت تایپ
              if (jsonOb.action === 'writing') {
                this.wsMessage.next(jsonOb);
              }
              // استعلام آنلاین
              if (jsonOb.action === 'onlineing') {
                this.wsMessage.next(jsonOb);
              }
              // آپلود عکس
              if (jsonOb.action === 'imageing') {
                this.wsMessage.next(jsonOb);
              }
              // آپلود فایل
              if (jsonOb.action === 'attaching') {
                this.wsMessage.next(jsonOb);
              }
              // ظبط صدا
              if (jsonOb.action === 'voiceing') {
                this.wsMessage.next(jsonOb);
              }
              // زنگ خوردن
              if (jsonOb.action === 'calling') {
                this.wsMessage.next(jsonOb);
              }
              // آفلاین شدن
              if (jsonOb.action === 'offlining') {
                this.wsMessage.next(jsonOb);
              }
              // پیام فوری
              if (jsonOb.action === 'force') {
                this.wsMessage.next(jsonOb);
              }
            }
          }
        }, 100);
      };
      this.webSocket.onerror = (event: any) => {
        setTimeout((err: any) => {
          if (!this.IsDisconnect) {
            this.reconnectWs();
          }
        }, 15000);
      };
    } catch (exception) {
    }
  }
  // وضعیت اتصال
  getStatusWs() {
    return this.webSocket.readyState;
  }
  // اتصال مجدد
  reconnectWs() {
    if (this.tryCount <= 3) {
      this.connectWs();
    }
    this.tryCount = this.tryCount + 1;
  }
  // ارسال پیام
  sendMessageWs(message: any) {
    this.webSocket.send(message);
  }
  // قطع اتصال
  disconnectWs() {
    if (this.webSocket) {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.IsDisconnect = true;
        this.webSocket.close();
      }
    }
  }
}
