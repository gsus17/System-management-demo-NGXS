import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppI18nService {

  private languages: string[] = ['es', 'en'];

  constructor(private translate: TranslateService) {

  }

  /**
   * Init the default config.
   */
  public initI18n(): void {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('es');

    this.translate.use('es');
  }

  /**
   * Set a specific language.
   */
  public use(language: string): void {
    this.translate.use(language);
  }

  /**
   * Return the language list.
   */
  public getLanguages(): string[] {
    return this.languages;
  }
}
