import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CordovaQrPageRoutingModule } from './cordova-qr-routing.module';

import { CordovaQrPage } from './cordova-qr.page';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CordovaQrPageRoutingModule
  ],
  declarations: [CordovaQrPage],
  providers: [QRScanner],
})
export class CordovaQrPageModule {}
