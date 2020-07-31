import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import jsOR from 'jsqr';
import jsQR from 'jsqr';

@Component({
  selector: 'app-js-qr',
  templateUrl: './js-qr.page.html',
  styleUrls: ['./js-qr.page.scss'],
})
export class JsQrPage implements OnInit, AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  scanActive = false;
  scanResult = null;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private plt: Platform
  ) {
    // tslint:disable-next-line:no-string-literal
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('RUNNING ON IOS');
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  captureImage() {
    this.fileInput.nativeElement.click();
  }

  handleFile(files: FileList) {
    const file = files.item(0);
    console.log('file: ', file);
    const img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
      if (code) {
        this.scanResult = code.data;
        // this.showQrToast();
      }
    };
    img.src = URL.createObjectURL(file);
  }

  async startScan() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute('playsinline', true);
      this.videoElement.play();
      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();
      requestAnimationFrame(this.scan.bind(this));
    } catch (error) {
      console.log('ERROR: ', error);
      this.showAlert('ERROR', error);
    }
  }

  async scan() {
    console.log('SCAN');
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code = jsOR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
      console.log('code: ', code);

      if (code) {
        this.videoElement.pause();
        this.scanActive = false;
        this.scanResult = code.data;
        this.scanResult = (this.scanResult === '') ? 'You need to use better code to scan some data' : this.scanResult;
        // this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset() {
    this.scanActive = false;
    this.scanResult = null;
  }

  stopScan() {
    this.videoElement.pause();
    this.scanResult = null;
    this.scanActive = false;
  }

  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}`,
      position: 'top',
      duration: 2000,
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }

  async showAlert(msgType: string, msgDetails: string) {
    const alert = await this.alertCtrl.create({
      header: msgType,
      message: msgDetails,
      buttons: ['OK']
    });
    await alert.present();
  }
}
