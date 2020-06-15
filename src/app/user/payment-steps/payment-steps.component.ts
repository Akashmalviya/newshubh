import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray , FormControl, Validators} from '@angular/forms';
import { Hero } from '../../_models/raw';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-steps',
  templateUrl: './payment-steps.component.html',
  styleUrls: ['./payment-steps.component.scss']
})
export class PaymentStepsComponent implements OnInit {
  step = 0;
  data ={
    id : JSON.parse(localStorage.getItem('currentUser')).data._id,
    flag : 0
  }
 
  setStep(index: number) {
    this.step = index;
  }

  // nextStep() {
  //   this.step++;
  // }

  // prevStep() {
  //   this.step--;
  // }
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder ,
    private userservice : UserService , private alert : AlertService, private router: Router
    ) { }

    
  ngOnInit() {
    
  }

}
