import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AppI18nService } from '../app-i18n.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { AuthLogoutAction } from '../auth/login/store/auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, /** Fix error Expression has changed after it was checked. Previous value: */
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
  public showDynamicSubHeader: boolean = false;
  public languageList: string[] = [];

  @Select(state => state.personsForm.masterPageSubHeader) masterPageSubHeader$: Observable<string>;
  @Select(state => state.masterpage.showProgressLinear) showProgressLinear$: Observable<string>;

  constructor(
    private router: Router,
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private appI18nService: AppI18nService) { }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    console.log(`${MasterPageComponent.name}::ngOnInit`);
    this.languageList = this.appI18nService.getLanguages();
  }

  /**
   * Habilita el detector de responsive.
   */
  public ngAfterContentInit() {
    console.log(`${MasterPageComponent.name}::ngAfterContentInit`);
    this.openedSideBar = false;
    this.breakpointDetector();
  }

  /**
   * Renderiza/Oculta el subheader.
   */
  public onElementScroll($event) {
    if (this.isPersonFormView()) {
      if ($event.target.scrollTop > 31) {
        this.showDynamicSubHeader = true;
      } else if ($event.target.scrollTop === 0) {
        this.showDynamicSubHeader = false;
      }
    }
  }

  /**
   * Evalua si la vista actual es el formulario de persona.
   */
  public isPersonFormView(): boolean {
    return this.router.isActive('/master-page/personas/formulario', false);
  }

  /**
   * Desuscribe las referencias a los observables.
   */
  public ngOnDestroy() {
    console.log(`${MasterPageComponent.name}::ngOnDestroy`);
    this.viewportSmallSubscription.unsubscribe();
    this.viewportWebSubscription.unsubscribe();
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
    this.store.dispatch(new AuthLogoutAction())
      .subscribe(() => {
        this.store.dispatch(new Navigate(['auth/login']));
      });
  }

  /**
   * Redirecciona al listado de personas.
   */
  public goToPersonList(drawer: MatDrawer) {
    console.log(`${MasterPageComponent.name}::goToPersonList`);
    this.store.dispatch(new Navigate(['master-page/personas/listado']));
    if (this.openedSideBarMode === 'over') {
      drawer.close();
    }
  }

  /**
   * Redirecciona al listado de paises.
   */
  public goToCountryList(drawer: MatDrawer) {
    console.log(`${MasterPageComponent.name}::goToCountryList`);

    this.store.dispatch(new Navigate(['master-page/paises/listado']));
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
