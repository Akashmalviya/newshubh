import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray , FormControl, Validators} from '@angular/forms';
import { ItemlogService } from 'src/app/_services/itemlog.service';
import {Hero} from '../../../_models/raw';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { DropdownService } from 'src/app/_services/dropdown.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})

export class UserSignupComponent implements OnInit {
  //;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  isEditable = true;
  response : any = {}
  cityInfo: any[] = [];
  submitted = false;
  flagEmail = false;

  options={
    types: [],
    componentRestrictions: { country: ['CA','IN'] }
    }

  public data : any = {flag : 1}
  isLinear = true;
  flagPass = false;
  loading = false;
  constructor(private fb: FormBuilder , private itemLog : ItemlogService,
    private userservice : UserService , private alert : AlertService, private router: Router,private auth : AuthenticationService ) {

    }

    stateName :string;
  user: any = {itemType : [], itemWeight : [],country: '', state :'' ,city: '' };
  confirmLog : any = {};
  respose: any = {};

  public registerForm: FormGroup;
  public registerForm2: FormGroup;


  registrationForm: any;
  formFirst : Boolean;
  formSecond = true;
  itemType  = [];
  itemWeight: any = {data:[]};

  ngOnInit() {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      companyPhone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(12)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      streetAdress: ['', Validators.required],
      dummyAdrress: [''],
      address2: [''],
      country: ['', Validators.required],
      state: ['',],
      city: [''],
      postalCode: ['', [Validators.required,Validators.pattern('^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$')]],
      location : this.fb.group({
        type: ['point'],
        coordinates : this.fb.array([])
      }),
      itemType: this.fb.array([]),
      itemWeight: this.fb.array([])},
      {
      validators: [this.password,this.email]
    }
      );
      this.registerForm2 = this.fb.group({
        firstContactPerson: ['', Validators.required],
      firstRole: ['', Validators.required],
      firstContactEmail: ['',  [Validators.required, Validators.email]],
      // companyPhone: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],

      firstContactPhone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      secondContactPerson: ['', Validators.required],
      secondaryRole: ['', Validators.required],
      secondContactEmail: ['',  [Validators.required, Validators.email]],
      // secondContactPhone: ['', Validators.required],
      secondContactPhone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],

      })
      this.getCountries();
      this.getItemDetails();

  }

  password(registerForm: FormGroup) {
    const { value: password } = registerForm.get('password');
    const { value: confirmPassword } = registerForm.get('confirmpassword');
    return password === confirmPassword ?  null : { passwordNotMatch: true };
  }
  email(registerForm: FormGroup) {
    const { value: email } = registerForm.get('companyEmail');
    const { value: confirmEmail } = registerForm.get('confirmEmail');
    return email === confirmEmail ? null  : { emailNotMatch: true };
  }
public handleNewAddressChange(location: any) {
  let data : any= {}
  console.log(location);


   let googleAddres = location.address_components;

  const picuplocation =<FormGroup> this.registerForm.get('location')
  // picuplocation.patchValue({type : 'point'})
  const latLong = < FormArray > picuplocation.controls.coordinates;
  latLong.clear();
    latLong.insert(0 , new FormControl(location.geometry.location.lng().toFixed(4)))
   latLong.insert(1 , new FormControl(location.geometry.location.lat().toFixed(4)))

  data.streetAdress = location.vicinity;
  data.dummyAdrress =  location.vicinity;
  googleAddres.map((element,i) => {

    element.types.filter(x=>{
      if(x == 'locality'){
        data.city = element.long_name
      }
      if(x == 'postal_code'){
        data.postalCode = element.long_name
      }
      if(x == 'administrative_area_level_1'){
        data.state = element.long_name
      }
      if(x == 'sublocality'){
        data.address2 = element.long_name
      }
      if(x == "country"){
        data.country = element.long_name
      }
    });

  });
  console.log(data);

  this.registerForm.patchValue(data)
  console.log(this.registerForm.value);

}


  getCountries(){
    this.userservice.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }
  formCheck(form,stepper){
    this.submitted = true


    if(form.valid){
      this.submitted =false;
    }


  }
  onChangeCountry(countryValue) {
    this.stateInfo=this.countryInfo[countryValue].States;
    this.registerForm.patchValue({
      country:this.countryInfo[countryValue].CountryName ,
      state : null,
      city:null
    });
    this.cityInfo=this.stateInfo[0].Cities;
  }

  onChangeState(stateValue) {
   this.registerForm.patchValue({
    state :this.stateInfo[stateValue].StateName ,
  });
    this.cityInfo=this.stateInfo[stateValue].Cities;
  }
  onSubmit(stepper){
    console.log(stepper);

    if(this.registerForm && this.registerForm2){
      this.loading = true;
      let formJoin = Object.assign({} , this.registerForm.value,this.registerForm2.value)
      this.userservice.register(formJoin).subscribe(res => {

        this.response = res;
        if(this.response.status === '1'){
          this.data.id = this.response._id;
          this.alert.success('Thank you for register with us')
             // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(this.response))
          this.auth.currentUserValuedata(this.response);
          this.isEditable = false;
          stepper.next()
        } else if (this.response.status === '0'){
          this.loading = false;
          this.alert.error('User Already exist') ;
          this.isLinear = true;
          stepper.selectedIndex  = 0;
        }
      } )
    }
  }


  onChangeType(id: string, isChecked: boolean) {
    const subIdarr = < FormArray > this.registerForm.controls.itemType;
    if (isChecked) {
      subIdarr.push(new FormControl(id));
    } else {
      const index = subIdarr.controls.findIndex(x => x.value == id)
      subIdarr.removeAt(index);
    }
  }

  onChangeWeight(id: string, isChecked: boolean) {
    const subIdarr = < FormArray > this.registerForm.controls.itemWeight;
    if (isChecked) {
      subIdarr.push(new FormControl(id));
    } else {
      const index = subIdarr.controls.findIndex(x => x.value == id)
      subIdarr.removeAt(index);
    }
  }

  get regForm() {
    return this.registerForm.controls;
  }
  get regForm2() {
    return this.registerForm2.controls;
  }

  getItemDetails(){
    this.itemLog.itemType().subscribe(res =>{this.itemType=res.data;}
      );
    this.itemLog.itemWeight().subscribe(res =>{ this.itemWeight = res;

      });
      this.itemWeight=this.itemWeight.data
  }
}
