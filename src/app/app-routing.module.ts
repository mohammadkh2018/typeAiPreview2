import { NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TypeAiPreviewComponent } from '../components/type-ai-preview/type-ai-preview.component';

const routes: Routes = [
  {
    path: '',
    component: TypeAiPreviewComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
