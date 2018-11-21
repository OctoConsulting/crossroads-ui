import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceTableComponent } from './evidence-table.component';

describe('EvidenceTableComponent', () => {
  let component: EvidenceTableComponent;
  let fixture: ComponentFixture<EvidenceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
