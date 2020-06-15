import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private user : UserService ,private alert : AlertService, private router : Router) { }

  companyEmail :string = ''
  ngOnInit() {
  }
  onSubmit(){
    let response :any= {}
    this.user.forgotPassword({companyEmail : this.companyEmail.toLowerCase()}).subscribe(res=>{
    response = res;
    if(response.status== 1){
      this.alert.success('We have send a link to your registered email to reset your password')
      setTimeout(() => {
        this.router.navigate(['user/login'])
      }, 3000);
    }
    if(response.status== 0){
      this.alert.error('Please enter valid company email!!')
    }
  })

}
}
