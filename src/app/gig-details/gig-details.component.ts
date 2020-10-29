import { Component, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {MatStepperModule} from '@angular/material/stepper';
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

// import { Component, OnInit, Inject, Injectable } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gig-details',
  templateUrl: './gig-details.component.html',
  styleUrls: ['./gig-details.component.css']
})
 export class GigDetailsComponent implements OnInit  {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

//   constructor(@Inject(MAT_DIALOG_DATA) public passData: any) { }

constructor() {}


ngOnInit(): void{
  // this.firstFormGroup = this.formBuilder.group({
  //   firstCtrl: ['', Validators.required]
  // });
  // this.secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required]
  // });
}

 }


