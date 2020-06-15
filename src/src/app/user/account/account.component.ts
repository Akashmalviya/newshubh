import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ItemlogService } from 'src/app/_services/itemlog.service';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardObject } from 'src/app/_models/card';
import { AlertService } from 'src/app/_services/alert.service';
import { ImageCroppedEvent, ImageTransform, base64ToFile, Dimensions } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';



declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  constructor(private auth: AuthenticationService ,
              private itemLog: ItemlogService,
              private fb: FormBuilder ,
              private user : UserService,
              private Alert : AlertService) { }
  get regForm() {
    return this.updateForm.controls;
  }
  options={
    types: [],
    componentRestrictions: { country: ['CA','IN'] }
    }
  data ={
    id : JSON.parse(localStorage.getItem('currentUser')).data._id,
    flag : 0
  }
  resposne = {}
  password = false;
  loading = false;
  image = false;
  userImformation = false;
  ownerDetails = false;
  packageDeatails = false;
  addresChange = false;
  itemType : any = [];
  itemWeight : any = [];
  companyProfileRes : any = {data:{}};
  fileToUpload :File=null;
  flag = false;
  companyProfile : any = [];
  userUpdateData  : any ={};
  changePasswordResponse : any =[]
  cardObjct :any = {data:{}};
  public updateForm: FormGroup;
  public itemUpdateForm: FormGroup;
  submitted = false;

  passwordLog = {newpassword:'', oldpassword:'', confirmpassword : ''}
    creditRemaningDays;


    ngOnInit() {
      this.getProfile();


      this.updateForm = this.fb.group({
        companyName: ['', Validators.required],
      companyPhone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(12)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      streetAdress: ['', Validators.required],
      postalCode: ['', [Validators.required,Validators.pattern('^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$')]],
      state: ['',],
      city: ['',],
      address2 : [''],
      country: ['', Validators.required],
      firstContactPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      secondContactPerson: ['', Validators.required],
      secondaryRole: ['', Validators.required],
      secondContactEmail: ['',  [Validators.required, Validators.email]],
      secondContactPhone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(12),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      firstContactPerson: ['', Validators.required],
      firstRole: ['', Validators.required],
      firstContactEmail: ['',  [Validators.required, Validators.email]],
      location : this.fb.group({
        type: ['point'],
        coordinates : this.fb.array([])
      })
      });
      this.itemUpdateForm = this.fb.group({
        itemType: this.fb.array([]),
        itemWeight: this.fb.array([])
      })


     this.getItemDetails();
     this.cardDetails()

  }
  setValue(){

    let itemType :any= this.companyProfileRes.data.itemType;
    let itemWeight : any = this.companyProfileRes.data.itemWeight;
    const itemTypesubIdarr = < FormArray > this.itemUpdateForm.controls.itemType;
    itemTypesubIdarr.clear();
    itemType.forEach(element => {
      itemTypesubIdarr.push(new FormControl(element._id));

    });
    const itemWeightsubIdarr = < FormArray > this.itemUpdateForm.controls.itemWeight;
    itemWeightsubIdarr.clear();
    itemWeight.forEach(element => {
      itemWeightsubIdarr.push(new FormControl(element._id));
    });

    this.updateForm.patchValue({ country : this.companyProfileRes.data.country,
                                city: this.companyProfileRes.data.city,
                                state: this.companyProfileRes.data.state,
                                address2 : this.companyProfileRes.data.address2,
                                secondContactPhone : this.companyProfileRes.data.secondContactPhone,
                                companyName : this.companyProfileRes.data.companyName,
                                companyPhone :this.companyProfileRes.data.companyPhone,
                                companyEmail : this.companyProfileRes.data.companyEmail,
                                streetAdress : this.companyProfileRes.data.streetAdress,
                                postalCode : this.companyProfileRes.data.postalCode,
                                firstContactPerson : this.companyProfileRes.data.firstContactPerson,
                                firstRole : this.companyProfileRes.data.firstRole,
                                firstContactEmail : this.companyProfileRes.data.firstContactEmail,
                                firstContactPhone : this.companyProfileRes.data.firstContactPhone,
                                secondContactPerson :this.companyProfileRes.data.secondContactPerson,
                                secondaryRole : this.companyProfileRes.data.secondaryRole,
                                secondContactEmail : this.companyProfileRes.data.secondContactEmail})
  }
  updateProfilePic() {
    this.fileToUpload = this.croppedImage
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.user.updateProfilePic(formData).subscribe(res=>{

      this.image = true;

      let data : any = {};
      data = res;


     let image = { image : data.data};
     this.user.updateProfile(image).subscribe(res=>this.getProfile())
    })
    this.image = false
  }
  public handleNewAddressChange(location: any) {
    this.addresChange = false;
    let data : any= {}



     let googleAddres = location.address_components;

    const picuplocation =<FormGroup> this.updateForm.get('location')
    // picuplocation.patchValue({type : 'point'})
    const latLong = < FormArray > picuplocation.controls.coordinates;
    latLong.clear();
      latLong.insert(0 , new FormControl(location.geometry.location.lng().toFixed(4)))
     latLong.insert(1 , new FormControl(location.geometry.location.lat().toFixed(4)))

    data.streetAdress = location.vicinity
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
   ;
    this.updateForm.patchValue(data)

  }
    onChange(form){
      if(form.valid){
        let data = {newpassword : this.passwordLog.newpassword, oldpassword: this.passwordLog.oldpassword }

        if(data.newpassword===this.passwordLog.confirmpassword){
          this.password = true;
          this.auth.changePassword(data).subscribe(res=>{


            this.changePasswordResponse = res;


            if(this.changePasswordResponse.status == 0){
              this.Alert.error('Oldpassword not match')
              this.password = false
            }
            if(this.changePasswordResponse.status == 1){
             this.Alert.success('Company password change successfully!!')
             this.password  = false
           }
          }
          )} else this.Alert.error('Password does not match') ;return;

      } this.Alert.error('Fill all details')


    }
    getProfile(){
      this.user.getProfile().subscribe(res=>{
        this.companyProfileRes=res;this.setValue();
        let NowDate =  Date.now();
        const endDate = new Date(this.companyProfileRes.data.endDateOfCreditLimit)
        this.creditRemaningDays = this.days_between(NowDate,endDate);
        this.user.userData.next(res);
        this.image = false;
        if(this.companyProfileRes.status == '0'){
          this.auth.logout();
        }
      });

      this.companyProfile=this.companyProfileRes.data;




    }
    getItemDetails(){
      this.itemLog.itemTypeSelected().subscribe(res =>{this.itemType=res.data;
      }
        );
      this.itemLog.itemWeightSelected().subscribe(res =>{ this.itemWeight = res;

        });
    }
    updateProfileItem(){
      this.loading = true;

      this.user.updateProfile(this.itemUpdateForm.value).subscribe(res=>{
        this.packageDeatails = false;
        this.getProfile();
        this.getItemDetails();
        this.loading = false;
        })
    }

  updateProfile(){
    this.submitted = true
    if(this.updateForm.valid){
      this.loading = true;
      this.user.updateProfile(this.updateForm.value).subscribe(res=>{
        this.userImformation = false;
        this.ownerDetails = false;
        this.loading = false;

        this.getProfile();


    })
  }


    else return
}


