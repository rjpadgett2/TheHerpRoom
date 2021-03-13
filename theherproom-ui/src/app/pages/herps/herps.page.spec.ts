import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HerpsPage } from './herps.page';

describe('HerpsPage', () => {
  let component: HerpsPage;
  let fixture: ComponentFixture<HerpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HerpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
