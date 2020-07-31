import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxScannerPageRoutingModule } from './ngx-scanner-routing.module';

import { NgxScannerPage } from './ngx-scanner.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxScannerPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [NgxScannerPage]
})
export class NgxScannerPageModule {}
