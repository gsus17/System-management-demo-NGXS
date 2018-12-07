import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.sass']
})
export class MasterPageComponent implements OnInit {

  public openedSideBar: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
