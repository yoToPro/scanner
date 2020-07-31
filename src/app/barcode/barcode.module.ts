import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodePageRoutingModule } from './barcode-routing.module';

import { BarcodePage } from './barcode.page';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodePageRoutingModule
  ],
  declarations: [BarcodePage],
  providers: [QRScanner],
})
export class BarcodePageModule {}
