import { Component } from '@angular/core';

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
}
