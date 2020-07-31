import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {
  scanActive = false;
  scanResult = null;
  scanSubscription = null;

  constructor(
    private qrScanner: QRScanner,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() { }

  async startScan() {
    try {
      (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
      const status: QRScannerStatus = await this.qrScanner.prepare();
      console.log('Scanner status: ', status);
      if (status.authorized) {
        // show qr scanner and make background transparent
        this.qrScanner.show();
        // camera permission was granted
        this.scanActive = true;
        // start scanning
        this.scanSubscription = this.qrScanner.scan().subscribe(async (scanedData: string) => {
          // this.scanActive = false;
          this.scanResult = scanedData;
          await this.showAlert('Scan Result', this.scanResult);
          this.showToast('Result', this.scanResult);
          this.stopScanning();
        });
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        console.log('camera permission denied');
        this.qrScanner.openSettings();
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    } catch (error) {
      console.log('ERROR: ', error);
      this.showAlert('ERROR', error._message);
    }
  }

  reset() {
    this.scanResult = null;
  }

  stopScanning() {
    this.scanSubscription = (this.scanSubscription) ? this.scanSubscription.unsubscribe() : null;
    this.scanSubscription = null;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();
    this.qrScanner.destroy();
    this.scanActive = false;
  }

  async showAlert(msgType: string, msgDetails: string) {
    const alert = await this.alertCtrl.create({
      header: msgType,
      message: msgDetails,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(msgType: string, msgDetails: string) {
    const toast = await this.toastCtrl.create({
      header: msgType,
      message: msgDetails,
      position: 'bottom',
      duration: 3000,
      buttons: ['OK']
    });
    toast.present();
  }

}
