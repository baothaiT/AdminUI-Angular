import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UrlConfig } from './../shared/common/urlConfig';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminUI';
  showMainTemplate: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (UrlConfig.urlWithTemplate.includes(this.router.url))
      {
        this.showMainTemplate = true;
      }
    });
  }
}
