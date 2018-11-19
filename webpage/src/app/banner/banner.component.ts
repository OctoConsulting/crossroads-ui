import { Component,Input, Output, EventEmitter } from '@angular/core';

/**
 * The <banner> component informs the user that the site is an official
 * website of the United States Government
 */
@Component({
  selector: 'common-banner',
  templateUrl: 'banner.template.html',
})
export class BannerComponent {
  showDetail: boolean = false;

  toggleDetails() {
    this.showDetail = !this.showDetail;
  }
}

