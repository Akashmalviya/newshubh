import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressBookService } from 'src/app/_services/address-book.service';

@Component({
  selector: 'app-delete-address',
  templateUrl: './delete-address.component.html',
  styleUrls: ['./delete-address.component.scss']
})
export class DeleteAddressComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public id: any,
  private  _address : AddressBookService,
  public dialogRef: MatDialogRef<DeleteAddressComponent>
  ){

  }


  ngOnInit() {
    console.log(this.id);

  }

  deleteAddress(){
    this._address.deleteAddress(this.id).subscribe(res=> this.dialogRef.close())
  }

}
