import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})

export class SiteHeaderComponent implements OnInit {
  currentUser: User;
  constructor(private authenticationService : AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
   if(this.currentUser){
    this.router.navigate(['user/dashboard'])
   }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['user/login']);
  }

}
