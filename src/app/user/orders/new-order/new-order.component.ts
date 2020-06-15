import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';
import { OrderService } from '../../../_services/order.service';
import { UserService } from '../../../_services/user.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Observable } from 'rxjs';
import { AddressBookService } from 'src/app/_services/address-book.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusModalComponent } from 'src/app/_modal/status-modal/status-modal.component';



declare var google: any;
// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})

export class NewOrderComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef,
    private addressbook : AddressBookService,
    private auth :  AuthenticationService,
    private addresBook : AddressBookService,
  private fb: FormBuilder, private router : Router,
  private matDialog: MatDialog,
  private orders:OrdersService, private user:UserService,){}
  origin1 = {lat: null, lng: null};
  destinationA : any= [];
  AddressBook = [];
  search = '';
  showDefalutAddress = false
  ServiceNotAvailable = true;
  clicked = true;

  get placeOrdForm() {
    return this.placeOrder.controls;
  }

  // get placeNewOrdForm() {
  //   return this.placeOrder.controls;
  // }
  latlong : any = {}
  distance = []; time = [] ;
  get addressArray() {
    return <FormArray>this.dropOrder.get('droploction') as FormArray;
  }

  newOrderRes: any = {data:{}};
  // newAddOrderRes: any = {data:{}};
  submitted = false;
  readOnly = true;
  loading = true;
  fare : any = {}
  req = [];
  type = 'defaultaddress'
  googleData : any = {}
  dataflag = '0';

  public placeOrder: FormGroup;
  public dropOrder: FormGroup;
  googleAddres = [];
  @ViewChild("placesRef",{static : false}) placesRef : GooglePlaceDirective;
  options={
  types: [],
  componentRestrictions: { country: ['CA','IN'] }
  }

  ngOnInit() {
    this.getProfile();
    this.getAddressAPI()
    this.placeOrder = this.fb.group({
      picupCompanyName: ['', Validators.required],
      picupContactPersonName: ['', [Validators.required , Validators.pattern('[A-Za-z\s]*')]],
      picupMobileNumber: ['', [Validators.required,Validators.maxLength(11),Validators.minLength(10)]],
      picupEmail: ['', [Validators.required, Validators.email]],
      picupAddress: ['', Validators.required],
      picupStreetAddress: [''],
      picupCity: [],
      picupState: [],
      picPostalCode: ['',[ Validators.required, Validators.pattern('^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$')]],
      picupRemark: [null],
      picuplocation : this.fb.group({
        type: ['point'],
        coordinates : this.fb.array([])
      }),
      addressStatus: [''],
      scheduleStatus: ['current'],
      orderDate: [Date.now()],
    });
      this.dropOrder = this.fb.group({
      droploction : this.fb.array([this.addCreds()])
      });
      this.onChangeEvent('Default Address');
  }

  addCreds() {
   return this.fb.group({
    dropupCompanyName: ['', Validators.required],
    dropupContactPersonName:  ['', [Validators.required , Validators.pattern('[A-Za-z\s]*')]],

    dropupStreetAddress:['', Validators.required],

    dropupMobileNumber:['', [Validators.required,Validators.pattern("^[0-9_-]{10,11}")]],
    dropupAddress2:[''],
    dropupCity: [''],
    dropupState: [''],
    distance : [0, Validators.required],
    orderEstimatedTime: [],
    dropupPostalCode: ['', [ Validators.required, Validators.pattern('^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$')]],
    internalComments: [''],
    driverInstruction: [''],
    droplocation : this.fb.group({
      type: ['point'],
      coordinates : this.fb.array([])
    }),
    regularSized:[0, Validators.required],
    overSized:[0],
    referenceNumber: ['', Validators.required],

   },{
     validators:[this.orderCapacity.bind(this),this.checkCapacity.bind(this.type)]
 });
  }

  addAddress(){
    this.submitted =true;
    if(!this.ServiceNotAvailable){
      this.openModal(1);
      return;
    }

   if(this.dropOrder.valid){
     this.search = null;
    if(this.addressArray.controls.length < 5){
      this.addressArray.push(this.addCreds());
      // this.addressArray.push(this.placeOrder);
      this.cd.detectChanges();
      this.submitted =false;
    }
   } else return
  }

  removeAddress(index){
    this.addressArray.removeAt(index)
  }

   handleAddressChange(location: any, index) {
     console.log(location);

  let data : any= {}
  this.googleAddres = location.address_components;
  this.calulatesDistance(index,location.formatted_address)
  const droploction =<FormArray> this.dropOrder.controls.droploction
  this.destinationA[index] = location.formatted_address
  data.dropupCompanyName = location.name
  data.dropupStreetAddress = location.formatted_address
  this.googleAddres.map((element,i) => {

    element.types.filter(x=>{
      if(x == 'locality'){
        data.dropupCity = element.long_name
      }
      if(x == 'postal_code'){
        data.dropupPostalCode = element.long_name
      }
      if(x == 'administrative_area_level_1'){
        data.dropupState = element.long_name
      }
      if(x == 'sublocality'){
        data.dropupAddress2 = element.long_name
      }
    });
''
  });
  this.addressArray.at(index).patchValue(data);
  let drop = <FormGroup>  this.addressArray.at(index).get('droplocation')
  const latLong = < FormArray > drop.controls.coordinates;
  latLong.clear();

  latLong.push(new FormControl(location.geometry.location.lng().toFixed(4)))
  latLong.push(new FormControl(location.geometry.location.lat().toFixed(4)))
  console.log(droploction.value);

}

