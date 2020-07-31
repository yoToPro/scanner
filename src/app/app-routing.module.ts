import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cordova-qr',
    loadChildren: () => import('./cordova-qr/cordova-qr.module').then( m => m.CordovaQrPageModule)
  },
  {
    path: 'js-qr',
    loadChildren: () => import('./js-qr/js-qr.module').then( m => m.JsQrPageModule)
  },
  {
    path: 'barcode',
    loadChildren: () => import('./barcode/barcode.module').then( m => m.BarcodePageModule)
  },
  {
    path: 'ngx-scanner',
    loadChildren: () => import('./ngx-scanner/ngx-scanner.module').then( m => m.NgxScannerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
