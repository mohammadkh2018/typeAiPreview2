import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TypeAiPreviewComponent } from '../components/type-ai-preview/type-ai-preview.component';
// import { RouterModule } from '@angular/router';
// import { TypeAiPreviewComponent } from '../component/type-ai-preview/type-ai-preview.component';
// import { SignatureComponent } from '../components/signature/signature.component';
import { CoreModule } from '../core/core.module';
// import { MaterialModule } from '../Material/material.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import { SignatureComponent } from '../component/signature/signature.component';
// import { CoreModule } from '../core/core.module';
// import { MaterialModule } from '../Material/material.module';
// import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';




@NgModule({
  declarations: [
    AppComponent,
    TypeAiPreviewComponent,
    // SignatureComponent
  ],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    // MaterialModule,
    // MatSnackBarModule,
    BrowserAnimationsModule,
    NgxExtendedPdfViewerModule,
    
    // DocumentEditorContainerModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }