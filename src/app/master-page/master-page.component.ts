import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class MasterPageComponent implements OnInit, OnDestroy {

  public openedSideBar: boolean;
  public viewportSmallSubscription: Subscription = null;
  public viewportWebSubscription: Subscription = null;
  public masterPageNgrxSubscription: Subscription = null;
  public masterPage$: Observable<string>;
  private activateDynamicSubHeader: boolean = false;
  private showDynamicSubHeader: boolean = false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private store: Store<{}>) {
    this.masterPage$ = this.store.pipe(select('masterPage'));
    this.storeChangeDetector();
  }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
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
    this.viewportSmallSubscription.unsubscribe();
    this.viewportWebSubscription.unsubscribe();
    this.masterPageNgrxSubscription.unsubscribe();
  }

  /**
   * Redirecciona a la vista de login.
   */
  public logout() {
    this.router.navigate(['login']);
  }

  /**
   * Detecta el cambio de pantalla.
   */
  private breakpointDetector() {

    this.viewportSmallSubscription = this.breakpointObserver.observe([Breakpoints.Small])
      .subscribe(() => {
        this.openedSideBar = false;
      });

    this.viewportWebSubscription = this.breakpointObserver.observe([Breakpoints.Web])
      .subscribe(() => {
        this.openedSideBar = true;
      });
  }
}
