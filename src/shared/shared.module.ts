import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoaderComponent } from './loader/loader.component';
import { MaterialModule} from '../Material/material.module';
import { ReconnectComponent } from './reconnect/reconnect.component';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  imports: [
      CommonModule
    , LightboxModule
    , MaterialModule
  ],
  declarations: [
    AccessDeniedComponent
    , LoaderComponent
    , ReconnectComponent
  ],
  exports: [
    LoaderComponent
    , CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
