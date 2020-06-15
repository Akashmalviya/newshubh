import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressBookService } from 'src/app/_services/address-book.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAddressComponent } from 'src/app/_modal/delete-address/delete-address.component';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  loading = false;
  googleAddres = [];
  @ViewChild("placesRef",{static : true}) placesRef : GooglePlaceDirective;

  constructor(private addresBook : AddressBookService, private matDialog : MatDialog,
    private fb: FormBuilder) { }
  public dropOrder: FormGroup;
  public address  : any= {}
  toggleData = false;
  options={
    types: [],
    componentRestrictions: { country: ['IN','CA'] }
    }
  ngOnInit() {
    this.getAddress()
   this.dropOrder = this.fb.group({
      dropupCompanyName: ['', Validators.required],
      dropupContactPersonName: ['', Validators.required],
      dropupStreetAddress:['', Validators.required],
      dropupBusinessMainNumber:['', [Validators.required,Validators.pattern("^[0-9_-]{10,12}")]],
      dropupMobileNumber:['', [Validators.required,Validators.pattern("^[0-9_-]{10,12}")]],
      dropupAddress2:[''],
      dropupCity: [''],
      dropupState: [''],
      dropupPostalCode: ['', [ Validators.required, Validators.pattern('^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$')]],
      droplocation : this.fb.group({
        type: ['point'],
        coordinates : this.fb.array([])
      }),
     });
  }
  onSubmit(from){}
  get addressForm() {
    return this.dropOrder.controls;
  }
  handleAddressChange(location: any) {
    let data : any= {}
    this.googleAddres = location.address_components;
    data.dropupCompanyName = location.name
    data.dropupBusinessMainNumber = location.formatted_phone_number
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
    });
      this.dropOrder.patchValue(data);
    let drop = <FormGroup>  this.dropOrder.get('droplocation')
    const latLong = < FormArray > drop.controls.coordinates;
    latLong.clear();
    latLong.push(new FormControl(location.geometry.location.lng().toFixed(4)))
    latLong.push(new FormControl(location.geometry.location.lat().toFixed(4)))


  }

  getAddress(){
    this.addresBook.getAddress().subscribe(res=>{this.address=res;
      this.loading= true;
      })
  }

  addAddresContact(){
    if(this.dropOrder.invalid) return;
    this.addresBook.saveAddress(this.dropOrder.value).subscribe(res=>{this.getAddress();this.dropOrder.reset()})
    this.toggleData ? this.toggleData = false : this.toggleData = true ;
  }

  openModel(id){
   let mat = this.matDialog.open(DeleteAddressComponent,{
      data: id
    })
    mat.afterClosed().subscribe(result =>{
      this.getAddress()
    })
  }


}
