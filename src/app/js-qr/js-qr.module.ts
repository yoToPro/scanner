import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JsQrPageRoutingModule } from './js-qr-routing.module';

import { JsQrPage } from './js-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JsQrPageRoutingModule
  ],
  declarations: [JsQrPage]
})
export class JsQrPageModule {}