public handleNewAddressChange(location: any, index) {
  this.origin1.lat = location.geometry.location.lat();
  this.origin1.lng = location.geometry.location.lng();
  let data : any= {}
  console.log(location.formatted_address);

  this.googleAddres = location.address_components;

  const picuplocation =<FormGroup> this.placeOrder.get('picuplocation')
  picuplocation.patchValue({type : 'point'})
  const latLong = < FormArray > picuplocation.controls.coordinates;
  latLong.clear();
    latLong.insert(0 , new FormControl(location.geometry.location.lng().toFixed(4)))
   latLong.insert(1 , new FormControl(location.geometry.location.lat().toFixed(4)))


  data.picupBusinessMainNumber =location.formatted_phone_number
  data.picPostalCode = location.adr_address.postal_code
  data.picupAddress = location.vicinity
  data.picupMobileNumber = location.international_phone_number
  data.picupCompanyName = location.name
  data.picupStreetAddress = location.formatted_address
  this.googleAddres.map((element,i) => {

    element.types.filter(x=>{
      if(x == 'locality'){
        data.picupCity = element.long_name
      }
      if(x == 'postal_code'){
        data.picPostalCode = element.long_name
      }
      if(x == 'administrative_area_level_1'){
        data.picupState = element.long_name
      }
      if(x == 'sublocality'){
        data.picupAddress2 = element.long_name
      }
    });

  });
  this.placeOrder.patchValue(data)
}

public service = new google.maps.DistanceMatrixService();

 array = []
 addressComplete(data,index){
  this.search = data.dropupStreetAddress;
  this.destinationA[index] = data.dropupStreetAddress;
 let flag =  this.calulatesDistance(index,data.dropupStreetAddress)
  if(!flag) return ;
  this.addressArray.at(index).patchValue(data);
  let drop = <FormGroup>  this.addressArray.at(index).get('droplocation');
  const latLong = < FormArray > drop.controls.coordinates;
  latLong.clear();

  latLong.push(new FormControl(data.droplocation.coordinates[0]))
  latLong.push(new FormControl(data.droplocation.coordinates[1]))
  console.log(this.dropOrder);

 }
