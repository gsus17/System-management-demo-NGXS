import { Component } from '@angular/core';
import { AppI18nService } from './app-i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private appI18nService: AppI18nService) {
    this.appI18nService.initI18n();
  }
}
