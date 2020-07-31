import { Component, OnInit, NgZone } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cordova-qr',
  templateUrl: './cordova-qr.page.html',
  styleUrls: ['./cordova-qr.page.scss'],
})
export class CordovaQrPage implements OnInit {
  public scanActive = false;
  public scanResult = null;
  public prepareScanner: QRScannerStatus = null;
  public showPreview: QRScannerStatus = null;
  public backCameraActive = true;
  public flashActive = false;
  public scannerSubscription = null;

  constructor(
    private qrScanner: QRScanner,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) { }

  ngOnInit() { }

  async startScan() {
    try {
      this.prepareScanner = await this.qrScanner.prepare();
      console.log('Data when scanner is prepared: ', JSON.stringify(this.prepareScanner));
      if (this.prepareScanner.authorized) {
        // camera permission was granted
        // show qr scanner and make background transparent
        this.showPreview = await this.qrScanner.show();
        console.log('Data when scanner is ready to scan: ', JSON.stringify(this.showPreview));
        this.scanActive = this.showPreview.showing;
        // start scanning
        this.scannerSubscription = this.qrScanner.scan().subscribe(async (scanedData: string) => {
          this.scanResult = scanedData;
          console.log('Scanner result: ', this.scanResult);
          if (this.scanResult !== '' && this.scanResult !== null) {
            await this.closeScanner();          // hide camera preview and stop scanning
            this.ngZone.run(() => {
              this.scanActive = this.showPreview.showing;
              console.log('Is scan Active? ', this.scanActive);
              this.showPreview = null;
              console.log('Show preview: ', this.showPreview);
              this.prepareScanner = null;
              console.log('Scanner status: ', this.prepareScanner);
            });
            this.scannerSubscription.unsubscribe();         // unsubscribe scanner subscription
            console.log('Unsubscribed scanner data: ', this.scannerSubscription);
          }
        });
      } else if (this.prepareScanner.denied && this.prepareScanner.canOpenSettings) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        console.log('camera permission denied');
        await this.requestToOpenSettings('Allow access', 'Would you like to enable QR code scanning?');
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // this.showAlert('ERROR', error._message);
      // camera permission denied or may be restricted
      if (error.code === 1 || error.code === 5) {
        console.log('Camera permission denied message: ', error._message);
        await this.requestToOpenSettings('Allow access', 'Would you like to enable QR code scanning?');
      }
    }
  }

  async closeScanner() {
    try {
      this.showPreview = await this.qrScanner.hide();         // hide camera preview
      console.log('Data while hiding camera preview: ', JSON.stringify(this.showPreview));
      this.showPreview = await this.qrScanner.destroy();   // distror the scanner instance
      console.log('Data while destroying scanner instance: ', JSON.stringify(this.showPreview));
      console.log(`Is scanner active? ${this.scanActive} and scan result is ${this.scanResult}`);
      if (this.scanActive && (this.scanResult == null || this.scanResult === '')) {
        this.scanActive = false;
        this.showPreview = null;
        console.log('Setting preview value while closing scanner: ', this.showPreview);
        this.prepareScanner = null;
        console.log('Setting preapreScanner value while closing scanner: ', this.prepareScanner);
      }
    } catch (error) {
      console.log('Close Scanner: ', error);
      await this.showAlert('Error', JSON.stringify(error));
    }
  }

  async switchCamera() {
    if (this.showPreview.canChangeCamera) {
      this.backCameraActive = (this.showPreview.currentCamera === 0) ? true : false;
      if (this.backCameraActive) {
        const cameraStatus: QRScannerStatus = await this.qrScanner.useFrontCamera();
        this.showPreview.currentCamera = cameraStatus.currentCamera;
        console.log('Camera switched', 'Scanning with front camera');
      } else {
        const cameraStatus: QRScannerStatus = await this.qrScanner.useBackCamera();
        this.showPreview.currentCamera = cameraStatus.currentCamera;
        console.log('Camera switched', 'Scanning with back camera');
      }
    } else {
      await this.showAlert('Alert', 'You do not have multiple camera');
    }
  }

  async switchFlash() {
    if (this.showPreview.canEnableLight) {
      this.ngZone.run(async () => {
        this.flashActive = (this.showPreview.lightEnabled) ? true : false;
        if (this.flashActive) {
          const lightStatus: QRScannerStatus = await this.qrScanner.disableLight();
          this.showPreview.lightEnabled = lightStatus.lightEnabled;
          console.log('Flash', 'Switched OFF');
        } else {
          const lightStatus: QRScannerStatus = await this.qrScanner.enableLight();
          this.showPreview.lightEnabled = lightStatus.lightEnabled;
          console.log('Flash', 'Switched ON');
        }
      });
    } else {
      await this.showAlert('Alert', 'You do not have flash light');
    }
  }

  reset() {
    this.ngZone.run(() => {
      this.scanResult = null;
      this.scanActive = false;
    });
  }

  async showAlert(msgType: string, msgDetails: string) {
    const alert = await this.alertCtrl.create({
      header: msgType,
      message: msgDetails,
      buttons: ['OK']
    });
    await alert.present();
  }

  async requestToOpenSettings(msgType: string, msgDetails: string) {
    const alert = await this.alertCtrl.create({
      header: msgType,
      message: msgDetails,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.showToast('Canecelled', 'You need to enable camera access in your settings to scan QR code');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.qrScanner.openSettings();
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(msgType: string, msgDetails: string) {
    const toast = await this.toastCtrl.create({
      header: msgType,
      message: msgDetails,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }

  async ionViewDidLeave() {
    await this.closeScanner();
  }
}