FieldsChange(event,index){
  if(event.target.checked){

     this.array[index] = this.dropOrder.value.droploction[index];

  // tslint:disable-next-line: align
  } if (!event.target.checked){
      delete this.array[index];
     }
     console.log(this.array);

}
  orderCapacity(form : FormArray) {
    const   {value :regularSized} : any = form.get('regularSized');
    const  {value : overSized} : any = form.get('overSized');
    let orderCapacity = (regularSized * 1) + (overSized * 5)
    return orderCapacity <= 80 ?  null : { passValue: true };
    }
    checkCapacity(form : FormArray) {
      const   {value :regularSized} : any = form.get('regularSized');
      const  {value : overSized} : any = form.get('overSized');
      let orderCapacity = (regularSized * 1) + (overSized * 5)
      return  orderCapacity > 0 ?  null : { checkValue: true };
      }
    getAddressAPI(){
    this.addresBook.getAddress().subscribe(res=>{
      const response: any = res;
      this.AddressBook = response.data;
      console.log(this.AddressBook);
    })
    }

  setValue(){

    console.log(this.newOrderRes.data);

    this.origin1.lat =  this.newOrderRes.data.location.coordinates[1];
    this.origin1.lng = this.newOrderRes.data.location.coordinates[0];
    const picuplocation = this.placeOrder.get('picuplocation') as FormGroup;
    picuplocation.patchValue({type : 'point'})
    const latLong = picuplocation.controls.coordinates as FormArray;
    latLong.clear();
    latLong.push(new FormControl(this.origin1.lng))
    latLong.push(new FormControl(this.origin1.lat))

    this.placeOrder.patchValue({
                                picupStreetAddress : this.newOrderRes.data.streetAdress,
                                picPostalCode : this.newOrderRes.data.postalCode,
                                picupCity : this.newOrderRes.data.city,
                                picupState : this.newOrderRes.data.state,
                                picupCompanyName:this.newOrderRes.data.companyName,
                                picupContactPersonName:this.newOrderRes.data.firstContactPerson,
                                picupBusinessMainNumber:this.newOrderRes.data.companyPhone,
                                picupMobileNumber:this.newOrderRes.data.firstContactPhone,
                                picupEmail:this.newOrderRes.data.companyEmail,
                                picupAddress:this.newOrderRes.data.streetAdress,
                                addressStatus : 'defaultaddress',
                                scheduleStatus : 'current',
                                orderDate : Date.now(),});

  }

   onChangeEvent(type){
    if(type === 'Default Address') {
      this.readOnly = true;
      this.showDefalutAddress = false;

      this.type = type;
      this.setValue();
      return;
     }
    if(type === 'newaddress') {
      this.readOnly = false;
      this.showDefalutAddress = true;
      this.type = type;
      this.placeOrder.reset();
      this.dropOrder.reset();
      this.search = null;
      this.submitted = false;
      this.placeOrder.patchValue({
        addressStatus : 'newaddress',
        scheduleStatus : 'current',
        orderDate : Date.now()
      });
      return;
     }
  }

   placeOrderType(){
    this.submitted = true
    if(!this.ServiceNotAvailable){
      this.openModal(1);
      return;
    }
    if(this.placeOrder.valid && this.dropOrder.valid){
        for (const key in this.dropOrder.value.droploction) {
          this.req[key] = Object.assign({} , this.placeOrder.value,this.dropOrder.value.droploction[key])}
          this.orders.calculateFare(this.req).subscribe(res=>{
          this.fare = res
          this.loading = false;
          }
          )
          this.showModal()
    }else return ;
    this.loading = true;

  }


  showModal():void {
    $('#cost_modal').modal('show');
  }


  getProfile(){
    this.user.getProfile().subscribe(res=>{
      this.newOrderRes=res;
      if(this.newOrderRes.status == '0'){
        this.auth.logout();
      }
      this.setValue();
    });
  }

  onSubmit(){
    if(this.newOrderRes.data.accountStatus && this.clicked){
      this.clicked = false
      console.log(this.array);
      this.orders.postOrder(this.req).subscribe(res=>{
        this.array.map(x=>{
          console.log(x)
          this.addressbook.saveAddress(x).subscribe(res=>console.log(res)

          );
        })
        this.router.navigate(['/user/orders']);
        });
    }else{
      $('#payment_modal').modal('show');
    }
    }

    cardInfo(){
      if(this.dataflag == '1'){
        this.clicked = false
        this.orders.postOrder(this.req).subscribe(res=>{
          this.array.map(x=>{
            console.log(x)
            this.addressbook.saveAddress(x).subscribe(res=>console.log(res)
            );
          })
          this.router.navigate(['/user/orders']);

          });
      }
    }

    paymentRedirect() {
      this.router.navigate(['/user/payment-steps'])
    }
    openModal(id) {
      let mat= this.matDialog.open(StatusModalComponent,{
       data: {id}})
   }

   calulatesDistance(index ,destinations ){
    this.service.getDistanceMatrix(
      {
        origins: [this.origin1],
        destinations: [destinations],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC , // miles and feet.

        avoidHighways: false,
        avoidTolls: false
      },  (response,status) => {
       if(status == 'OK'){
         console.log(response);

        response.rows[0].elements.filter((x,i)=>
        {
          if(x.status === 'ZERO_RESULTS'){
            this.ServiceNotAvailable = false

             this.openModal(1);
             return false;
          }
          console.log(x);
          this.ServiceNotAvailable = true;
          this.addressArray.at(index).patchValue({
            distance : Math.round(x.distance.value / 1000),
            orderEstimatedTime :  x.duration.text
          })
        })

       }
      });
      return true;
   }

  }
