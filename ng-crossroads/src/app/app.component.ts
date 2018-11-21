import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'FBI CrossRoads';
  public links: any[] = [
    { title: 'Home', path: [''] },
    { title: 'Batch', path: ['/batches'] }
  ];

  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'bars',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/bars.svg')
    );
  }
}
