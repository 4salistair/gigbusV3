import { Component,  OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GigService } from '../gig.service';
import { Gigs } from '../gig.model';
import { MatDialog } from '@angular/material/dialog';
import { GigShareComponent } from './gig-share/gig-share.component';

@Component({

    selector: 'app-gig-mine',
    templateUrl: './gig-mine.component.html',
    styleUrls: ['./gig-mine.component.css']

  })

  export class GigMineComponent implements OnInit, OnDestroy {

  constructor(
              private gigService: GigService,
              private dialog: MatDialog )  { }



   private GigSubscription: Subscription;
   filteredGigs: Gigs[];
   currentGig: Gigs;
   Number: number;
   Determinate: number;


    ngOnInit(): void {

      this.GigSubscription = this.gigService.filteredGigsChanged.subscribe(
        filteredGigs => { this.filteredGigs = filteredGigs;
        });
      this.gigService.fetchGigsForCurrentUser();
    }

    deleteGig(id): void {

      this.gigService.deleteGigForPunter(id);
      
      this.currentGig = this.filteredGigs.find(ex => ex.id === id);
      this.gigService.gigRoleBackGigNumbers(this.currentGig.gigID,
                                           this.currentGig.gigPunterCount,
                                           this.currentGig.gigTotalPrice);
      
    }
   
    shareGig(id: string ): void {
      
      this.currentGig = this.filteredGigs.find(ex => ex.id === id);

     const dailogRef =  this.dialog.open(GigShareComponent, {
        data: {
                venueName: this.currentGig.gigVenue.venueName,
                venueCity: this.currentGig.gigVenue.venueCity,
                gigDate: this.currentGig.gigDate,
                gigArtistName: this.currentGig.gigArtistName,
                gigID: this.currentGig.gigID
               
              }
          });
    }

    // signUp(gig: Gigs): void {

    //   const dailogRef = this.dialog.open(GigDetailsComponent, {
    //     data: {
    //             gigArtistName: gig.gigArtistName, 
    //             gigVenueCity: gig.gigVenue.venueCity,
    //             gigVenueName: gig.gigVenue.venueName,
    //             gigDate: gig.gigDate  
       
    //       }
    //   } );

    ngOnDestroy( ): void {
        this.GigSubscription.unsubscribe();
    }

  }
