import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-gig-price-confirmation',
  templateUrl: './gig-price-confirmation.component.html',
  styleUrls: ['./gig-price-confirmation.component.css']
})
export class GigPriceConfirmationComponent implements OnInit {


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  update: boolean

  
  constructor(
  //  private dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public passData: any
    ) 
   { }

  ngOnInit(): void {

    this.update  = true

  //   if(this.passData.gigCostPerPunter  <   this.passData.gigCurrentCostPerPunter )
  //   {
  //     this.update  = true
  //   }
  //   else 
  //   {
  //     this.update  = false
  //   }

  //   console.log(this.passData.gigCostPerPunter);
  }
  
}
