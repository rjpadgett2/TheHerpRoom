import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddHerpsPage } from './add-herps.page';

describe('AddHerpsPage', () => {
  let component: AddHerpsPage;
  let fixture: ComponentFixture<AddHerpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHerpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHerpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
