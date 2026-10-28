import {DialogComponent} from '../Component/dialog/dialog.component';
import {EmpFindComponent} from '../Component/emp-find/emp-find.component';
import {StdFindComponent} from '../Component/std-find/std-find.component';
import {TeachFindComponent} from '../Component/teach-find/teach-find.component';

import {Injectable} from '@angular/core';
import {SpecialUserFindComponent} from '../Component/special-user-find/special-user-find.component';
import {GeneralDialogComponent} from '../Component/general-dialog/general-dialog.component';
import {MatDialog} from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class ModualService {
  public animal: any;
  constructor(public dialog: MatDialog) {
  }
  // دیالوگ گرفتن تائید از کاربر
  openDialog = (title: string, okBtn: string, notOkBtn: string, question: string, dir: string) => {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '220px',
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Question: question, Dir: dir, Ischeck: false, CheckTitle: ''}
    });
    return dialogRef.afterClosed();
  }

  // دیالوگ گرفتن تائید از کاربر
  openDialogGeneral = () => {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '900px'
    });
    return dialogRef.afterClosed();
  }
  // دیالوگ جستجوی کارمندان
  openDialogEmpFind = (title: string, okBtn: string, notOkBtn: string, inAut: string, inWidth: string, inHeight: string, dir: string) => {
    debugger
    const dialogRef = this.dialog.open(EmpFindComponent, {
      width: inWidth, height: inHeight,
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Dir: dir, Ischeck: false, CheckTitle: '', Aut: inAut}
    });
    return dialogRef.afterClosed();
  }
  // دیالوگ جستجوی دانشجویان
  openDialogStdFind = (title: string, okBtn: string, notOkBtn: string, inAut: string, inWidth: string, inHeight: string, dir: string) => {
    const dialogRef = this.dialog.open(StdFindComponent, {
      width: inWidth, height: inHeight,
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Dir: dir, Ischeck: false, CheckTitle: '', Aut: inAut}
    });
    return dialogRef.afterClosed();
  }
  // دیالوگ جستجوی استاد
  openDialogTeachFind = (title: string, okBtn: string, notOkBtn: string, inAut: string, inWidth: string, inHeight: string, dir: string) => {
    const dialogRef = this.dialog.open(TeachFindComponent, {
      width: inWidth, height: inHeight,
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Dir: dir, Ischeck: false, CheckTitle: '', Aut: inAut}
    });
    return dialogRef.afterClosed();
  }
  // دیالوگ جستجوی کاربر خاص
  // tslint:disable-next-line:max-line-length
  openDialogSpecialUserFind = (title: string, okBtn: string, notOkBtn: string, inAut: string, inWidth: string, inHeight: string, dir: string) => {
    const dialogRef = this.dialog.open(SpecialUserFindComponent, {
      width: inWidth, height: inHeight,
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Dir: dir, Ischeck: false, CheckTitle: '', Aut: inAut}
    });
    return dialogRef.afterClosed();
  }
  //
  openDialog2 = (title: string, okBtn: string, notOkBtn: string, question: string, dir: string, isCheck: boolean, checkTitle: string) => {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '220px',
      data: {Title: title, Ok_Btn: okBtn, NotOk_Btn: notOkBtn, Question: question, Dir: dir, Ischeck: isCheck, CheckTitle: checkTitle}
    });
    return dialogRef.afterClosed();
  }
}


