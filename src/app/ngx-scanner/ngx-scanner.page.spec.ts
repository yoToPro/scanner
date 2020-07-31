import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NgxScannerPage } from './ngx-scanner.page';

describe('NgxScannerPage', () => {
  let component: NgxScannerPage;
  let fixture: ComponentFixture<NgxScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
