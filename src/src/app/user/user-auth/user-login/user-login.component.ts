import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
import { AlertService } from '../../../_services/alert.service';
import { UserService } from 'src/app/_services/user.service';


@Component({ templateUrl: './user-login.component.html' })
export class UserLoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isloggedIn = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService : UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.isloggedIn = true;
            // this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        if(this.isloggedIn){
            this.router.navigate(['/user']);
        }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
          this.alertService.error('Login and password can not be blank');
          this.loading = false;
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value.toLowerCase(), this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                   if(data.status === "1"){
                        this.router.navigate(['user/dashboard']);

                   } else{

                    this.loading = false;
                   }
                },
                );
                this.loading = false;
    }
}
