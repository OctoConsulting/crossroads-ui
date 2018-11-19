import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTravelComponent } from './request-travel.component';

describe('RequestTravelComponent', () => {
  let component: RequestTravelComponent;
  let fixture: ComponentFixture<RequestTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
