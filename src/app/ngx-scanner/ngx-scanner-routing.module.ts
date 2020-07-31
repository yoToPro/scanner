import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxScannerPage } from './ngx-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: NgxScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxScannerPageRoutingModule {}
