import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ng-crossroads';
  public links: any[] = [
    { title: 'Home', path: [''] },
    { title: 'Batch', path: ['/batch'] },
    { title: 'Transfer', path: ['/transfer'] }
  ];
}
