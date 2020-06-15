import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
   currentData : any = {data:{}}

  constructor(private user : UserService , private router : Router) {
    this.user.getProfile().subscribe(res=>{
      this.currentData = res;
      this.user.userData.next(res);
    this.user.userData.subscribe(data => this.currentData = data)    })
  }

  ngOnInit() {


}
}
