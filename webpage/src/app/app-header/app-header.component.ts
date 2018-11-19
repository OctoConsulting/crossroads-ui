import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  styleUrls: ["app-header.component.css"],
  templateUrl: "./app-header.html"
})
export class AppHeaderComponent {
  @Input() title: string;
}