hideModal():void {
  $('#exampleModal').modal('hide');
}

hideModal2():void {
  $('#exampleModal1').modal('hide');
}

cardDetails(){
  this.user.getCard().subscribe((res: any) =>{
    this.cardObjct = res;
    this.user.cardObject.next(res);
    this.user.cardObject.subscribe((data)=> this.cardObjct= data)
  })
}
    onChangeType(id: string, isChecked: boolean) {
      const subIdarr = < FormArray > this.itemUpdateForm.controls.itemType;

      if (isChecked) {
        subIdarr.push(new FormControl(id));
      } else {
        const index = subIdarr.controls.findIndex(x => x.value == id)
        subIdarr.removeAt(index);
      }
    }
    onChangeWeight(id: string, isChecked: boolean) {
      const subIdarr = < FormArray > this.itemUpdateForm.controls.itemWeight;

      if (isChecked) {
        subIdarr.push(new FormControl(id));
      } else {
        const index = subIdarr.controls.findIndex(x => x.value == id)
        subIdarr.removeAt(index);
      }
    }

    days_between(date1, date2) {

      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24;

      // Calculate the difference in milliseconds
      const differenceMs = Math.abs(date1 - date2);

      // Convert back to days and return
      return Math.round(differenceMs / ONE_DAY);

  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      $('#imageCrop').modal('show');

  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = base64ToFile(event.base64)
  }

  imageLoaded() {
      this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

}
