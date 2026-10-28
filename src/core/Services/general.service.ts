import {Injectable} from '@angular/core';
// import {DeviceDetectorService} from 'ngx-device-detector';
import {LoaderService} from './loader.service';
// import * as moment  from 'jalali-moment';
// import moment from 'jalali-moment';

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  isHttps = false;
  domainUrl = '';
  public Authorization: any;
  public hash2: any;
  public hash3: any;

  public status: any;
  public idMeeting: any;
  public autho: any;
  public accessField: any;
  public caption: any;

  public closeAbleLeftSide = false;
  constructor(
    // private deviceService: DeviceDetectorService
     private snackBar: MatSnackBar
    , private loaderService: LoaderService
  ) {
  }
  public Has_Values(Object: any) {
    for (const key in Object) {
      if (Object[key] !== '' && Object[key] !== null && Object[key] !== undefined) {
        return true;
      }
    }
    return false;
  }
  public Has_ValuesNotFalse(Object: any) {
    for (const key in Object) {
      if (Object[key] !== '' && Object[key] !== null && Object[key] !== undefined && Object[key] !== false) {
        return true;
      }
    }
    return false;
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  public removeNull(Object: any) {
    for (const key in Object) {
      if (Object[key] === '' || Object[key] === null || Object[key] === undefined) {
        delete Object[key];
      }
    }
    return Object;
  }
  // تشخیص دستگاه
  // public DeviceDetector() {
  //   const isMobile = this.deviceService.isMobile();
  //   const isTablet = this.deviceService.isTablet();
  //   const isDesktopDevice = this.deviceService.isDesktop();
  //   if (isMobile) {
  //     return 'Mobile';
  //   }
  //   if (isTablet) {
  //     return 'Tablet';
  //   }
  //   if (isDesktopDevice) {
  //     return 'Desktop';
  //   }
  // }
  public is_https(inIsHttps: boolean) {
    this.isHttps = inIsHttps;
  }
  // نگهداری توکن دسترسی
  Authorization_data_Set(inAccessToken: any) {
    this.Authorization = inAccessToken;
  }
  // نگهداری توکن دسترسی اصلی داشبورد
  hash2_data_Set(inAccessToken: any) {
    this.hash2 = inAccessToken;
  }
  public Kill_Values(Object: any) {
    for (const key in Object) {
      Object[key] = '';
    }
  }

  bg = (i: any) => {
    if (i % 2 === 1) {
      return 'white';
    } else {
      return 'rgb(243 243 243 / 82%)';
    }
  }
  isImage(inFileName: string) {
    let myFile;
    if (inFileName !== '' && inFileName !== undefined && inFileName !== null) {
      myFile = inFileName.toString().toUpperCase();
      if (myFile.indexOf('PNG') > 0
        || myFile.indexOf('JPG') > 0
        || myFile.indexOf('JPEG') > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  //
  fileExtention(inFieName: string) {
    if (inFieName === '' || inFieName === undefined || inFieName === null) {
      return '';
    }
    const Extention = inFieName.split('.')[1];
    if (Extention.toUpperCase() === 'PNG'
      || Extention.toUpperCase() === 'JPG'
      || Extention.toUpperCase() === 'jpeg'
      || Extention.toUpperCase() === 'tiff') {
      return 'image';
    }
    if (Extention.toUpperCase() === 'mp4') {
      return 'video';
    }
    return 'file';
  }
  //
  fileType(inFieContent: string) {
    const mime = this.base64Mime(inFieContent);
    if (mime === 'image/png') {
      return 'png';
    }
    if (mime === 'image/jpeg' || mime === 'image/jpg') {
      return 'jpg';
    }
    if (mime === 'application/pdf') {
      return 'pdf';
    }
    if (mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return 'xlsx';
    }
    if (mime === 'application/vnd.ms-excel') {
      return 'xls';
    }
    if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'docx';
    }
    if (mime === 'application/msword') {
      return 'doc';
    }
    if (mime === 'image/tiff') {
      return 'tiff';
    }
    return 'not';
  }
  base64Mime(encoded: any) {
    let result;
    let mime;
    if (typeof encoded !== 'string') {
      return result;
    }
    mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  }

  // تبدیل تاریخ میلادی به شمسی
  enDateToFaDate = (inDate: string) => {
    // return moment(inDate).format('jYYYY/jMM/jDD');
  }

  // تبدیل تاریخ میلادی به شمسی
  faDateToEnDate = (inDate: string) => {
    // return moment.from(inDate, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
  }

  // تبدیل به hex
  String2Hex2(tmp: any) {
    let str : any | never;
    for (let i = 0; i < tmp.length; i++) {
      str += tmp[i].charCodeAt(0).toString(16);
    }
    if (str !== '' && str !== null && str !== undefined) {
      return str.replace('undefined', '');
    } else {
      return '';
    }
  }
  // تبدیل hex به text
  hextoString2(hex: any) {
    let str: any | undefined;
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    if (str !== '' && str !== null && str !== undefined) {
      return str.replace('undefined', '');
    } else {
      return '';
    }
  }
  // تبدیل به base64
  stringToBase64(inText: string) {
    return btoa(unescape(encodeURIComponent(inText)));
  }
  // تبدیل base64 به  text
  base64Tostring(inBase64: string) {
    return decodeURIComponent(escape(atob(inBase64)));
  }
  // بدون تصویر
  public getNotImageBase64() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXGxsb////JycnDw8Pv7+/8/Pza2trNzc3g4ODy8vLm5ub4+PjV1dXj4+Pr6+vp6ekuEkSCAAADOElEQVR4nO3cW3OrIBSGYXSpeIr+/3+7RZumnaSpix2Di75PLzqdyQVfOQgIcQ4AAAAAAAAAAAAAAAAAAAAAAAA4Tpm6AEeTq9QFOYRIOTZtX1XTpR29yy2kiG+7urgZpjGnkOKarrhTzz6XjNIMa6L7kFMWGcU/qL/PerxsnzE7xi41JO2DuvuiM1+N89N8oRpHyxHFPWmhnxqrEUPf2hPQbkRxUu0KaDZiKfPDR8QjPnVho0izswYXQ+rCRil31t9qNthOZVIELIoxdXn1RlXAYjBXibvHUauVKF4ZsOiMVaKyFwbWJqiagXTT20qoHGcCW2ON9PqEhalFogwRCZvUpVbRd0NjHdHHJKwsJYwYaIwNNYplxU1tKKFm4UTCc/oDCbMfafQri8DU0yL/J37crM1Uwuxn3jGTGktD6UL0CS/GEv76zumOtV0Mv3dD/8raTlT+u4nqaU2XusB62l19a43UKdf5k8GAqgVGbfP40P52WpsbZlay9zW+sRnpTZhm7puAtzYDbvZENB3QuV8f/LXRJroJDbV9Em75GcIxDMsZF/5ZS+1Tl+4lpB3uD9asf1fW1hM/EdcM9/nqPE6XfhDxl28Px7pqSsns6L5I6Zt+mqpp7jM8yf5BxOV7GeGvyKvjAQCAh+Tbr8zI7YpsHlPTLwnWPH5s+7nq6mAYumoOV2VNJ90moEuAcmynH7dN625ufOk+c9qatoabzW21YzdxjemM1ebS+pZ0u97M1Nunhn5Z85sJKW6cYs7TdK3fQp64sa5dKi7eZriGPKuw4RRzVmiz/WO6sEV1UiKPrt1HJO23bcazBb3fFP0PYav4bFfY5YX5rhnPRMbX5itCWz1RM5Xfb91HZRzPMq4eUIEfpnMMq3I5KN9iOENvjLhpqJD6OyVCI9KeX9MKEVM+N6TSnkFUqhMfRYk67azNmPQLF6LuVWil/MIF1dcmxEt3TeHI58Q3ydrpm6qwTlaJcfe3YhKm6onqo9zxUp3OPGo6ei/R4b43dcMgUUcs3xYw1cW9/BO67BPmX4ckJCEJSUhCEpKQhC+V6hp0+T6nfrkPAAAAAAAAAAAAAAAAAAAAAAAAvNc/BaMjNJZwCScAAAAASUVORK5CYII=';
  }
  //  بدون تصویر گوگل مپ
  public getNotGoogleMapImageBase64 = () => {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAAAMzckjAAAABmJLR0QA/wD/AP+gvaeTAABDq0lEQVR42u3de3Rc5Znn+2fXRVVSqVwybZdUMsgWNuUEyfYIYzHdhmO729Oe1a5ADwZWbDIOM7SZtMkigUzstejTdmM7wzohBJFzmiRtszrtPm7aTOgExu4BJunmYpo0BE+b4DRItkHiIl84smSVVLpUaZ8/hBzLutVlV+137/f7+SfBF0n17JL48b7v87yGaZqmAAAAQBseSgAAAKAXAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmfJQAgJNcSJly/JNhERH5sCsjH57PXPy9108OT/jzr58cyuvz/PbCskl+zX/x/1812ytXXeEVEZGGWr/MKjd4OAAcwzBN06QMAFRx/JO0XEiNyD99FtzGQt3xT4blQkrtH1ezyg1pqB0Nib+90C+zyj3SWOuTWeUeaajlv7cBqIMACMAWr58curiC9/rJYfnofEY+7Mq4+jU3fBYGf3uh/+IK4mQrjQBQbARAAEU1tmX7TyeH5NefpOXDrowc/yRNYS7RUOuTq67wyrW1PvmdhWVsKQMoOgIgAEsd/yR9MeyNrfIhdw21PmmY55ffvtovDfP8bCEDsBQBEEBBxgLfL04OyT+dHFL+nJ5TzSo35HcWlsm/XVj22SohgRBA/giAAHLyYVdGnj8+SOCz2aWB8N83BC52JANANgiAAGb0/Dujge/544Ns6Srqqiu88u8bAqOBsDFAQQBMiwAIYIILKVOef2dAXjg+yCqfA42tDiaWlsu/u7ZMKoM0lAAYjwAIQETGh77n3xmkIA7n93ikPlIuHsOQlXGvrIz7ZGXcSxgEICIEQEBrhD538hqG1M0ql4B34m2fhEEAIgRAQEvPvzP4WegbYHvXha6sDEpl2cxdwuuW+i6GQQB6IQACmviwKyNP/zIl//2XAzRyuFh1RUBmB/05/Z2aiCErF/vk1hV+qYmwKgjogAAIuNzTb6bk6V8OyOuf3a0L94oE/BILFdYBvGy+V9Yt8cm6pcwZBNyMAAi4EKt9+qnwe6UuXG7Zx6sMGnLrCp+sW8qqIOBGBEDARV4/OSRP/3JAnn4zRTE0EvR6pG7WaMdvMaxb6pN1S3yybD5nBQG3IAACLvD8O4Oy79V+tnk1NF3Hr9UWVXvk1hV+tocBFyAAAg729Jsp+e7/6mObV2N1s8qlwlfalbmaiCGbbypjlAzgYARAwGEupEw5+MuUPPlqP8FPc7FQUCIB+1bjxs4JbljhJwgCDkMABBziQsqUva/2yb5X+5ndB0s6fq1CEASchwAIKI7gh8uFy3wyrzKo3NdFEAScgwAIKIwzfrhcsTt+rTAWBL98UxkPDFAUARBQEMEPk/EahiyIVIjf44zVtbFmEbqGAfUQAAGFvH5ySB59sY9xLphUfaSiJONerFYTMWRbIsAcQUAhBEBAAR92ZeTPnuuV598ZpBiYlN0dv1ZYNt8r2xIBbhYBFEAABGw01uDx3Rf7KAamNKe8TOaUu+c83YZmv2y+kUYRwE4EQMAmz78zKH/2XC/n/DAtlca9WKkyaMjWtZwPBOxCAARK7MOujNx/8ALn/DAjJ3T8FmrZfK9sXVsmi6qdd7YRcDICIFBCj76YZLsXWfEahiysqnB1+LvU5pv8zA8ESogACJTA6yeH5P6DF9juRVa8hiF1s8od2fFbCLqFgdIhAAJFdCFlyndfTMreV/spBrJ2ZWVQKsv0PRu3bqlPtq4tYzUQKCICIFAkrPohH9UVAZkd9Gtfh8rg6GrgyjirgUAxEAABi7Hqh3y5teO3EKwGAsVBAAQsdPyTtNz9o25W/ZCzoNcjCyIVFGISnA0ErEcABCxChy/ypcO4FytsaPbL1rXuGYgN2IkACBSIuX4ohK4dv/laVO2RbyYCzA0ECkQABArw/DuDcv/BHrmQ4tsI+ambVS4VPrY2c8EtIkDhCIBAnv7s2V4aPVCQWCgokQAhJl80iAD5IwACOfqwKyN3/6hbjn+SphjIGx2/1mBLGMgPARDIwesnh+Q//6ibLV8UpMLvlbpwOYWwCFvCQO4IgECW6PKFFej4LR66hIHsEQCBGVxImXL/wR55/p1BioGCeA1DFkQqxO8h/BXLsvle2bUhwLlAYAYEQGAanPeDleojFYx7KYGaiCEP3RbkXCAwDQIgMIXjn6Tltu93cd4PlqDjt7S4SxiYHgEQmMTTb6bk/oMXKAQscUXQL9EKOn7tsHVtmWxo9lMI4DIEQOAyzPeDlRj3Yr91S32yLcEzAC5FAAQucf/BC/L0mykKAUvQ8auOlXGvbEvQHAKMIQACMtrpe9v3u2j2gGW8hiELqyoIfwpZVO2RR+8MEgIBIQAChD9YzmsYUjernI5fBXFzCDCKAAitHf8kLXf/qFs+7MpQDFiGjl+1VQYNefROxsRAbwRAaIsxLyiG6oqAzA7Sdao6QiB0xzsfWiL8oRgiAT/hzyGSA6Z848CAnDgzQjGgJVYAoR3CH4oh6PXIgkgFhXCgbYmArFvKlj30wgogtEL4QzH4PaPjXuBM3z40KC+8TRMY9EIAhDZePzlE+IPlvIYhV4aDjHtxOEIgdMOaN7QwuvJ3nkLAcrFQgHEvLvHtQ4MiImwHQwv81ILrjW37AlaLhYJSWUZYcBNWAqELAiBcjTN/KJZIwM+sP5ciBEIHBEC4FuEPxVLh90osFKAQLvbEz4YYEQNXIwDClQh/KJag1yNXVgYphMsxJxBuRwCE63zYlSH8oSi8hiGxSjp+dUEIhJsRAOEqF1Km3P2jbsIfiqJuVjkdv5oZC4HJAX6mwF34SQbXuJAy5bbvd8nxTzi8DevFQkHCn6YIgXAjfprBNe4/2EP4Q1FcEaTjV3cnzowQAuEqBEC4wv0HL8jz7wxSCFguXOaTaAUdvxgNgU/8bIhCwBUIgHC8va/2y9NvpigELBf0ehj3gnFeeDtNCIQrEADhaE+/mZI/e7aXQsByXsOQulnldPxigmfeGGZQNByPAAjHSp9slcU7b5fFqVMUA5Yi/GEm3z40KMfaMxQCjkUAhCNlTndK9zf+WGqHzsq+Ew/Kmp5fUBRYJloRoOMXM9rxzKCc7qEpBM7ETzg4jpnslQs7vylmcnTrN5zpk8fe/5bc3PVzioOCzSkvo+MXWUkOmLLzx3QGw5kIgHCc5Pcfk/TJ1gm/vqujRXZ1tFAg5C0S8Muc8jIKgaydODMi3z7EBAI4DwEQjpJ65ikZeOHQlL9/c9fPZd+JByWc6aNYyAkdv8jXa60Z+atX6QyGsxAA4RjDx96S5Pcfm/HPXZ/8lew78SDNIcia3+ORulnlFAJ52//qME0hcBTDNE0OL0B5ZrJX/r8v/eHFc3/Z6PWG5I8W/Td5r/xqCogpjXX80vSBQlUGDfnh3eVSE6F7HOrjJx4coWfntpzCn8hoc8jB975GcwimFQvR8QtrjDWFAE7ATz0or2//Xhk+9lbef39XR4t88+O9FBITVFcEpLKMjl9Yh+vi4BQEQCht+Nhb0r+/8PB257nn5LH3v0VzCC6KBPwyO+inELDcM28My2utnAeE2jgDCGXlc+5vJu+VXy331/+JfFIWpcAaq/B7pS5M0weKpzJoyIGt5VIZ5Dwg1MQKIJSVz7m/mSxOnZKD791Hh7DGgl6PXFkZpBAoquSAKTueYT4g1EUAhJJSzzxV0Lm/6YQzfbLvxIM0h2jIaxgSqwxyxy9K4lh7Rp55Y5hCQEkEQCgnfbJV+v56X1E/RzjTJ7s6WuQrp5+i4BqZFw7S8YuSeuJnQ3LizAiFgHL4SQjl9H57l+Vbv1P5yum/kV0dLTSHaCAWCkqFz0shUHKPcFUcFEQAhFL69u+d9J7fYuL6OPe7IuiXSIBxL7DHiTMjXBUH5RAAoYz0yVZLRr7kg+YQ9wqX+SRawR2/sNf+V4fZCoZSCIBQRu+3d9n6+WuHzsq+Ew/Kmp5f8DBcIuj1SCxE+IMa2AqGSgiAUIIdW7+TCWf65LH3vyV3nnuOh+JwXsOQeeFyOn6hDLaCoRIGQcN26ZOtcv6/fEm5r+u5K35PdtR9nQfkQF7DkLpZ5XT8Qkk/vLtcFlXz3oS9eAfCdsknHlPy66I5xLmiFQHCH5TFXcFQAT8hYatiDny2wvXJX8m+Ew/SHOIgc8rL6PiF0hgQDRUQAGEbM9lb9IHPVlicOiX7Tjwo1yd/xUNTXCTglznlZRQCytt/ZFiSA5zAgn0IgLBN8vuPlWzgc6G4Pk59Qa9HqisIf3CG5IAp36YrGDYiAMIWw8fekoEXDjnu697V0SK7Olp4gIrxezxSN4uOXzjLa60ZOdaeoRCwBQEQtlC18SMbN3f9XB57/1s0hyjCaxhyZThI+IMj0RACuxAAUXKpZ55SYuZfIdb0/EL2nXhQaofO8kBtFgvR8QvnOnFmhIYQ2IKfmigppzR+ZIPr4+xXXRGQyjI6fuFsNITADgRAlFTfX+9zTONHNsKZPjn43tdoDrFBJOCX2UE/hYDjJQdM2X+EVUCUFgEQJZM53SmpZ55y5Wvb1dEiXzntztemIu74hds888awnO5hFRClQwBEyfR9/7uufn1fOf03squjheaQIgt6Rzt+Abd54n8xFgalQwBESQwfe0sGX3vZ9a+T6+OKy2sYEquk4xfuxFgYlBIBECXRt98djR/ZWJw6JX//67tpDimCeeEgHb9wtb/iLCBKhJ+kKLrhY28pfd9vMYzdHLKm5xe8ASwSCwWlwuelEHC1Y+2sAqI0CIAout5Hdmn5usOZPnns/W/Jneee401QoEjAL5EA417gfqanXx59+88pBIqOAIiiGnjhkGROd2pdg29+vJfr4woQLvPR8QttpGoel3/tf0UOvf+PFANFRQBEUfX/9V6KIKPNIQff+xrNITli3At0korulXT5uyIi8hfH/zsFQVERAFE0rP6Nx80hufEahswLl9PxCy0Mh4/IcPjIxX/u7DvLKiCKigCIomH1b6LaobOy78SDcn3yVxRjBnWzysXvIfzB/TLl70oqOvHnJauAKCYCIIqC1b+pjXUIc33c1GIhxr1AD5lAh/TXPD7p73X2nZWXPn6DIqEo+AmLohh48TBFmMGujhaaQyYxp7yMjl9owfT0S6rmcTE9/VP+mb9t5WcpioMACMvpOPcvX9wcMl4k4Jc55WUUAlror31YRnyfTvtn3jp7XN46e5xiwXIEQFhOp1s/rHB98ley78SDUjt0Vus6BL0eqa4g/EEPqeheyQQ6svqze48/TcFgOQIgLJU+2crqXx507xD2GobUzaLjF3oYirw4ruN3Jm+dPS6dfXr/ByKsRwCEpVJ/97cUIU/hTJ8cfO9r2jWHEP6gk3ToqAzMOZDz36MjGFYjAMIymdOdMvDCIQpRoF0dLfLNj/UZoRMLBej4hRYygY5Jx71k49D7/yi9w5wVhnX4qQvLDLxI+LPKneeek10dLa5vDqmuCEhlGR2/cD/T0y/9tQ9P2/E7k6feoyMY1iEAwjJs/1rL7R3CkYBfZgf9PGi4nhXhT4SRMLAWARCWGHjhkJjJXgphscWpU/L3v77bdc0h3PELnQzMOZB1x+90eof7uB4OlmHvBZZg8HPxjN0c8si8LfLcFb/n+Nfj93ikblZ50T5+ZdCQhdUeqYkYUh0ZbSz5N3XenD7Gv3RkRETkTI8pp3tMOXlmRJIDJm9G5Gzwip/m1PE7k0MfvCSJ+jUUFgUjAKJgjH4pvnCmT3Z1tEjt0Fn5Qc1Gx74Or2HIleGgZR2/i6o9srDaIwujnov/vzJY+MdeNn/ywHisPSMnzozIybMjcvLMiJw4M8KbE1MaDh+Rwdk/sfRjjo2EiYWiFBgFIQCiYJz9K52vnP4bqR06Izvqvu7Ir39euLA7fmsihqxc7JNldV5ZVmdN2MvFsvneceEwOWDKsY4ROdaRuRgOAZHCOn5n8lTr38sDTXdRZBTEME2TfQ0U5NM//D3O/5XYe+VXyx8t+m/S6w055muOhYJ53fG7qNojv7/EJysX+6QmovaswNM9prz2Xlpe/FWaMKixEd+n0nfVnxbc9DGVsD8k/3DrX1FoFIQAiIIMvHBIeh/ZRSFs8ElZVO6v/xN5r/xq5b/WSMCfU9NHTcSQW1f4HRH6pkIY1NNYx68VTR/T2dl8L2cBURACIArS/Y0/5vyfjXq9IdlR93X5x8i/VfZrrPB7pS6cXdPHuqU+uXWFXxZVu2tAwYkzI/J3bw7LC2+nedO6XH/N45IOHS3651k9r1keuXEbBUfeCIDIW+Z0p3R96RYKoYAddV9XskM46PXMeM1bZdCQW1f4ZMMKf8nP9JVacsCUZ94clr97M01XsQsNzDkgQ5EXS/b5nks8QTMI8sYcQORt6LWXKIIidnW0yK6OFqW+Jq9hyLzw1OGvMmjI5pv8cmBruXz5pjLXh7+x1/zlm8rkwNZy2XyT+wOvTobDR0oa/kREXvr4DQqPvLECiLx1fekWyZzupBAK+WXlErm//k+UaA6pj1RM2vGr04rfTFgRdIdM+bvSV/twyT9vLBSV5xJP8ACQFwIg8pI+2Srn/8uXKISC3iu/WnbUfc3W5pCpOn43NPtl840Ev8slB0zZf2RYnnljmGI4TCbQYck1b/k6sO47Eq9awINAztgCRl64+UNdi1OnZN+JB227Pu6KoH9C+Fs23ys/vLtctq7VY6s3V5VBQ7auLZMD91ZMOYQa6jE9/TIwd69t4U9E5ND7L/EgkBcCIPLC+T+1hTN9cvC9r8nNXT8v6eeNBPwSrfjNuJexYPPdO4Ou6+wthpqIId+9MyjbEgGCsgOkah4v+riXmXAOEPniJzJylj7Zytk/h9jV0SLf/HhvST5X0OuR6oqyi/+8bL5XDmwtlw3Nfh5EjtYt9cmBreWyMs5qoKpS0b2SLn/X9q+js++stHZ/wANBzgiAyBnbv85y57nn5LH3vyXhTF/RPofXMC6Oe7l01Y9VrPxVBg3ZdVuQbXMFDUVelOHwEWW+HraBkQ8CIHLG9q/zrOn5hew78aDUDp21/GNfGv4WVXvk0TuDrPpZaEOzXx5lC10Z6dBRGZhzQKmviW1g5IOfKMgJ27/OtTh1Sg6+d5/lzSHRioAEvB5ZGfcSVIpkLFivW+qjGDbKBDokFd2r3NfFNjDywU9q5GTwtZcpgoOFM32y78SDljWHzCkvk0jAJ5tv8suu29jyLabKoCHbEgHZuraMYtjA9PRLquZxWzt+p/PSR6wCIjcEQORkiADoeOFMn+zqaJGvnH6qoI8TCfhlweyAbEsE5Ms3EUpKZUOzny5hG/TXPiwjvk+V/fpeZhsYOSIAImuZ052SPtlKIVziK6f/RnZ1tOTVHBL0euSa3wqyLWmTdUt98ihNNiWTiu61fdzLTFq7P5DOvrNKf41QCwEQWRs+9hZFcJmbu34u+048mFMI9Hs88vloBef9bDZ2LpAQWFyDV/xUqY7f6bx19jgPDFnjpzeyNvRPbP+6US7NIV7DkMVzyqXlS+WEPwWMhcCaCCGwGIbDR2Rw9k8c8/W+/PGbPDRkjZ/gyNrQsaMUwaVqh87KvhMPypqeX0z75675raD8+ZcrCH8KWVTtkYdowLFcJtCh3LiXmbACiFzwUxxZGT72lpjJXgrhYuFMnzz2/rfkznPPTfr71/xWUH74nyoJfwpiO9hapqdf+msfVrbjdyq9w32EQGSNn+TICqt/+vjmx3tlV0fLuF+bN8sv+/5zmPCnMEKgNZwa/sYQAJEtfpojK8MEQK1c2hxS4ffKDzbPIvw5wFgIRP6c0PE7naPnCIDIDj/RkRU6gPVzffJX8pe9X5fHvxiR6xYw6sUpFlV7ZFsiQCHyMDDngKRDzv6PXVYAkS0CIGZE+NOTEczI8ruWyh8s415fp1m3dPR2FmRvOHxEhiIvuuK1EAKRDQIgZsT5P/0YwYzM+tq1UnbjHorhUF++qUxWxr0UIguq3vGbLwIgskEAxIw4/6efioRPytb83xTC4bYlAswInEEm0CH9tQ+76jVxDhDZIABiRmwB66X8ptNSfudfiPiqKIbDVQYNeeg2mkKmYnr6ZWDuXsd2/E6FFUBkgwCIaRH+9FK2pEsq/uMfiRFeRjFcYlG1h/OAU0jVPO7ojt/pEAIxEwIgppU+0UoRNOGtTkno9oXiuXoHxXCZL99UJsvmcx7wUqnoXkmXv+va19fa/T4PGdMiAGJaw29z/k8HRjAj4S+fE+91f0ExXGpbIsCQ6M8Mh4/IcPiIq19ja3c7DxrTIgBiWumTrAC6nRHMSHhTm3gXbRUjOJ+CuFRNxJBbVzDPMVP+rqs6fqfCFjBmQgDElMxkr2ROd1IIlwutbxff/Chbvxr48k1lWt/okgl0SH/N41q81s6+s9I73MebHlMiAGJKrP65X8Xaj8Qf7xHPtU9SDE1sXVum5es2Pf2SqnncdR2/02k9/wFveEyJAIgpMQDa3cqWdElgxTkx5t4ixuxVFEQTy+Z7Zd1S/baC+2sflhHfp1q9ZraBMR0CIKY0cobtX7fyVqcklBg9JO6JP0pBNLP5Jr1WAVPRva4d9zKdzv5zvNkxJQIgpsQIGHfyVqckvKlt9AdAbDONHxqqiRiyoVmP2YBDkRdd3/E7ldbzjILB1AiAmBJnAN3HCGYktL5djGBm9J9p/NDW5hv9rh8LMxw+IgNzDmj7jFu7P+CNjikRADEpwp87VW44Jd7q1Og3P6t/er8Xgu4eC5MJdGgd/sYQAjEVAiAmxfgX9wkl2sVXl7z4z6z+Yd1Sd24Dm55+6a99WKuO36l80neWNzomRQDEpFgBdJeyJV1StqTrN9/4rP5BRs8Cuq0jmPA3HqNgMBUCICaVIQC6hq8uebHjd4xx1X0UBiLivo7ggTkHtOz4nUobW8CYAgEQkxpJJimCC3irU1K54dS4XzPCy8QIL6M4EJHRVcBl872ueC2DV/xU247fqXAbCKZCAMSkho+9RREczghmpHLDqYsdvxd/ndU/XGbdEudvAw+Hj8jg7J/wMC/DMGhMhQAIuFR4U5t4IkPjf9FXJZ65N1McjLNuqc/RI2EygQ5JRffyIIEcEAAxAat/zhdKtF8c9zLuG37uzSK+KgqECVbGnbkNPOL7VPprH+YBToNVQEyGAIgJOP/nbIEV58Z1/F7KYPUPU7h1hfNGwpiefknVPE7HL5AHAiAmYASMc5Ut6ZKKtR9N/pu+KjHm3kKRMKlF1R6piThrG1jXO35zxQogJkMABFzCW52aOvyJcPYPM1q52DnNIKnoXkmHjvLQgDwRADHB8DF+qDqNEcxIeFPbhI7fcX+GAIgZLKtzxjnA4fARxr3k4Og5VgAxEQEQcLhswp+IiDF7FcXCtJzQCJIpf5eOX8ACBEBMMHLmE4rgIBVrP5q04/dSxuxVdP8iKyqHwEygQ/prHuch5eiTvnMUARMQADFB5nQnRXCI8ptOT9nxeymj6v+gWMiKqtvApqdfBubupeM3D519ZykCJiAAAg5VtqRLgjdmF9bZ/kW2FlWr+a+F/tqH6fgFLEQAxDiMgHEGb3VKQon2rP88ARDZUvFeYMa9FK61+wOKgHEIgBjHTPZSBNW/aSNDEt7UlvWfN8LLKBpyolIIHIq8SMevBXqH+igCxiEAAg5iBDNSueHUjB2/4/5OJQEQuVFlGzgdOioDcw7wQIAiIABiHK6BU1toffuMHb8TBOdTOOSkepb9N4JkAh2Me7FQ7zArgBiPAIhxOAOorlCiXfzxnpz/Huf/kCu7VwC549d6rec/oAgYhwAIOEDZkq6sxr1MqnwBBUROFtoYAE1Pv/TXPiwjvk95EEAREQABxfnqkjl1/F7OYAsYOaoM2rcFPDDnAB2/QAkQAAGFeatTUrnhVN5/n/CHfNnRCTx4xU/p+AVKhACIccw+mkBUYQQzElrfnlPH7wRs/8IhhsNHZHD2TygEUCIEQIyTPkETiCrCm9py7/gFLFITKd02cCbQwbiXIjt67jhFwDgEQEBBoUS7JeGPO4CRr+oSBcAR36fSX/swHb9AiREAAcUEVpzLv+MXcBDGvQD2IQACCvHHe6Ri7UcUAlrgjl/APgRAQBHe6pSE1rdTCCihMlDcLeCBOQckHTpKoQGbEAABBeRzxy9QTMW8DWQ4fESGIi9SZMBGBEDAZkYwI+FNbeKJDFEMuB53/AJqIAACNqtY+xHjXqCFTKBD+msfphCAAgiAgI3KbzpNxy+UlBy09uOZnn4ZmLuXjl9AEQRAwCZlS7okeGMnhYCSTpyx9jxqquZxOn4BhRAAARt4q1OMe4E2UtG9ki5/l0IACiEAAqX+posMSXhTGx2/0MJw+IgMh49QCEAxBECghEo+7mWAuYKwTzp0lI5fQFEEQKCEQuvbS9rxaxIAkadjHSMF/X3GvQBqIwBi/BuispIiFEnF2o/EH++hEHA97vhVT9gfoggYhwCIcbwL4xShCMqWdElgxbmSf17z/MsUH3k5053/CmB/7cMy4vuUIirkmqoFFAHjEACBIvNWpySUYCsWznK6x8zr76Wiexn3AjgAARAoIm91SsKb2mz9GlgFRK5OnMlv9W8o8iIdv4BDEACBIjGCGQmtb7d93AuNIMjVmTxW/4bDR2RgzgGKBzgEARAoksoNp9S44zf1AQ8DOcn1FpBMoIPwBzgMARDjeKtjFMECoUS7+OqSSnwtZvcrPBDk5GQOW8Cmp1/6ax+m41dxtaG5FAHjEAAxjreGAFiosiVdUrakS5mvx+w9xkNBTrINgIQ/54iFohQB4xAAAQv54z3qdfymuzkHiKyd7jGz7gAemHOAjl/AoQiAgEW81SkJrVczaNEJjGxlu/o3MOcAHb+AgxEAMf4NUV1LEfJQ8jt+c0UARJaOdcz8Hh4OH5GhyIsUy0E4A4jLEQAxDmcA8xPe1CaeyJCyXx8rgMjWa++lp/197vh1Js4A4nIEQKBAoUS7GuNepmEOtNMMghnNdP5vxPep9Nc+TKEAFyAAYgKjMkwRshRYcU6pjt/pmN2sAmJ6063+mZ5+SdU8TsevA4X9IYqACQiAmMC3ME4RslC2pEsq1n7kmK/X7NzPQ8O0pjv/l6p5nI5fh4rPXkARMAEBEMiDtzrlqPAnMjoPkHEwmEpywJTXWicPgKnoXkmXv0uRABchAGICGkGmZwQzEt7Upm7H7zTMc8/yADGpqcLfcPgI414cjgYQTIYAiIlvCq6Dm5KTw58I28CY2t+9OTzh1zLl79Lx6wKxCkbAYCICIJCDirUfKd/xOx2z9xjdwJjgdI8pJy4bAJ0JdEh/zeMUB3ApAiAmKFt2HUWYRMXajxzT8Tsd88Pv8TAxzuWrf6anXwbm7qXj1yWWRxsoAiYgAAJZKFvSJYEV51zxWkbOPSeS7uah4qIX3h4//qW/9mE6fgGXIwBiAsbAjOetTkko4aLu2XS3jHAWEJ954e20JAd+M/w5Fd1L+HMZxsBgMgRATMAg6Eu+QSJDEt7U5rrXZXawDYxR+1/9zRWGQ5EX6fh1IQZBYzIEQEyKVcDRjt/KDacc2/E7HXOgnVVAyGutmYtXv6VDR2VgzgGK4jLxqgUUAZMiAGJSrAKKhNarf8dvIcxTu3ija+6Zz5o/MoEOxr24VLiM1T9MjgCISfk17wQOJdrFH+9x9WtkFVBvx9ozcqw9I6anX/prH6bj16Wum0sHMCZHAMTkb4xQpbavvWxJlyvGvWSDVUB9ffvQIOEP0BgBEJPyLdLzDKCvLumujt8ZmAPtMsJcQO288HZaTveYMjDnAB2/LscMQEyFAIjJ3xjVtdq9Zm91Sio3nNLudY+c2s1cQI0kB0zZ/+qQDF7xUzp+NVAb4ho4TI4AiEl5a/S6D9gIZiS0vt2VHb8zSnePhkBo4Zk3h+XDkVdlcPZPKIYGYqEoRcCkCICYkk6jYMKb2lzd8TuTkQ+/xx3BGjjdY8pfvnGScS+aYAQMpkMAxJR0WQUMJdw97iVbI/96N296l/u/nv+Ypg+N1LL6h2kQADElrwYrgIEV57Tp+J2J2XtMRugKdq0fv9Ujrw9+l/CnkWtYAcQ0CICYUpnLZwH64z1SsfYjHvQlRt7fzVawC504MyI/fO8JOn41QwcwpkMAxNRvDhd3AnurUxJar8+4l1yM/OvddAW7zK7X/1K6vW9RCM3QAYzpEAAxJW9NzJVXwrn5jl8rmL3HZKT1GxTCJR7/xT/Ivw7+TwqhITqAMR0CIKbltk5gI5iR8KY28USGeLjTGOnczzVxLvDyh+/I/9v+BIXQENu/mAkBENNy240gFWs/ouM3SyOt3+A8oIO1dn8gD735CIXQVLyqniJgWgRATMt39TWueS3lN52m4zcX6W4ZeXsD5wEdqHe4Tx765/9Heof7KIam4lXzKQKmRQDEtNyyAli2pEuCN3byQHNkDrRL5uhaQqCTpLvlv770J9La/QG10Fh8NiuAmB4BENPyLYw7vhHEW51i3EsBaApxloeOHpCjXbzfdRb2h7gFBDMiAGJGTm4E8USGJLypjY7fAo107peRX3NTiOr+x/9+SA69/48UQnPx2QsoAmZEAMSM/A4dCM24F2sRAtX20r/8n7Kr9VcUAnLdXDqAMTMCIGbk1BtBQuu549dqhEA1vfv2A/IQ4Q+fYQQMsuGjBJjxTeLALeCKtR+JP97DwyuCsfmAnmufpBgK6Dn+FdnW2iFJs4JiQETYAkZ2WAHEjIzKsKNCYNmSLgmsOMeDKyJWAhV5Dr++W/743ZPSmSH8YVS8aoGE/SEKgRkRAJEV/79Z7oiv01eXlFCCO35LYaRzv2Tevo0RMXZId0vm7dtkV9uvpC0doR64aHm0kSIgKwRAZMW/VP1zgN7qlFRuOMXDKiHz3LPMCSy1dLdkjq6Vfe3vyeGBOuqBca6LXksRkBUCILKieiOIEcxIaH07Hb82MHuPSfq1a7g2roS1PvTpednXv5iCYAIaQJAtAiCyovo5wMoNp+j4tVO6WzJvXC8jH36PWhTJyIffk8wb10vbgCktSbb5MBHn/5ALAiCypuo5wFCiXXx1SR6QAkZav8G5QKt9dt5vpPUbkjT9srVnpSRNP3XBBJz/Qy4IgMiaiucAy5Z0SdmSLh6OQsxzz0rmn68X8/zLFKPQWp5/ebSW554l/GFGnP9DLgiAyFpg5Sqlvh5/vIeOX0WZA+2SObp29A5hVgNzl+4eXU09ulbMgdH3+O7eJjp+Ma3V85opArJGAEROVAmB3uqUhNYT/lQ38uH3WA3M0diq36XnKVv6GuWVoRjFwZQIf8gVARA5UWEbmDt+nWVsNTDz9m0XV7MwRZ3evm3cqp+IyOHBOjmYWkiBMC22f5ErAiByUrZyte1fQ3hTm3giQzwMhzHPPSuZ1xbJyKldbAtfKt0tI6d2XTzrd6m2dET29DZRI8yIFUDkigCInHhrYuKtsW8rKpRoZ9yLw428v1vSr11DEPws+KVfu0ZG3t89oRadIxWytWclbxjMKBaKSiwUpRDICQEQObNrFbD8ptN0/LpFulvfIDhD8BMRSZp+2X6hmY5fZIXVP+SDAIicBX9/fck/Z9mSLgne2Enx3ebSIPjru119RtAcaJeRX989bfAbs/1CMx2/yNqqeSsoAnLmowTI+U2zMC5GZVjMZG9JPp+3OiUVaz+i8G6W7paRzv0infvFmL1KjNhm8cQ2u+KljXTuF7Nzf9ad0HuSTXJ0eA7vCWQl7A9x/RvyQgBEXgIrV8nAC4eK/nmMYEbCm9ro+NWIef5lMc+/LCOt3xDP3JvFmHuzGHNvcdZrOPesmOeek5Fzz+W0vX14sE4OD9TxJkDWVl3J9i/yQwBEXsp+p/gBkPCnuUtWBcVXJZ65N4vMXjX6v74q9b7Wc8+JnH8559A35ujwHDp+kTO2f5EvwzRNkzIgH5/+4e8VdRs4lGin6QOTMsLLxKhaJRJeNrplHJxf0s9vDrSL9P6LmOdfEbP7ZTF7jxX08drSEa55Q87C/pD8w61/RSGQF1YAkbdibgNXrP2I8Icpmb3HxocuX9VoKKxcJlI+f/R/P/u1Qj+PpLvFTB4TSbWLmTx28deskjT9sr2Xjl/kju1fFIIAiLwVaxu4bEmXBFaco8DIXrr74tnByRjhZdlvG6e7C17Ry8XWnpXSmangGSJnbP+iEARA5C2wcpV4a2KSOW3deBZvdUpCCa4Lg7VKGehysSfZxLgX5CXsDzH/DwVhDiAKYuVQaE9kSMKb2igqtHAwtZCOX+QtUb+GIqAgBEAUxKqh0EYwI5UbTtHxCy28MhSTlr5GCoG8JepXUwQUhACIgvgWxi25G7hywynu+IUW2tIR2c24FxQgFopKvGoBhUBBCIAoWPl/+GJBfz+UaBdfXZJCwvWSpp9xLyjYxvgfUAQUjACIghVyDrBsSRfjXqAFwh+sQvMHrEAARMG8NTEJrFyV89/z1SXp+IU2Wvoa6fhFwVbPa5ZYKEohUDACICwR+P1ETn/eW52Syg2nKBy08GT/5+j4hSXW16+mCLAEARCWGJsJmA0jmJHQ+nY6fqGFw4N1sq9/MYVAwZj9BysRAGGZbFcBw5va6PiFFtrSEdlDxy8swuw/WIkACMsEswiAoUQ74Q9a6BypkK09KykELEP3L6xEAIRlZmoGCaw4R8cvtJA0/bL9QjMdv7AMzR+wGgEQliq/dfKZgP54j1Ss/YgCQQu7e7njF9ai+QNWIwDCUv5lyyc0g3irUxJaz7gX6KGlr1FeGYpRCFgmForS/AHLEQBhuYr/uOXi/zeCGQlvaqPjF1o4PFgnB1MLKQQsxdk/FAMBEJYLrFwlRmWY8AetHB2eQ8cvLBf2h+j+RVEQAGE5ozIs5bd+USrWfkTHL7TQlo7I9gts0cF6ifo1EvaHKAQsRwBEUVTc8ft0/EILSdMvu5NNdPyiKNj+RbEQAFEURnC+eGKbKQRcb/uFZjp+URSJ+jWMfkHREABRNMbVOygCXG1PskmODs+hECiKjfH1FAFFQwBE0RjB+WLMXkUh4EoHUwvl8EAdhUBRLI82SLxqAYVA0RAAUdw3WP2fUgS4zitDMWnpa6QQKJotDXdQBBQVARBFZcxexSogXKUtHZHdjHtBES2PNsjyaAOFQFERAFH8NxmrgHCJpOmX7b3c8YviYvUPpUAARNGxCgg3SJp+2dqzUjozFRQDRcPqH0qFAIjSvNFYBYTDtfQ1Mu4FRcfqH0qFAIiSYBUQTvZk/+fo+EXRsfqHUiIAonRvNlYB4UCHB+tkX/9iCoGiY/UPpUQARMmwCginaUtHpCXJuBcUH6t/KDUCIEr7hmMVEA4x1vRBxy9KgdU/lBoBECXFKiCcgPCHUmL1D3YgAKL0b7prHqUIUNru3iY6flEyrP7BDgRAlJwRXiae2GYKASW19DXKK0MxCoGSSNSvYfUPtiAAwhbG1TsoApRzeLBODqYWUgiUzD0Nt1ME2IIACFsYwfk0hEApbemI7OGOX5TQxnhCYqEohYAtCICw781Xd5+Ir4pCwHZt6Yhs7VlJIVAyYX9ItjSy+gf7EABhH1+VeK5mFRD2Spp+2Z1souMXJbWl8XYJ+0MUArYhAMLeN+BV94kRnE8hYJvtF5rp+EVJxUJR2RhPUAjYigAI+9+E1z5JEWCLPckmOTo8h0KgpB5ouosiwHYEQNiO4dCww+HBOjk8UEchUFLLow2yel4zhYDtCIBQ443IKiBK6OjwHDp+YYudzfdSBCiBAAglMBYGpdKWjsj2C6zAoPQY+wKVEAChzpuRsTAosqTpl+29zXT8ouQY+wLVEAChDl+VeOLcE4zi2dqzUjozFRQCJfdA012MfYFSCIBQ6w0Z20xDCIpiT7KJcS+wxfJogyTq11AIKIUACPXelDSEwGIHUwvp+IVtaPyAigiAUA4NIbDS4cE6aelrpBCwxZaGO2j8gJIIgFDzjVnHDSEoXFs6Ii1Jwh/sEQtFZePi9RQCSiIAQk2+KraCUZCk6ZetPSvp+IVtdjbfS+MHlEUAhLKM2avEmHsLhUDOCH+w2+p5zbI82kAhoCwCIJTmvXYfswGRs5a+Rjp+YZuwPyQ7bqDxA2ojAEJtvqrREAhk6cn+z9HxC1vtuIGtX6iPAAjlGXNvYTYgsnJ4sE729S+mELDN8miDrJ7HVYNQHwEQznijXvskW8GYVls6Int6mygEbBP2h5j5B8cgAMIRjOB88VzNbEBMrnOkQrb2rKQQsNWWxtuZ+QfHIADCOW/Wq+5jKxgTJE2/bL/QTMcvbLU82iAb4wkKAccgAMJZb1i2gnGZ3b3c8Qt7sfULJyIAwlHYCsal9iSb5JWhGIWArdj6hRMRAOG8Ny1bwZDRjl/GvcBubP3CqQiAcOYbl61grR0dnkPHL2zH1i+cjAAIRzKC8xkQram2dES2X2DOGuy344Z72fqFYxEA4VjG3Fu4K1gzSdMvu5NNdPzCdqvnNTPwGY5mmKZpUgY4Vrpb0q9dI5LuphYa2Ny9mo5f2C7sD8mzX3iC697gaKwAwtl8VeJd+mPqoIE9Sca9QA2P3LiN8AfHIwDC8YzZq8Rz1X0UwsUOphbS8QslbIwnZHm0gULA8QiAcMcb+eo/FSO8jEK40CtDMWnpa6QQsF28aoFsabydQsAVCIBwB1+VeD7/JHVwmbZ0RHYz7gWK2HnDV9n6hWsQAOEaRniZeOKPUgiXSJp+2d7LHb9QwwNNd0m8agGFgGsQAOGuNzS3hLhC0vTL1p6V0pmpoBiwHbd9wI0IgHAd79Ifc0uIw7X0NdLxCyWE/SF55MZtFAKuQwCE+zAaxtGe7P8cHb9QBiNf4FYEQLgSo2Gc6fBgnezrX0whoARGvsDNCIBw75s7/iijYRykLR2RliTjXqCGeNUCeaDpLgoB1yIAwt1v8KXPcB7QATpHKmRrz0o6fqGEsD8k3+HcH1yOAAhXM4LzxXvtPgqhsKTpl+0XGPcCdey44V6JhaIUAq5GAITrGXNv4Tygwnb3cscv1LExnpDV85opBFyPAAg93uicB1RSS1+jvDIUoxBQAuf+oBMCIPR5s3/+Sc4DKuTwYJ0cTC2kEFAC5/6gGwIgtGGEl3EeUBFt6Yjs4Y5fKIRzf9ANARBa4Tyg/drSEdnas5JCQBmc+4OOCIDQ703PeUDbJE2/7E420fELZXDuD7oiAELPNz7zAW2x/UIzHb9QBuf+oDMCILTEfMDS25NskqPDcygElMG5P+iMAAhtcR6wdA4P1snhgToKAWVsabiDc3/QGgEQen8DxB8VY/YqClFErwzF6PiFUpZHG+SexjsoBLRmmKZpUgZoLd0t6deuEUl3UwuLjXX80vQBVYT9IXn2C09I2B+iGNAaK4CAr0q81/2MOlgsafpley93/EItP/jdhwh/gBAAAREZHRLtiT9KISy0tWeldGYqKASU8UDTXRKvWkAhACEAAr/5ZrjqPvHENlMIC+xJNjHuBUpJ1K+RjfEEhQA+QwAELv2GYEh0wQ6mFtLxC6Uw7BmYiAAIXMpXJZ7PP8mQ6DwdHqyTlr5GCgFlhP0h2XnDVzn3B1yGAAhcxggvY0h0HtrSEWlJEv6glh033Mu5P2ASBEBgEgyJzk3S9DPuBcph2DMwNQIgMNU3B0Ois0L4g4oY9gxMjwAITMO79MdiBOdTiGm09DXS8QulxEJReeTGbRQCmAYBEJiOr0o8S5+hDlNo6Wuk4xdKCftD8p0bt9H0AcyAAAjMwAgvE8+1T1KIyxwerJODqYUUAkph2DOQHQIgkM03SmwzQ6Iv0ZaOyJ7eJgoBpSTq10iifg2FALJgmKZpUgYgO5k3rhez95jWNegcqZDN51fT9AGlxKsWyIF136EQQJZYAQRy4L3uZ1oPiU6aftl+oZnwB6WE/SH5we8+RCGAHBAAgVz4qkZDoKa2X2im4xfK+cHvPkTTB5AjAiCQI12bQvYkm+To8BzeAFDKzmZu+gDyQQAE8vnG0awp5PBgHeNeoByaPoD80QQCFECHppCjw3Pk3p6VPGwohaYPoDCsAAKFfAMtfcbVTSFt6Yhsv8BdqlALTR9A4QiAQAGM4HzxLv2xK19b0vTL7mQTHb9QDk0fQOEIgECBjNmrxBN/1HWva2vPSjp+oRyaPgBrEAABK76RrrrPVU0he5JNhD8oh6YPwDoEQMCqb6b4o2KElzn+dRxMLaTjF8qJVy2Qnc33UgjAIgRAwCq+Ksc3hbwyFJOWvkaeJZQS9ofkOzduoxCAhQiAgIWc3BTSlo7I7t4mHiKU88iN2yQWilIIwEIEQMBiTmwKSZp+2dqzko5fKOeBprtkebSBQgAWIwACxfjGclBTCOEPqkrUr5GN8QSFAIqAAAgU65vLIU0hLX2NdPxCOfGqBfJA010UAigSAiBQLA5oCnmy/3N0/EI5Y00fDHsGiocACBSRyk0hhwfrZF//Yh4SlEPTB1B8BECgyFRsCmlLR6QlybgXqIemD6A0CIBAKb7RFGoK6RypoOkDSqLpAygdAiBQqm82BZpCkqZftl9oJvxBOTR9AKVFAARKxVclns8/aWtTyO5e7viFemj6AEqPAAiUkBFeJt5r99nyuVv6GuWVoRgPAcqh6QMoPQIgUGLG3FvEU/+nJf2chwfr5GBqIcWHcrY03EHTB2ADAiBgxzfe1TvEmHtLST7X0eE5soc7fqGg1fOa5Z7GOygEYAMCIGAT77X7it4U0paOyPYLzRQbyolXLZAdN9xLIQCbEAABuxS5KSRp+mV3somOXygn7A/Jzhu+StMHYCMCIGAjI7ysaEOit19opuMXStpxw70Sr1pAIQAbEQABu78JY5vFc9V9ln7MPckmOTo8h+JCORvjCVk9j2MJgN0IgIAK34jxR8WYvcqSj3V4sE4OD9RRVChnebSBYc+AIgiAgCK8S39c8HnAV4ZidPxCSbFQVB65cRuFABRBAARU4asS73U/y/uvt6UjspvwB0Vx0wegFgIgoJB8m0KSpl+293LHL9S0s5mmD0A1BEBAtW/Kq+4TT2xzTn9na89K6cxUUDwoJ1G/RhL1aygEoBgCIKDiN2b80ayHRO9JNjHuBUqKVy2g6QNQFAEQUFGWQ6Kf7P8cHb9QUtgf4twfoDACIKAoI7xMvNfum/L3Dw/Wyb7+xRQKStpxw70SC0UpBKAoAiCgMGPuLZMOiW5LR6Ql2UiBoCSGPQPqM0zTNCkDoLbM0bVinn9ZREY7fv9D17+j4xdKWh5tkB+seYhCAIpjBRBwgLEh0UnTL1t7VhL+oKSwP8SwZ8AhCICAE/iqxLv0x9LS10jHL5T1CE0fgGMQAAGHMGavksWf30EhoKQtDXfI8mgDhQAcggAIOAiH66Gi1fOa5Z7GOygE4CAEQMBhGK8BlcRCUdlxw70UAnAYAiDgMGMDdgEVMOwZcCYCIOBAXLEFFTzQdJfEqxZQCMCBCICAQ3EeEHZaPa9ZNsYTFAJwKAIg4GCcB4QdOPcHOB8BEHAwzgPCDpz7A5yPAAg4HOcBUUqc+wPcgQAIuADnAVEKnPsD3IMACLgE5wFRTJz7A9yFAAi4BOcBUUw7m+/l3B/gIgRAwEU4D4hi4J5fwH0IgIDLbIwn+Jc1LLM82sA9v4ALGaZpmpQBcJfe4T655X9sld7hPoqBvIX9IXn2C0+w9Qu4ECuAgAuF/SF5hPOAKNCOGzj3B7gVARBwqeXRBkZ2IG+MFgLcjQAIuBhDe5EPmokA9yMAAi7HtV3IRdgfkp03fJVCAC5HAARcLhaKspqDrG1pvJ1VY0ADBEBAA4n6NZznwoy46g3QBwEQ0ARXxWE6YX+Iq94AjRAAAU2E/SHZ2cy/4DG5RzgrCmiFAAhohNEwmAy3xwD6IQACmmE0DC4Vr1ogWxpvpxCAZgiAgIYY84FL3wts/QL6IQACGmLQL0REtjTcwWowoCkCIKApzn3pbXm0Qe5pvINCAJoiAAIa29l8L9t/GqIjHAABENAYt4ToaUvj7cyEBDRHAAQ0xy0hemEUEAARAiAAGb0lhK1g92PrF8AYAiAArgHTBNcBAhhDAAQgIiKr5zWzFczzBaAJAiCAi9gKdidWeAFcjgAI4CKCgjsR7AFcjgAIYBy2CnmeANyPAAhgAlaM3IEVXQBTIQACmIDg4A4EeQBTIQACmBRbhzw/AO5FAAQwJVaQnIkVXAAzIQACmBJBwpm2NN5OcAcwLQIggGmxlegs3PULIBsEQAAzYivYGbjrF0C2CIAAZhT2h2RL4+0UQnFbGm/nrl8AWSEAAsjKxnhClkcbKISi4lUL2PoFkDUCIICssb2o8LO54asUAUDWCIAAshYLRWVLwx0UQjFbGu6QeNUCCgEgawRAADm5p5GwoZJYKCobF6+nEAByQgAEkLMHmv4TRVDEzmY6tAHkjgAIIGfLow2SqF9DIWy2el4zjTkA8kIABJCXB5ruYuXJRmF/SB5ouotCAMgLARBAXpgNaK8vxtcz8w9A3giAAPK2MZ6gIcQGsVBU7mmkGxtA/giAAApCQ0jpMY8RQKEIgAAKQkNIadH4AcAKBEAABbun4XYaQkqExg8AViAAAihYLBSVL8YZRlxsWxruoPEDgCUIgAAssXExXanFFPaHuPEDgGUIgAAsEfaH5J4GxsIUy5ZGttkBWIcACMAyifo1jIUpglgoKhvjCQoBwDIEQACWYixMMWp6F0UAYCkCIABLLY82MKbE4nquntdMIQBYigAIwHJbGrilgloCUBkBEIDlGA5tXR1ZTQVQDARAAEVBR3DhWP0DUCwEQABFEQtFWQUsAFe+ASgmAiCAomEVMH90/gIoJgIggKJhFTA/ifo13KoCoKgIgACKilVAagZAPQRAAEXFKmBuVs9rZvUPQNERAAEUHSta2ftifD1FAFB0BEAARccqYHaY+wegVAiAAEpiIytbM2LuH4BSIQACKIl41QJWt6bB6h+AUiIAAigZVrimlliwmiIAKBkCIICSWR5tkHjVAgpxGc5IAig1AiCAkuIs4ER0SQMoNQIggJLilovxwv6QrLqymUIAKCkCIICS47zbb3wxvl7C/hCFAFBSBEAAJbdxMdvAY75Qv5oiACg5AiCAkgv7QzQ9CNvhAOxDAARgC5pB2AoHYB8CIABb6D4YOhaKMvgZgG0IgABso/MKGKNfANiJAAjANon6NVp2wDL6BYDdCIAAbKVjM8iqK5sZ/QLAVgRAALbaGP8DDV8zDTAA7EUABGAr3Zoh4lULuA8ZgO0IgABsp1MzSKJen9cKQF0EQAC20+lMHAOwAaiAAAjAdrp0xa6eR/MHADUQAAEoQYdt4PX17n+NAJyBAAhACcujDa6+FzfsD8nqecz+A6AGAiAAZbh5FZCzfwBUQgAEoIwv1K927Wuj+xeASgiAAJQRC0VdOSPPra8LgHMRAAEoxY0rZTrNOQTgDARAAEpxY6OEm7e2ATgTARCAUtx2NVy8aoGru5sBOBMBEIBy3LRlSvMHABURAAEox023gjD7D4CKCIAAlOOWocls/wJQFQEQgJJWzVvh+NfA9i8AVREAASjJDdvAbP8CUBUBEICSwv6Qo7uB2f4FoDICIABlOXkbmO1fACojAAJQlpO3UJdHG3mAAJRFAASgLKfeocvdvwBURwAEoDQnbqXS/AFAdQRAAEpzYpji/B8A1REAASjNadupbP8CcAICIADlOamhgu1fAE5AAASgPCdtqV4XvZYHBkB5BEAAynPKUGW33GEMwP0IgAAcwQnByg3X1wHQAwEQgCM4YRvYyTeXANALARCAI6i+Dcz2LwAnIQACcAyVAxbbvwCchAAIwDFU3gZm+xeAkxAAATiGqtvAbP8CcBoCIABHUTFosf0LwGkIgAAcZWP8DxT8mtbzYAA4CgEQgKOodtcud/8CcCICIADHUWnFTcUVSQCYCQEQgOOsurJZwv6QEl9Lon4NDwSA4xAAAThO2B9SIngl6tcoE0QBIBcEQACOpMLW6z0Nt/MgADgSARCAI8VCUVtXAVfPa1b6ajoAmA4BEIBj2bkC90DTXTwAAI5FAATgWLFQVLY03FHyz5uoX8PqHwBHIwACcLSNi9eXNIyF/SFW/wA4HgEQgKOF/SHZ2XxvyT7fjhvupfMXgOMRAAE43vJoQ0m2gjfGE0reRQwAuSIAAnCFexrvKGpXcKJ+DVu/AFzDME3TpAwA3OK7//tH8lTrIUs/ZqJ+TUm3mQGg2AiAAFznpY/fkF3//OfSO9xX0McJ+0OypfF22RhPUFQArkIABOBKvcN98tR7h+VvWw/nHATD/pB8Mb5eNi5eT8MHAFciAAJwvZc+fkNaz38gR88dl0/6zkln39lxvx8LRaU2NFfiVfVyXfRaGj0AuB4BEAAAQDN0AQMAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKAZAiAAAIBmCIAAAACaIQACAABohgAIAACgGQIgAACAZgiAAAAAmiEAAgAAaIYACAAAoBkCIAAAgGYIgAAAAJohAAIAAGiGAAgAAKCZ/x+3i1u9Ft6QCwAAABJ0RVh0RVhJRjpPcmllbnRhdGlvbgAxhFjs7wAAAABJRU5ErkJggg==';
  }

  // نمایش پیام
  public openSnackBar(message: string, action: string, inVePosition: any, inHoPosition: any, inClass: string, inDir: any) {
    if (inClass === 'error-snackbar') {
      this.loaderService.isLoading.next(false);
      window.parent.postMessage({statuse: false, kind: 'loader'}, window.location.href);
    }
    this.snackBar.open(message, action, {
      duration: 3000,
      direction: inDir,
      verticalPosition: inVePosition,
      horizontalPosition: inHoPosition,
      panelClass: inClass
    });
  }
  // تشخیص راست چین یا چپ چین
  // isLeftRight(inLang: any) {
  //   if (inLang === 'fa') {
  //     return 'rtl';
  //   }
  //   if (inLang === 'en') {
  //     return 'ltr';
  //   }
  //   if (inLang === 'ar') {
  //     return 'rtl';
  //   }
  // }
  // kb to mg
  niceBytes(x: any, lang: any) {
    if (x == null || x === '' || x === 0 || x === '0') {
      return '';
    }
    let units : any | undefined;
    if (lang === 'fa') {
      units = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    }
    if (lang === 'en') {
      units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    }
    let l;
    l = 0;
    let n;
    n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
  //
  base64ArrayBuffer(arrayBuffer: any) {
    let base64 = '';
    let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let bytes = new Uint8Array(arrayBuffer);
    let byteLength = bytes.byteLength;
    let byteRemainder = byteLength % 3;
    let mainLength = byteLength - byteRemainder;
    let a, b, c, d;
    let chunk;
    for (var i = 0; i < mainLength; i = i + 3) {
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63;               // 63       = 2^6 - 1
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];
      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
      b = (chunk & 3) << 4; // 3   = 2^2 - 1
      base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
      c = (chunk & 15) << 2; // 15    = 2^4 - 1
      base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
  }
  //
   stringToUint(string: any) {
    let myString = btoa(unescape(encodeURIComponent(string))),
      charList = myString.split(''),
      uintArray = [];
    for (var i = 0; i < charList.length; i++) {
      uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
  }

   uintToString(uintArray: any) {
    let encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent(escape(atob(encodedString)));
    return decodedString;
  }
  //
   getBrowserName() {
    var name = 'Unknown';
    if(navigator.userAgent.indexOf("MSIE")!=-1){
      name = 'MSIE';
    }
    else if(navigator.userAgent.indexOf("Firefox")!=-1){
      name = 'Firefox';
    }
    else if(navigator.userAgent.indexOf("Opera")!=-1){
      name = 'Opera';
    }
    else if (navigator.userAgent.indexOf('Safari') == -1 && navigator.userAgent.indexOf('Chrome') != -1){
      name = 'Chrome';
    }
    else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
      name = 'Safari';
    }
    return name;
  }
}
