import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit, OnDestroy {

  public openedSideBar: boolean;
  public viewportSmallSubscription: Subscription = null;
  public viewportWebSubscription: Subscription = null;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointDetector();
  }

  ngOnDestroy() {
    this.viewportSmallSubscription.unsubscribe();
    this.viewportWebSubscription.unsubscribe();
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
