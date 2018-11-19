import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDisplayComponent } from './batch-display.component';

describe('BatchDisplayComponent', () => {
  let component: BatchDisplayComponent;
  let fixture: ComponentFixture<BatchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
