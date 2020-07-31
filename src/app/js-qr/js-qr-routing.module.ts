import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JsQrPage } from './js-qr.page';

const routes: Routes = [
  {
    path: '',
    component: JsQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsQrPageRoutingModule {}
