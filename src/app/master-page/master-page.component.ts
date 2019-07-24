import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AppI18nService } from '../app-i18n.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class MasterPageComponent implements OnInit, OnDestroy, AfterContentInit {
  public openedSideBar: boolean;
  public openedSideBarMode: string = 'side';
  public viewportSmallSubscription: Subscription = null;
  public viewportWebSubscription: Subscription = null;
  public masterPageNgrxSubscription: Subscription = null;
  public masterPage$: Observable<string>;
  private activateDynamicSubHeader: boolean = false;
  private showDynamicSubHeader: boolean = false;
  private languageList: string[] = [];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private appI18nService: AppI18nService,
    private store: Store<{}>) {
    console.log(`${MasterPageComponent.name}::ctor`);

    this.masterPage$ = this.store.pipe(select('masterPage'));
    this.storeChangeDetector();
  }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    console.log(`${MasterPageComponent.name}::ngOnInit`);
    this.languageList = this.appI18nService.getLanguages();
    // this.openedSideBar = false;
    // this.breakpointDetector();
  }

  public ngAfterContentInit() {
    console.log(`${MasterPageComponent.name}::ngAfterContentInit`);
    // this.languageList = this.appI18nService.getLanguages();
    this.openedSideBar = false;
    this.breakpointDetector();
  }

  /**
   * Renderiza/Oculta el subheader.
   */
  public onElementScroll($event) {
    if (this.activateDynamicSubHeader) {
      if ($event.target.scrollTop > 31) {
        this.showDynamicSubHeader = true;
      } else if ($event.target.scrollTop === 0) {
        this.showDynamicSubHeader = false;
      }
    }
  }

  /**
   * Actualiza los valores internos al detectar un cambio de estado.
   */
  private storeChangeDetector() {
    this.masterPageNgrxSubscription = this.masterPage$
      .subscribe((response: any) => {
        this.activateDynamicSubHeader = response.changeDynamicSubHeader;
        if (!this.activateDynamicSubHeader) {
          this.showDynamicSubHeader = false;
        }
      });
  }

  /**
  * Desuscribe las referencias a los observables.
  */
  ngOnDestroy() {
    console.log(`${MasterPageComponent.name}::ngOnDestroy`);
    this.viewportSmallSubscription.unsubscribe();
    this.viewportWebSubscription.unsubscribe();
    this.masterPageNgrxSubscription.unsubscribe();
  }

  /**
   * Change the current language.
   */
  public changeLanguage(language: string): void {
    console.log(`${MasterPageComponent.name}::changeLanguage`);
    this.appI18nService.use(language);
  }

  /**
   * Redirecciona a la vista de login.
   */
  public logout() {
    console.log(`${MasterPageComponent.name}::logout`);
    this.router.navigate(['login']);
  }

  /**
   * Redirecciona al listado de personas.
   */
  public goToPersonList(drawer: MatDrawer) {
    console.log(`${MasterPageComponent.name}::goToPersonList`);
    this.router.navigate(['master-page/personas/listado']);
    if (this.openedSideBarMode === 'over') {
      drawer.close();
    }
  }

  /**
   * Redirecciona al listado de paises.
   */
  public goToCountryList(drawer: MatDrawer) {
    console.log(`${MasterPageComponent.name}::goToCountryList`);

    this.router.navigate(['master-page/paises/listado']);
    if (this.openedSideBarMode === 'over') {
      drawer.close();
    }
  }

  /**
   * Detecta el cambio de pantalla.
   */
  private breakpointDetector() {
    console.log(`${MasterPageComponent.name}::breakpointDetector`);

    this.viewportWebSubscription = this.breakpointObserver.observe([Breakpoints.Web])
      .subscribe((result) => {
        if (result.matches) {
          this.openedSideBar = true;
          this.openedSideBarMode = 'side';
        }
      });

    this.viewportSmallSubscription = this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ])
      .subscribe((result) => {
        if (result.matches) {
          this.openedSideBar = false;
          this.openedSideBarMode = 'over';
        }
      });
  }
}
