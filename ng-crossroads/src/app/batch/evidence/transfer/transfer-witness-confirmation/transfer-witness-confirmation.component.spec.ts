import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferWitnessConfirmationComponent } from './transfer-witness-confirmation.component';

describe('TransferWitnessConfirmationComponent', () => {
  let component: TransferWitnessConfirmationComponent;
  let fixture: ComponentFixture<TransferWitnessConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferWitnessConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferWitnessConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
