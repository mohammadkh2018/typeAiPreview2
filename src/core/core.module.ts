import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
// import {DialogComponent} from './Component/dialog/dialog.component';
import {DigitCodeComponent} from './Component/digit-code/digit-code.component';
import {GeneralService} from './Services/general.service';
import {EmpFindComponent} from './Component/emp-find/emp-find.component';
import {StdFindComponent} from './Component/std-find/std-find.component';
import {SpecialUserFindComponent} from './Component/special-user-find/special-user-find.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {SafeHtmlPipe} from './Pipe/safe-html.pipe';
import {AuthInterceptorService} from './Services/auth-interceptor.service';
import {FileRender1Component} from './Component/file-render/file-render1/file-render1.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../Material/material.module';
import {TeachFindComponent} from './Component/teach-find/teach-find.component';
import { ReportPageComponent } from './Component/file-render/report-page/report-page.component';
// import {ExtendedModule} from '@angular/flex-layout';
import { ListFormComponent } from './Component/list-form/list-form.component';
import { GeneralDialogComponent } from './Component/general-dialog/general-dialog.component';
import {CustomGridComponent} from './custom-grid/custom-grid.component';
import {NumericOnlyDirective} from '../shared/directive/numeric-only.directive';
import {SearchableSelectComponent} from "../shared/searchable-select/searchable-select.component";


@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        FormsModule,
        // ExtendedModule,
    ],
    providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
      }
    ],
    declarations: [
        SearchableSelectComponent,
        // DialogComponent,
        SafeHtmlPipe,
        NumericOnlyDirective,
        FileRender1Component,
        DigitCodeComponent,
        EmpFindComponent,
        TeachFindComponent,
        StdFindComponent,
        SpecialUserFindComponent,
        ReportPageComponent,
        ListFormComponent,
        CustomGridComponent,
        GeneralDialogComponent],
  exports: [
    // DialogComponent,
    GeneralDialogComponent,
     FileRender1Component, SafeHtmlPipe, CustomGridComponent, NumericOnlyDirective, SearchableSelectComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [GeneralService]
    };
  }
}
