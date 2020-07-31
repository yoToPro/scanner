import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CordovaQrPage } from './cordova-qr.page';

describe('CordovaQrPage', () => {
  let component: CordovaQrPage;
  let fixture: ComponentFixture<CordovaQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordovaQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CordovaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
