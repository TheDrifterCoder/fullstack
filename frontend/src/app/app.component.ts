import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  scriptLanding: HTMLScriptElement;

  title = 'front';

  constructor() {
    this.scriptLanding = document.createElement("script");
    this.scriptLanding.src = "../assets/js/script.js";
    // this.scriptLanding.src = "/../../assets/js/script.js";
    document.body.appendChild(this.scriptLanding);
  }
}
