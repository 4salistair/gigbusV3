import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gig-share',
  templateUrl: './gig-share.component.html',
  styleUrls: ['./gig-share.component.css']
})
export class GigShareComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public passData: any) { }

  MessageString: string;
  urlString: String;

  ngOnInit(): void {

     this.MessageString = "testing my app " + this.passData.gigArtistName
                 + " @ " +  this.passData.venueName + " in " + this.passData.venueCity
                 + " on " + "testing my app "

     this.urlString = "http://localhost:4200>"+'?'+'id='+this.passData.gigID
  
  }

}
