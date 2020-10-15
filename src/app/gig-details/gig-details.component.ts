import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gig-details',
  templateUrl: './gig-details.component.html',
  styleUrls: ['./gig-details.component.css']
})
export class GigDetailsComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) { }

}
