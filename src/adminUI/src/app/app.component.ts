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
  _showMainTemplate: boolean = false;

  _homeURL = UrlConfig.emptyURL;
  _accountURL = UrlConfig.accountURL;
  _proxiesURL = UrlConfig.proxiesURL;
  _logURL = UrlConfig.logsURL;
  _tradeBalanceURL = UrlConfig.tradeBalanceURL;
  _tableexampleURL = UrlConfig.tableURL;
  _configurationURL = UrlConfig.configurationURL;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (UrlConfig.urlWithTemplate.includes(this.router.url))
      {
        this._showMainTemplate = true;
      }
    });
  }
}
