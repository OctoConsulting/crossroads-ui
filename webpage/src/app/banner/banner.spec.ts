import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Load the implementations that should be tested
import { BannerComponent } from './banner.component';

describe('The Banner component', () => {
  let component: BannerComponent;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent],
    });

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should display banner', function () {
    expect(component.showDetail).toBe(false);
  });

  it('should toggle', () => {
    component.toggleDetails();
    expect(component.showDetail).toBe(true);
  });
});
