import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare function initHome();
@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',  
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    initHome()
  }

}
