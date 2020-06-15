import { Component, AfterViewInit,OnDestroy,ViewChild,ElementRef,ChangeDetectorRef,Input, Output,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { CardObject } from 'src/app/_models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
declare function showAlertModal(data) : any;

declare var $: any;

@Component({
  selector: 'app-payment-gate',
  templateUrl: './payment-gate.component.html',
  styleUrls: ['./payment-gate.component.scss']
})
export class PaymentGateComponent implements AfterViewInit, OnDestroy {

  @Output() public flag = new EventEmitter();

  @ViewChild('cardNumber',{static : false}) cardNumber : ElementRef;
  @ViewChild('cardCVV',{static : false}) cardCVV : ElementRef;
  @ViewChild('cardexp',{static : false}) cardexp : ElementRef;

  @Input() data;
  submitted = false;
  loading = false;
  name: string;
  cardN: any;
  cardC: any;
  cardE: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  ngForm: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public style = {
    base: {
      lineHeight: '24px',
      fontFamily: 'monospace',
      fontSmoothing: 'antialiased',
      fontSize: '19px',
      '::placeholder': {
        color: 'purple'
      }
    }
  };
  constructor(private cd: ChangeDetectorRef,private _snackBar: MatSnackBar,
    private user : UserService, private router : Router,private alert : AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.cardN = elements.create('cardNumber', { style : style,showIcon:true });
    this.cardC = elements.create('cardCvc', { style : style });
    this.cardE = elements.create('cardExpiry', { style : style });


    this.cardN.mount(this.cardNumber.nativeElement);
    this.cardC.mount(this.cardCVV.nativeElement);
    this.cardE.mount(this.cardexp.nativeElement);

    this.cardN.addEventListener('change', this.cardHandler);
    this.cardC.addEventListener('change', this.cardHandler);
    this.cardE.addEventListener('change', this.cardHandler);

  }


  ngOnDestroy() {
    this.cardN.removeEventListener('change', this.cardHandler);
    this.cardN.destroy();
    this.cardC.removeEventListener('change', this.cardHandler);
    this.cardC.destroy();
       this.cardE.removeEventListener('change', this.cardHandler);
    this.cardE.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.cardN,{name : this.name});
    if (error) {
      console.log('Something is wrong:', error);
      this.loading = false;
    } else {
       this.loading = true

      console.log('Success!', token, this.data);
     if(this.data.flag == 2 ){
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;
      this.user.updatePayment({token: token.id},id).subscribe(res=>{console.log(res);
        this.loading = false;
        this.alert.success('Your payment details updated')
        this.flag.emit('1');
      })
     }
     if(this.data.flag == 1){
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;
      this.user.updatePayment({token: token.id},id).subscribe(res=>{console.log(res);
      localStorage.clear();
      this.router.navigate(['../login'])
        this.loading = false
        this.openSnackBar('Added');
      })
     }
     if(this.data.flag == 0){
      this.user.updatePayment({token: token.id},this.data.id).subscribe(res=>{console.log(res);
        this.cardDetails();
          $('#Payment').modal('hide');
          showAlertModal('Payment Details Updated')
        this.loading = false;
      })
     }
      // ...send the token to the your backend to process the charge
    }
  }

  cardDetails(){
    this.user.getCard().subscribe((res:CardObject) =>{
      this.user.cardObject.next(res);
      // this.openSnackBar('Updated');
    })
  }

  openSnackBar(status) {
    this._snackBar.open('Payment Details!!', status, {
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
    });
  }
}
