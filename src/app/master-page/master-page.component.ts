import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.sass']
})
export class MasterPageComponent implements OnInit {

  public openedSideBar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Redirecciona a la vista de login.
   */
  public logout() {
    this.router.navigate(['login']);
  }

}
