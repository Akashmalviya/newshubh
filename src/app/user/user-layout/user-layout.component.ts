import { Component, OnInit } from '@angular/core';
declare function initUser();
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initUser();
  }
  closeSidebar(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("SidebarToggle");
  }

}
