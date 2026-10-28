import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogData} from '../../DialogData';
// import {GridOptions} from 'ag-grid-community';
// import {AgGridNg2} from 'ag-grid-angular';
import {EmpFindService} from './emp-find.service';
import {GeneralService} from '../../Services/general.service';
import {HttpErrorManageService} from '../../Services/http-error-manage.service';
import {debounceTime, distinctUntilChanged, filter, map, takeUntil} from 'rxjs/operators';
import {fromEvent, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-emp-find',
  templateUrl: './emp-find.component.html',
  styleUrls: ['./emp-find.component.css']
})
export class EmpFindComponent implements OnInit , AfterViewInit , OnDestroy {
  isCheck = false;
  public rowData : any[] = [];
  public columnDefs: any;
  rowSelection: any;
  overlayLoadingTemplate = '.';
  gridApi: any;
  gridColumnApi: any;
  public getRowNodeId: any;
  public fromRecordtemp = 1;
  public toRecordtemp = 30;
  IsSearch = false;
  Seraching = false;
  public JsonOutput = {
    fromRecord: 1
    , toRecord: 30
    , search: ''
  };
  innerheight: any;
  @ViewChild('SearchInput', {static: true}) SearchInput!: ElementRef<HTMLInputElement>;
  constructor(
    private empFindService: EmpFindService,
    private generalService: GeneralService,
    private httpErrorManageService: HttpErrorManageService,
    public dialogRef: MatDialogRef<EmpFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.empFindService.Authorization = data.Aut;
    // this.getRowNodeId = (data) => {
    //   return data.idEmp2;
    // };
    // this.gridOptions = <GridOptions> {
    //   onGridReady: (params) => {
    //     this.gridApi = params.api;
    //     this.gridColumnApi = params.columnApi;
    //   },
    //   rowHeight: 35, // recommended 48,
    //   animateRows: true,
    //   // تغییر رنگ سطر های زوج
    //   getRowStyle: (params) => {
    //     if (params.node.rowIndex % 2 === 1) {
    //       return {background: '#f2efef'};
    //     }
    //   },
    // };
    //
    this.OnSerach(false);
  }
  // تنظیمات گرید
  // GetGridSetting(inmode: string) {
  //   const remInPixel = parseFloat(getComputedStyle(document.documentElement).fontSize);
  //   const convertRemToPixel = (rem) => rem * remInPixel;
  //   this.columnDefs = [
  //     {
  //       headerName: 'ردیف'
  //       , field: 'rownum'
  //       , width: convertRemToPixel(5)
  //       , lockPosition: true
  //     },
  //     {
  //       headerName: 'کدپرسنلی'
  //       , field: 'eno'
  //       , width: convertRemToPixel(10)
  //       , lockPosition: true
  //     },
  //     {
  //       headerName: 'نام و نام خانوادگی'
  //       , field: 'myFamily'
  //       , width: convertRemToPixel(35)
  //       , lockPosition: true
  //     },
  //     {
  //       headerName: 'واحد سازمانی'
  //       , field: 'organizationalTitle'
  //       , width: convertRemToPixel(35)
  //       , lockPosition: true
  //     }
  //   ];
  //   this.rowSelection = 'multiple';
  // }
  //
  onCellClicked = (eventt: any) => {
    this.onConfirm(eventt.data.idEmp2);
  }
  // جستجو
  OnSerach = (isNotRefresh: boolean | null) => {
    // تمام شدن سرچ قبلی
    if (this.IsSearch === false) {
      this.IsSearch = true;
      window.parent.postMessage({statuse: true, kind: 'loader'}, window.location.href);
      // زمانی که دکمه سرچ رو زد از اول سرچ کنه
      if (isNotRefresh === false || typeof isNotRefresh === 'undefined') {
        this.fromRecordtemp = 1;
        this.toRecordtemp = 30;
      }
      this.JsonOutput.fromRecord = this.fromRecordtemp;
      this.JsonOutput.toRecord = 30;
      const MyJsonSerach = Object.assign(this.JsonOutput);
      this.empFindService.EmpFindList1(MyJsonSerach).subscribe((response: any) => {
          window.parent.postMessage({statuse: false, kind: 'loader'}, window.location.href);
          const Json = JSON.parse(JSON.stringify(response));
          if (Json !== null) {
            if (Json.hasOwnProperty('outNumber')) {
              this.generalService.openSnackBar(Json.outMessage, '', 'top', 'left', 'error-snackbar', this.data.Dir);
              return;
            }
            if (this.rowData && isNotRefresh === true) {
              //  const res = this.gridOptions.api.updateRowData({add: Json.list});
              // this.printResult(res);
              Json.list.forEach((ob: any, i: number) => {
                this.rowData.push(ob);
              });
            } else {
              this.rowData = Json.list;
              setTimeout(() => {
                if (Json.list[0].length !== 0 && Json.list[0] !== undefined) {
                  //  this.gridOptions.api.getRowNode(Json.list[0].idEmp2).setSelected(true);
                }
              }, 100);
            }
            this.IsSearch = false;
            this.Seraching = false;
          }
        }, error => {
          this.httpErrorManageService.Http_Control(error);
        },
      );
    }
  }
  // Featch More
  ongridscroll = (event: any) => {
    // تموم شدن سرچ قبلی
    if (this.IsSearch === false) {
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        this.fromRecordtemp = this.toRecordtemp + 1;
        this.toRecordtemp = this.toRecordtemp + 30;
        this.OnSerach(true);
      }
    }
  }
  //
  // printResult(res) {
  //   if (res.add) {
  //     res.add.forEach((rowNode) => {
  //     });
  //   }
  //   if (res.remove) {
  //     res.remove.forEach((rowNode) => {
  //     });
  //   }
  //   if (res.update) {
  //     res.update.forEach((rowNode) => {
  //     });
  //   }
  // }
  //
  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   //
  //   // this.gridApi.sizeColumnsToFit();
  // }
  // انتخاب
  onConfirm(inIdEmp2: any): void {
    this.dialogRef.close({idEmp2: inIdEmp2});
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  // ngAfterViewInit(): void {
  //   fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
  //     map((event: any) => {
  //       return event.target.value;
  //     })
  //     // , filter(res => res.length > 2)
  //     , debounceTime(600)
  //     , distinctUntilChanged()
  //   ).subscribe((text: string) => {
  //       this.Seraching = true;
  //       this.OnSerach(false);
  //     },
  //   );
  // }
  private destroy$ = new Subject<void>();
   ngAfterViewInit(): void {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(600),
      distinctUntilChanged(),
      takeUntil(this.destroy$) 
    ).subscribe(() => {
      this.Seraching = true;
      this.OnSerach(false);
    });
  }
  ngOnInit(): void {
    this.innerheight = window.innerHeight - 340;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
