import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private route: ActivatedRoute, public dialogRef: MatDialogRef<StatusModalComponent>
  ){}

  ngOnInit() {
    console.log(this.id);

  }

}
