import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-ngx-scanner',
  templateUrl: './ngx-scanner.page.html',
  styleUrls: ['./ngx-scanner.page.scss'],
})
export class NgxScannerPage implements OnInit {
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  public scanActive = false;
  public allowedFormats = null;
  public scanResult = null;


  public desiredDevice = null;
  public torch = null;

  constructor(private cd: ChangeDetectorRef) {
    this.allowedFormats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.AZTEC,
      BarcodeFormat.CODABAR,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_93,
      BarcodeFormat.EAN_8,
      BarcodeFormat.ITF,
      BarcodeFormat.MAXICODE,
      BarcodeFormat.PDF_417,
      BarcodeFormat.RSS_14,
      BarcodeFormat.RSS_EXPANDED,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.UPC_EAN_EXTENSION
    ];
  }

  ngOnInit() { }

  scanSuccessHandler(ev: any) {
    console.log('scanSuccessHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = false;
  }

  scanErrorHandler(ev: any) {
    console.log('scanErrorHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = true;
  }

  scanFailureHandler(ev: any) {
    console.log('scanFailureHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = true;
  }

  scanCompleteHandler(ev: any) {
    console.log('scanCompleteHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = false;
  }

  onTorchCompatible(ev: any) {
    console.log('onTorchCompatible: ', ev);
    // this.scanResult = ev;
    // this.scanActive = false;
  }

  camerasFoundHandler(ev: any) {
    console.log('camerasFoundHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = false;
  }

  camerasNotFoundHandler(ev: any) {
    console.log('camerasNotFoundHandler: ', ev);
    // this.scanResult = ev;
    // this.scanActive = false;
  }

  enableScanner() {
    this.scanActive = !this.scanActive;

    const scanner = new ZXingScannerComponent();
    scanner.askForPermission()
      .then((permission: boolean) => {
        this.desiredDevice = scanner.hasDevices;
        if (this.desiredDevice && permission) {
          console.log('Start scanner');
        } else {
          this.scanActive = false;
          this.scanResult = `Something went wrong, Devices is ${this.desiredDevice} and ${permission}`;
        }
      }).catch((error) => {
        this.scanActive = false;
        this.scanResult = JSON.stringify(error);
        console.log(error);
      });
  }

  reset() {
    this.scanActive = false;
    this.scanResult = null;
  }

  disableScanner() {
    this.scanActive = false;
  }

  showScannerDetails() {
    console.log('Scanner Details: ', this.scanner);
  }
}
