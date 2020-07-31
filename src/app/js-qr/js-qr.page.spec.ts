import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JsQrPage } from './js-qr.page';

describe('JsQrPage', () => {
  let component: JsQrPage;
  let fixture: ComponentFixture<JsQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JsQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
